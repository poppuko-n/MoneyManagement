class CompaniesController < ApplicationController
  # GET /companies
  def index
    latest_prices = StockPrice.where(id: StockPrice.group(:company_code).maximum(:id).values).index_by(&:company_code)
    render json: Company.all.map { |c| c.as_json.merge(latest_price: latest_prices[c.code].close_price) }, status: :ok
  end
end
