class OneTimeSimulator
  TARGET_PERIODS = (1..12).to_a
  def initialize(company, quantity)
    @company = company
    @quantity = quantity
  end

  def call
    TARGET_PERIODS.map { |month| to_api(month) }
  end

  private

  def fetch_past_price(month)
    start_date = Date.today - month.months
    # find_byだと完全一致なので範囲検索にしている。
    @company.stock_prices.where(date: start_date..).pick(:close_price)
  end

  def calculate_one_time_investment_value(past_price)
    @company.latest_stock_price**2 / past_price * @quantity
  end

  def calculate_one_time_investment_deposit
    @company.latest_stock_price * @quantity
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
