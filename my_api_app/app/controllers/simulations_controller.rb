class SimulationsController < ApplicationController
  def create
    data = params[:data]
    simulated_results = data.map { |item| build_simulate_data(item) }
    render json: { results: simulated_results }, status: :ok
  end

  private

  def build_simulate_data(item)
    company_code  = item[:code]
    name          = item[:name]
    current_price = item[:price]
    quantity      = item[:quantity]

    latest_date       = fetch_latest_data(company_code)[:date]
    latest_price      = fetch_latest_data(company_code)[:price]

    rates             = calculate_rates(latest_price, company_code, latest_date)

    {
      code: company_code,
      name: name,
      current_price: current_price,
      quantity: quantity,
      simulation: calculate_simulation(latest_price, quantity, rates),
      accumulation_simulation: calculate_accumulation_simulation(company_code, latest_date, current_price, quantity)
    }
  end

  def fetch_latest_data(company_code)
    latest_price_data = StockPrice.where(company_code: company_code)
                                  .order(date: :desc)
                                  .first
    {
      date: latest_price_data.date,
      price: latest_price_data.close_price
    }
  end

  def fetch_price_n_months_ago(company_code, latest_date, n)
    date_range = (latest_date - n.months)..latest_date
    StockPrice
    .where(company_code: company_code, date: date_range)
    .order(date: :asc)
    .first&.close_price
  end

  def calculate_rates(latest_price, company_code, latest_date)
    {
      "3_months_ago": calculate_rate(latest_price, fetch_price_n_months_ago(company_code, latest_date, 3)),
      "6_months_ago": calculate_rate(latest_price, fetch_price_n_months_ago(company_code, latest_date, 6)),
      "1_year_ago": calculate_rate(latest_price, fetch_price_n_months_ago(company_code, latest_date, 12))
    }
  end

  def calculate_rate(latest_price, history_price)
    ((latest_price - history_price) / history_price.to_f).round(4)
  end

  def calculate_simulation(latest_price, quantity, rates)
    rates.transform_values do |rate|
      (rate * latest_price * quantity).round(0)
    end
  end

  # 積み立てロジック
  def calculate_accumulation_simulation(company_code, latest_date, current_price, quantity)
    month_average_prices = fetch_monthly_average_prices(company_code, latest_date)
    simulate_accumulation(month_average_prices, current_price, quantity)
  end

  def fetch_monthly_average_prices(company_code, latest_date)
    target_periods = (0..13).map { |i| latest_date - i.months }
    target_periods.each_cons(2).map do |start_date, end_date|
      StockPrice.where(company_code: company_code, date: (end_date + 1)..start_date)
                .average(:close_price)
    end
  end

  def simulate_accumulation(month_average_prices, current_price, quantity)
    buy_price = current_price * quantity
    output    = 0
    results   = {}

    month_average_prices.each_cons(2).with_index(1) do |(start_price, end_price), i|
      next if start_price.nil? || end_price.nil?

      rate = (start_price / end_price)
      output = if i == 1
                 buy_price * rate
      else
                 (output + buy_price) * rate
      end

      if [ 3, 6, 12 ].include?(i)
        result_key = (i == 12) ? "1_year_ago" : "#{i}_months_ago"
        result_value = output.round(0) - (buy_price * i)
        results[result_key] = result_value
      end
    end
    results
  end
end
