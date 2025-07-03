class CompaniesController < ApplicationController
  # GET /companies
  def index
    render json: Company.all_with_latest_prices, status: :ok
  end
end
