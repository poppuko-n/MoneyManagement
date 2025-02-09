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
    latest_date       = fetch_latest_date(company_code)

    {
      code: company_code,
      name: name,
      current_price: current_price,
      quantity: quantity,
      simulation: calculate_simulation(current_price, company_code, latest_date, quantity),
      accumulation_simulation: calculate_accumulation_simulation(current_price, quantity, company_code, latest_date)
    }

  end

  def fetch_latest_date(company_code)
    latest_price_data = StockPrice.where(company_code: company_code)
                                  .order(date: :desc)
                                  .first&.date
  end

  def fetch_price_n_months_ago(company_code, latest_date, n)
    date_range = (latest_date - n.months)..latest_date
    StockPrice
    .where(company_code: company_code, date: date_range)
    .order(date: :asc)
    .first&.close_price
  end

  def simulate_price(current_price, past_price)
    rate = current_price  / past_price.to_f
    (current_price * rate).round(0)
  end

  def calculate_simulation(current_price, company_code, latest_date, quantity)
    {
      "3_months_ago" => simulate_price(current_price, fetch_price_n_months_ago(company_code, latest_date, 3)) * quantity,
      "6_months_ago" => simulate_price(current_price, fetch_price_n_months_ago(company_code, latest_date, 6)) * quantity,
      "9_months_ago" => simulate_price(current_price, fetch_price_n_months_ago(company_code, latest_date, 9)) * quantity,
      "1_year_ago"   => simulate_price(current_price, fetch_price_n_months_ago(company_code, latest_date, 12)) * quantity
    }
  end
 
  def fetch_n_monthly_average_prices(company_code, latest_date, n)
    target_periods = (0..(n + 1)).map { |i| latest_date - i.months }
    target_periods.reverse.each_cons(2).map do |start_date, end_date|
      StockPrice.where(company_code: company_code, date: start_date..end_date).average(:close_price)
    end
  end
  
  def calculate_growth_rates(monthly_average_prices)
    monthly_average_prices.each_cons(2).map do |previous_price, current_price|
      current_price / previous_price.to_f
    end
  end
  
  def calculate_accumulation_price(current_price, quantity, company_code, latest_date, n)
    accumulated_price = current_price * quantity
    result = []
    accumulated_value = 0
  
    monthly_average_prices = fetch_n_monthly_average_prices(company_code, latest_date, n)
    monthly_growth_rates = calculate_growth_rates(monthly_average_prices)
  
    monthly_growth_rates.each do |growth_rate|
      accumulated_value = (accumulated_value + accumulated_price) * growth_rate
      result << accumulated_value.round(0)
    end
  
    result
  end
  
  def calculate_accumulation_simulation(current_price, quantity, company_code, latest_date)
    accumulated_prices = calculate_accumulation_price(current_price, quantity, company_code, latest_date, 12)
  
    {
      "3_months_ago" => accumulated_prices[2],
      "6_months_ago" => accumulated_prices[5],
      "9_months_ago" => accumulated_prices[8],
      "1_year_ago"   => accumulated_prices[11]
    }
  end
  
end
