class StockPrices::ProjectionsController < ApplicationController
  def create
    result = ProjectionGenerator.new(params[:data]).call
    render json: result
  end
end
