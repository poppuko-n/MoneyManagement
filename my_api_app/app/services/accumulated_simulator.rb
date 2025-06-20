class AccumulatedSimulator
  TARGET_PERIODS = (1..12).to_a

  def initialize(company, quantity, prices)
    @company = company
    @quantity = quantity
    @prices = prices
  end

  def call
    TARGET_PERIODS.map { |month| to_api(month) }
  end

  private

  def latest_price
    @prices.max_by(&:date)&.close_price
  end

  def calculate_monthly_deposit
    latest_price * @quantity
  end

  def calculate_total_value(month)
    month.times.sum do |i|
      calculate_monthly_deposit * (calculate_average_growth_rate ** (month - i))
    end
  end

  def calculate_average_growth_rate
    past_prices = TARGET_PERIODS.map { |m| calculate_past_average_price(m) }
    past_prices.unshift(latest_price)
    rates = past_prices.each_cons(2).map { |to, from| to.to_f / from }
    rates.sum / rates.size
  end

  def calculate_past_average_price(month)
    start_date = Date.today - month.months
    prices = @prices.select { |p| p.date >= start_date }.first(30)
    prices.sum(&:close_price).to_f / prices.size
  end

  def to_api(month)
    {
      period: "#{month}_month",
      value: calculate_total_value(month).round,
      deposit: calculate_monthly_deposit * month
    }
  end
end
