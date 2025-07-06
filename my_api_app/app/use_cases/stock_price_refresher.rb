module StockPriceRefresher
  extend self

  def call
    stock_prices = Company.pluck(:code).flat_map { |code| format_stock_prices(code) }
    StockPrice.import! stock_prices, on_duplicate_key_update: [ :close_price ]
  end

  private

  def format_stock_prices(code)
    JquantsClient.new.fetch_daily_quotes(code).map { |quote|
      StockPrice.new(
        company_code: quote["Code"],
        date: quote["Date"],
        close_price: quote["Close"]
      )
    }
  end
end 