class Company
  module ListBuilder
    class << self
      def call
        companies = Company.fetch_companies_with_sectors
        result    = companies.map { |company| build_company_data(company) }
      end

      private

      def build_company_data(company)
        code, name, sector_name = company
        latest_stock_price,  second_latest_stock_price = StockPrice.fetch_latest_two_price(code)
        price_difference                               = StockPrice::DifferenceAnalyzer.calculate_price_difference(latest_stock_price, second_latest_stock_price)
        price_difference_rate                          = StockPrice::DifferenceAnalyzer.calculate_price_difference_rate(price_difference, latest_stock_price)

        {
          code: code,
          name: name,
          sector_name: sector_name,
          latest_price: latest_stock_price,
          price_difference: price_difference,
          price_difference_rate: price_difference_rate
        }
      end
    end
  end
end
