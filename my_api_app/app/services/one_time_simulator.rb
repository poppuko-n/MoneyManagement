class OneTimeSimulator
  TARGET_PERIODS = (1..12).to_a

  # 一括投資シミュレーションを実行するクラス
  #
  # @param quantity [Integer] 投資数量
  # @param prices [Array<StockPrice>]
  def initialize(quantity, prices)
    @quantity = quantity
    @prices = prices.sort_by(&:date)
    @current_price = @prices.last.close_price
    @fixed_deposit = @current_price * @quantity
  end

  def call
    monthly_growth_rates = calculate_monthly_growth_rates
    TARGET_PERIODS.map { |month| build_monthly_result(month, monthly_growth_rates) }
  end

  private

  def build_monthly_result(month, monthly_growth_rates)
    {
      period: "#{month}_month",
      value: calculate_investment_value(month, monthly_growth_rates),
      deposit: @fixed_deposit.round
    }
  end

  def calculate_investment_value(month, monthly_growth_rates)
    value = @fixed_deposit
    month.times do |i|
      growth_rate = monthly_growth_rates[i]
      value *= growth_rate
    end
    value.round
  end

  def calculate_monthly_growth_rates
    monthly_prices = TARGET_PERIODS.map { |month| find_monthly_price(month) }
    monthly_prices.unshift(@current_price)

    monthly_prices.each_cons(2).map { |current, previous| current.to_f / previous }.reverse
  end



  def find_monthly_price(month)
    start_date = month.months.ago
    @prices.find { |p| p.date >= start_date }&.close_price
  end
end
