class CompaniesController < ApplicationController
  # GET /companies
  def index
    render json: Company.all.map(&:as_api_json), status: :ok
  end
end
