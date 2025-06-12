class CompaniesController < ApplicationController
  # GET /companies
  def index
    render json: Company.all.map(&:to_api), status: :ok
  end
end
