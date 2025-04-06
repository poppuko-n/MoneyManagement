class StockPrice
  module DifferenceAnalyzer
    class << self
      def calculate_price_difference(latest_stock_price, second_latest_stock_price)
        latest_stock_price - second_latest_stock_price
      end

      def calculate_price_difference_rate(price_difference, latest_stock_price)
        (price_difference.to_f / latest_stock_price).round(2)
      end
    end
  end
end