# 業種付きの企業一覧を時価総額順に並べ、
# 各企業の最新株価・価格差・変化率を含むデータを生成するユーティリティ。

class Company
  module ListBuilder
    class << self
      def call
        fetch_ranked_companies_with_sectors.map { |company| build_with_diff_price(company) }
      end

      private

      def fetch_ranked_companies_with_sectors
        Company.joins(:sector)
               .order(equity: :desc)
               .pluck(:code, :name, "sectors.name")
      end

      def build_with_diff_price(company)
        code, name, sector_name = company
        latest, second = fetch_latest_prices(code)
        diff = latest - second

        {
          code: code,
          name: name,
          sector_name: sector_name,
          latest_price: latest,
          price_difference: diff,
          price_difference_rate: (diff.to_f / latest).round(2)
        }
      end

      def fetch_latest_prices(company_code)
        StockPrice.where(company_code: company_code)
                  .order(date: :desc)
                  .limit(2)
                  .pluck(:close_price)
      end
    end
  end
end
