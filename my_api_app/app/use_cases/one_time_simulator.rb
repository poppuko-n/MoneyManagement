class OneTimeSimulator
  TARGET_PERIODS = (1..12).to_a

  # 一括投資シミュレーションを実行するクラス
  #
  # @param quantity [Integer] 投資数量
  # @param prices [Array<StockPrice>]
  def initialize(quantity, prices)
    @quantity = quantity
    @prices = prices.sort_by(&:date)
    @purchase_price = @prices.last.close_price
    @purchase_amount = @purchase_price * @quantity
  end

  def call
    growth_rates = calculate_growth_rates
    TARGET_PERIODS.map { |month| create_monthly_result(month, growth_rates) }
  end

  private

  def create_monthly_result(month, growth_rates)
    {
      period: "#{month}_month",
      value: calculate_monthly_value(month, growth_rates),
      deposit: @purchase_amount
    }
  end

  def calculate_monthly_value(month, growth_rates)
    month.times.reduce(@purchase_amount) { |current_value, month_index| current_value * growth_rates[month_index] }.round
  end

  def calculate_growth_rates
    historical_prices = TARGET_PERIODS.map { |month| find_price_at_months_ago(month) }
    historical_prices.unshift(@purchase_price)

    historical_prices.each_cons(2).map { |current_price, previous_price| current_price.to_f / previous_price }.reverse
  end



  def find_price_at_months_ago(month)
    target_date = month.months.ago
    @prices.find { |price| price.date >= target_date }.close_price
  end
end
