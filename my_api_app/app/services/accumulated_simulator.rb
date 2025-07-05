class AccumulatedSimulator
  TARGET_PERIODS = (1..12).to_a

  # 積立投資シミュレーションを実行するクラス
  #
  # @param quantity [Integer] 毎月の投資数量
  # @param prices [Array<StockPrice>] 株価データの配列
  def initialize(quantity, prices)
    @quantity = quantity
    @prices = prices.sort_by(&:date)
    @purchase_price = @prices.last.close_price
    @monthly_purchase_amount = @purchase_price * @quantity
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
      deposit: @monthly_purchase_amount * month
    }
  end

  def calculate_monthly_value(month, growth_rates)
    accumulated_value = 0

    month.times do |month_index|
      accumulated_value += @monthly_purchase_amount
      growth_rate = growth_rates[month_index]
      accumulated_value *= growth_rate
    end

    accumulated_value.round
  end

  def calculate_growth_rates
    historical_averages = TARGET_PERIODS.map { |month| calculate_average_price_for_month(month) }
    historical_averages.unshift(@purchase_price)

    historical_averages.each_cons(2).map { |current_price, previous_price| current_price.to_f / previous_price }.reverse
  end

  def calculate_average_price_for_month(month)
    period_start = month.months.ago
    period_end = (month - 1).months.ago

    prices_in_period = @prices.select { |price| price.date >= period_start && price.date < period_end }
    prices_in_period.sum(&:close_price).to_f / prices_in_period.count
  end
end
