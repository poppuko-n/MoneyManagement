class CompaniesController < ApplicationController
  def index
    companies = Company
                  .joins("INNER JOIN sectors ON companies.sector_id = sectors.id")
                  .select("companies.code, companies.name, sectors.name AS sector_name")
                  .order("companies.equity")

    result = companies.map do |company|
      latest_stock_price = StockPrice.latest_for_company(company.code)
      {
        code: company.code,
        name: company.name,
        sector_name: company.sector_name,
        latest_price: latest_stock_price
      }
    end
    render json: result
  end
end
