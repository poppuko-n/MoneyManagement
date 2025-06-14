class AccumulatedSimulator
  TARGET_PERIODS = (1..12).to_a
  def initialize(company, quantity)
    @company = company
    @quantity = quantity
  end

  def call
    average_growth_rate = calculate_average_growth_rate
    monthly_deposit = @company.latest_stock_price * @quantity
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

  private

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
