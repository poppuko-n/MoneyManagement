class CompaniesController < ApplicationController
  # GET /companies
  def index
    latest_prices = StockPrice.latest_price_map_by_code
    render json: Company.all_with_latest_prices(latest_prices), status: :ok
  end
end
