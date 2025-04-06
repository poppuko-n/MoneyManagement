class CompaniesController < ApplicationController
  def index
    result = Company::ListBuilder.call
    render json: result
  end
end
