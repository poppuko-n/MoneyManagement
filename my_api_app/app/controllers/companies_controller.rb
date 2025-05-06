class CompaniesController < ApplicationController
  # GET /companies
  def index
    render json: Company::ListBuilder.call, status: :ok
  end
end
