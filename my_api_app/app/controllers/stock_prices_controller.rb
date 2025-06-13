class StockPricesController < ApplicationController
  TARGET_PERIODS = (1..12).to_a

  # POST /stock_prices/update
  def update
    StockPrice::Importer.call
    render json: { message: "Stock prices updated" }, status: :ok
  end

  # POST /stock_prices/simulate
  def simulate
    # params[:data] = [{"code"=>銘柄コード, "quantity"=>購入数量}]
    render json: build_simulation_result(params[:data]), status: :ok
  end

  private

  def build_simulation_result(simulation_targets)
      results = simulation_targets.map do |target|
        simulation_investment(target)
      end
      {
        results: results,
        ai_analysis: StockPrice::AiAnalyzer.call(results)
      }
  end

  def simulation_investment(target)
    company_code, quantity  = target.values_at(:code, :quantity)
    company = Company.find_by(code: company_code)
        {
          name: company.name,
          current_price: company.latest_stock_price,
          quantity: quantity,
          one_time: format_one_time_simulations(company, quantity),
          accumulated: format_accumulated_simulations(company, quantity)
        }
  end

  def format_one_time_simulations(company, quantity)
    TARGET_PERIODS.map do |month|
      past_price = fetch_past_price(company, month)
      { period: "#{month}_month",
        value: (company.latest_stock_price**2 / past_price) * quantity,
        deposit: company.latest_stock_price * quantity }
    end
  end

  def fetch_past_price(company, month)
    start_date = Date.today
    end_date = start_date - month.months
    company.stock_prices.where(date: end_date..start_date).order(date: :asc).first&.close_price
  end

  def format_accumulated_simulations(company, quantity)
    average_growth_rate = calculate_average_growth_rate(company)
    monthly_deposit = company.latest_stock_price * quantity
    TARGET_PERIODS.map do |month|
      total_value = (0...month).sum do |i|
        monthly_deposit * (average_growth_rate ** (month-i))
      end

      {
        period: "#{month}_month",
        value: total_value.round,
        deposit: monthly_deposit * month
      }
    end
  end

  def fetch_past_average_price(company, month)
      start_date = Date.today - month.months
      end_date = start_date + 30.days
      company.stock_prices.where(date: start_date..end_date).average(:close_price)
  end

  def calculate_average_growth_rate(company)
    rates = TARGET_PERIODS.map do |i|
      from = fetch_past_average_price(company, i)
      to   = i == 1 ? company.latest_stock_price : fetch_past_average_price(company, i - 1)
      to / from
    end
    (rates.sum / rates.size).ceil(2)
  end
end
