class OneTimeProjectionGenerator
  TARGET_PERIODS = (1..12).to_a

  # 一括投資シミュレーションを実行するクラス
  #
  # @param quantity [Integer] 投資数量
  # @param prices [Array<StockPrice>]
  def initialize(quantity, prices)
    @prices = prices.sort_by(&:date)
    @purchase_price = @prices.last.close_price
    @purchase_amount = @purchase_price * quantity
  end

  def call
    TARGET_PERIODS.map { |month| create_monthly_result(month, calculate_growth_rates) }
  end

  private

  def create_monthly_result(month, growth_rates)
    {
      period: "#{month}_month",
      value: calculate_monthly_value_for_month(month, growth_rates),
      deposit: @purchase_amount
    }
  end

  def calculate_monthly_value_for_month(month, growth_rates)
    month.times.reduce(@purchase_amount) do |current_value, index|
      (current_value * growth_rates[index]).round
    end
  end

  def calculate_growth_rates
    historical_prices = [ @purchase_price ] + TARGET_PERIODS.map { |m| find_price_at_months_ago(m) }
    # 過去1年の成長パターンが今後も続くと仮定し、時系列を古い順に(reverse)
    historical_prices.reverse.each_cons(2).map { |old, new| (new.to_f / old).round(5) }
  end

  def find_price_at_months_ago(month)
    target_date = month.months.ago
    @prices.find { |p| p.date >= target_date }.close_price
  end
end
