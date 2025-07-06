module StockPriceRefresher
  extend self

  def call
    all_stock_prices = Company.pluck(:code).flat_map do |code|
      JquantsClient.fetch_daily_quotes(code).map do |quote|
        StockPrice.new(
          company_code: quote["Code"],
          date: quote["Date"],
          close_price: quote["Close"]
        )
      end
    end

    StockPrice.import! all_stock_prices, on_duplicate_key_update: [ :close_price ]
  end
end
