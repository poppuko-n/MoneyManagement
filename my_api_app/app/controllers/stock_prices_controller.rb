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
        build_investment_simuration(target)
      end
      {
        results: results,
        ai_analysis: StockPrice::AiAnalyzer.call(results)
      }
  end

  # "code": "83060",
  # "name": "三菱ＵＦＪフィナンシャル・グループ",
  # "current_price": 2178,
  # "quantity": 1,
  # "one_time": [
  #   { "period": "1_month", "value": 2885, "deposit": 2178 }
  #   { "period": "2_month", "value": 2505, "deposit": 2178 }
  #   ...
  #   { "period": "12_month", "value": 2964, "deposit": 2178 }
  # ],
  # "accumulated": [
  #   { "period": "1_month", "value": 2396, "deposit": 2178 }
  #   { "period": "2_month", "value": 4792, "deposit": 4356 }
  #   ...
  #   { "period": "12_month", "value": 28750, "deposit": 26136 }
  # ]

  def set_company(code)
    Company.find_by(code: code)
  end

  def build_investment_simuration(target)
    company_code, quantity  = target.values_at(:code, :quantity)
    company = set_company(company_code)
        {
          name: company.name,
          current_price: company.latest_stock_price,
          quantity: quantity,
          one_time: format_one_time_simulations(company_code, company.latest_stock_price.to_i, quantity),
          accumulated: format_accumulated_simulations(company_code, company.latest_stock_price.to_i, quantity)
        }
  end

  def format_one_time_simulations(code, current_price, quantity)
    TARGET_PERIODS.map do |month|
      past_price = fetch_past_price(code, month)
      { period: "#{month}_month",
        value: (current_price**2 / past_price) * quantity,
        deposit: current_price * quantity }
    end
  end

  def fetch_past_price(code, n)
    start_date = Date.today
    end_date = start_date - n.months

    price = StockPrice.where(company_code: code, date: end_date..start_date)
                      .order(date: :asc)
                      .first&.close_price
  end

  def format_accumulated_simulations(code, current_price, quantity)
    average_growth_rate = calculate_average_growth_rate(code, current_price)
    monthly_deposit = current_price * quantity

    # 各月の積立分に対して、それぞれ運用月数に応じた複利を掛けて合計する
    # 月=3 の場合、以下のように計算
    # - 1ヶ月目に投資した分 → 3ヶ月運用されている → r^3倍
    # - 2ヶ月目に投資した分 → 2ヶ月運用されている → r^2倍
    # - 3ヶ月目に投資した分 → 1ヶ月運用されている → r^1倍
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

  def fetch_past_average_price(code, month)
      start_date = Date.today - month.months
      end_date = start_date + 30.days

      StockPrice.where(company_code: code, date: start_date..end_date)
                .average(:close_price)
  end

  def calculate_average_growth_rate(code, current_price)
    rates = TARGET_PERIODS.map do |i|
      from = fetch_past_average_price(code, i)
      to   = i == 1 ? current_price : fetch_past_average_price(code, i - 1)
      to / from
    end

    (rates.sum / rates.size).ceil(2)
  end
end
