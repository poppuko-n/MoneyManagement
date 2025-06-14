class OneTimeSimulator
  TARGET_PERIODS = (1..12).to_a
  def initialize(company, quantity)
    @company = company
    @quantity = quantity
  end

  def call
    TARGET_PERIODS.map do |month|
      past_price = fetch_past_price(month)
      { period: "#{month}_month",
        value: (@company.latest_stock_price**2 / past_price) * @quantity,
        deposit: @company.latest_stock_price * @quantity }
    end
  end

  private

  def fetch_past_price(month)
    start_date = Date.today
    end_date = start_date - month.months
    @company.stock_prices.where(date: end_date..start_date).order(date: :asc).first&.close_price
  end
end
