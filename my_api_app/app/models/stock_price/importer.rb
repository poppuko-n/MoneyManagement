class StockPrice
  module Importer
    class << self
      def call
        StockPrice::WeeklyStockFetcher::TARGET_CODES.each do |code|
          stock_prices = format_stock_prices(StockPrice::WeeklyStockFetcher.call(code))
          StockPrice.import stock_prices, on_duplicate_key_update: [:close_price]
        end
      end

      private

      def format_stock_prices(quotes)
        quotes.map do |quote|
          StockPrice.new(
            company_code: quote["Code"].to_i,
            date: quote["Date"],
            close_price: quote["Close"]
          )
        end
      end
    end
  end
end
