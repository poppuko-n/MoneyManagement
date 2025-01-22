# 銘柄一覧のレスポンスをbuildしてくれるクラス
class CompanyListBuilder
  class << self
    def build
      companies = Company.fetch_companies_with_sectors
      result    = companies.map { |company| build_company_data(company) }
    end

    private

    def build_company_data(company)
      code, name, sector_name = company
      latest_stock_price,  second_latest_stock_price = StockPrice.fetch_latest_two_price(code)
      price_difference                               = StockPriceDifferenceCalculator.calculate_price_difference(latest_stock_price, second_latest_stock_price)
      price_difference_rate                          = StockPriceDifferenceCalculator.calculate_price_difference_rate(price_difference, latest_stock_price)

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

  # NOTE: インナーモジュールなので、CompanyListBuilder::StockPriceDifferenceCalculator でアクセスする
  module StockPriceDifferenceCalculator
    def self.calculate_price_difference(latest_stock_price, second_latest_stock_price)
      latest_stock_price - second_latest_stock_price
    end

    def self.calculate_price_difference_rate(price_difference, latest_stock_price)
      (price_difference.to_f / latest_stock_price).round(2)
    end
  end
end