class AccumulatedSimulator
  TARGET_PERIODS = (1..12).to_a
  def initialize(company, quantity)
    @company = company
    @quantity = quantity
  end

  def call
    TARGET_PERIODS.map { |month| to_api(month) } 
  end

  private

  def to_api(month)
    {
      period: "#{month}_month",
      value: calculate_total_value(month).round,
      deposit: calculate_monthly_deposit * month
    }
  end

  def calculate_total_value(month)
    month.times.sum do |i|
      calculate_monthly_deposit * (calculate_average_growth_rate ** (month - i))
    end
  end

  def calculate_monthly_deposit
    @company.latest_stock_price * @quantity
  end

  def calculate_average_growth_rate
    past_prices = TARGET_PERIODS.map { |m| calculate_past_average_price(m) }
    past_prices.unshift(@company.latest_stock_price)
    rates = past_prices.each_cons(2).map { |to, from| to / from }
    (rates.sum / rates.size).ceil(2)
  end

  def calculate_past_average_price(month)
    start_date = Date.today - month.months
    @company.stock_prices.where(date: start_date..).limit(30).average(:close_price)
  end
end
