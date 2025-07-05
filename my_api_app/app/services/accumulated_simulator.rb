class AccumulatedSimulator
  TARGET_PERIODS = (1..12).to_a

  # 積立投資シミュレーションを実行するクラス
  #
  # @param quantity [Integer] 毎月の投資数量
  # @param prices [Array<StockPrice>] 株価データの配列
  def initialize(quantity, prices)
    @quantity = quantity
    @prices = prices.sort_by(&:date)
    @latest_price = @prices.last.close_price
    @monthly_deposit = @latest_price * @quantity
  end

  def call
    monthly_growth_rates = calculate_monthly_growth_rates
    TARGET_PERIODS.map { |month| build_monthly_result(month, monthly_growth_rates) }
  end

  private

  def build_monthly_result(month, monthly_growth_rates)
    {
      period: "#{month}_month",
      value: calculate_total_value(month, monthly_growth_rates).round,
      deposit: @monthly_deposit * month
    }
  end

  def calculate_total_value(month, monthly_growth_rates)
    total_value = 0

    month.times do |i|
      total_value += @monthly_deposit
      growth_rate = monthly_growth_rates[i]
      total_value *= growth_rate
    end

    total_value
  end

  def calculate_monthly_growth_rates
    monthly_averages = TARGET_PERIODS.map { |month| calculate_monthly_average_price(month) }
    monthly_averages.unshift(@latest_price)

    monthly_averages.each_cons(2).map { |current, previous| current.to_f / previous }.reverse
  end

  def calculate_monthly_average_price(month)
    start_date = month.months.ago
    end_date = (month - 1).months.ago

    month_prices = @prices.select { |p| p.date >= start_date && p.date < end_date }
    month_prices.sum(&:close_price).to_f / month_prices.count
  end
end
