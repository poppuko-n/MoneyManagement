class CompaniesController < ApplicationController
  # GET /companies
  def index
    latest_prices_by_code = StockPrice.latest_prices_by_code
    companies = Company.find_each.map { |c| c.as_json.merge("latest_price" => latest_prices_by_code[c.code]) }
    render json: companies, status: :ok
  end
end
