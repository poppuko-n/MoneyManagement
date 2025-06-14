class AccumulatedSimulator
  TARGET_PERIODS = (1..12).to_a
  def initialize(company, quantity)
    @company = company
    @quantity = quantity
  end

  def call
    average_growth_rate = calculate_average_growth_rate
    monthly_deposit = @company.latest_stock_price * @quantity
    TARGET_PERIODS.map do |month|
      total_value = (0...month).sum do |i|
        monthly_deposit * (average_growth_rate ** (month-i))
      end
      {
        period: "#{month}_month",
        value: total_value.round,
        deposit: monthly_deposit * month
      }
    end
  end

  private

  def calculate_average_growth_rate
    rates = TARGET_PERIODS.map do |month|
      from = fetch_past_average_price(month)
      to   = month == 1 ? @company.latest_stock_price : fetch_past_average_price(month - 1)
      to / from
    end
    (rates.sum / rates.size).ceil(2)
  end

  def fetch_past_average_price(month)
      start_date = Date.today - month.months
      end_date = start_date + 30.days
      @company.stock_prices.where(date: start_date..end_date).average(:close_price)
  end
end
