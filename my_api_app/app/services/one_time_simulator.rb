class OneTimeSimulator
  TARGET_PERIODS = (1..12).to_a

  def initialize(quantity, prices)
    @quantity = quantity
    @prices = prices
  end

  def call
    TARGET_PERIODS.map { |month| to_api(month) }
  end

  private

  def fetch_past_price(month)
    start_date = Date.today - month.months
    @prices.find { |p| p.date >= start_date }&.close_price
  end

  def latest_price
    @prices.max_by(&:date)&.close_price
  end

  def calculate_one_time_investment_value(past_price)
    latest_price**2 / past_price * @quantity
  end

  def calculate_one_time_investment_deposit
    latest_price * @quantity
  end

  def to_api(month)
    past_price = fetch_past_price(month)
    {
      period: "#{month}_month",
      value: calculate_one_time_investment_value(past_price),
      deposit: calculate_one_time_investment_deposit
    }
  end
end
