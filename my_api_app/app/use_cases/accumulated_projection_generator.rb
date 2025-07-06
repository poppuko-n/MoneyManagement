class AccumulatedProjectionGenerator
  TARGET_PERIODS = (1..12).to_a

  # 積立投資シミュレーションを実行するクラス
  #
  # @param quantity [Integer] 毎月の投資数量
  # @param prices [Array<StockPrice>] 株価データの配列
  def initialize(quantity, prices)
    @prices = prices.sort_by(&:date)
    @purchase_price = @prices.last.close_price
    @monthly_purchase_amount = @purchase_price * quantity
  end

  def call
    TARGET_PERIODS.map { |month| create_monthly_result(month, calculate_growth_rates) }
  end

  private

  def create_monthly_result(month, growth_rates)
    {
      period: "#{month}_month",
      value: calculate_accumulated_value_for_month(month, growth_rates),
      deposit: @monthly_purchase_amount * month
    }
  end

  def calculate_accumulated_value_for_month(month, growth_rates)
    value = 0

    # 評価額に積立額を加え、成長率をかけて複利運用
    month.times do |month_index|
      value += @monthly_purchase_amount
      value *= growth_rates[month_index]
    end

    value.round
  end

  def calculate_growth_rates
    historical_averages = [ @purchase_price ] + TARGET_PERIODS.map { |month| calculate_average_price_at_months_ago(month) }
    # 過去1年の成長パターンが今後も続くと仮定し、時系列を古い順に(reverse)
    historical_averages.reverse.each_cons(2).map { |old, new| (new.to_f / old).round(5) }
  end

  def calculate_average_price_at_months_ago(month)
    period_start = month.months.ago
    period_end = (month - 1).months.ago
    # 積立投資の分散効果を表現するため、1ヶ月間の株価の平均を算出
    prices_in_period = @prices.select { |price| price.date >= period_start && price.date < period_end }
    prices_in_period.sum(&:close_price).to_f / prices_in_period.count
  end
end
