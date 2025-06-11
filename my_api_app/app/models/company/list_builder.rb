class Company
  module ListBuilder
    class << self
      def call
        Company.all.map { |company| build_with_diff_price(company) }
      end

      private

      def build_with_diff_price(company)
        {
          code: company.code,
          name: company.name,
          sector_name: company.sector.name,
          latest_price: company.latest_stock_price
        }
      end
    end
  end
end
