class OneTimeSimulator
  TARGET_PERIODS = (1..12).to_a

  # 一括投資シミュレーションを実行するクラス
  #
  # @param quantity [Integer] 投資数量
  # @param prices [Array<StockPrice>] 
  def initialize(quantity, prices)
    @quantity = quantity
    @prices = prices
  end

  def call
    TARGET_PERIODS.map { |month| build_monthly_result(month) }
  end

  private

  def build_monthly_result(month)
    past_price = find_historical_price(month)
    {
      period: "#{month}_month",
      value: calculate_investment_value(past_price),
      deposit: calculate_deposit_amount
    }
  end

  def find_historical_price(month)
    start_date = month.months.ago
    @prices.find { |price| price.date >= start_date }.close_price
  end

  def calculate_investment_value(past_price)
    find_current_price**2 / past_price * @quantity
  end

  def calculate_deposit_amount
    find_current_price * @quantity
  end

  def find_current_price
    @prices.max_by(&:date).close_price
  end
end
