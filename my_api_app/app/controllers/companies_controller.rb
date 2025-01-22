class CompaniesController < ApplicationController
  def index
    result = CompanyListBuilder.build
    render json: result
  end
end
