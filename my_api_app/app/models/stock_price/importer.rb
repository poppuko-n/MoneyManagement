class StockPrice
  module Importer
    BASE_SIZE = 1000

    class << self
      def call
        stock_prices = StockPrice::WeeklyStockFetcher::TARGET_CODES.flat_map do |code|
           format_stock_prices(StockPrice::WeeklyStockFetcher.call(code))
        end
        import_with_logging(stock_prices)
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

      def import_with_logging(stock_prices)
        stock_prices.each_slice(BASE_SIZE) do |batch|
          valid_stprice, unvalid_stprice = batch.partition(&:valid?)
          log_errors(unvalid_stprice) unless unvalid_stprice.empty?
          StockPrice.import valid_stprice, on_duplicate_key_update: [:close_price]
        end
      end

      def log_errors(records)
        records.each {|record| puts record.errors.full_messages}
      end
    end
  end
end
