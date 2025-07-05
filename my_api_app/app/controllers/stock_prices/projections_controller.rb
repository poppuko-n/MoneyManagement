class StockPrices::ProjectionsController < ApplicationController
  # GET /stock_prices/projections
  def index
    result = ProjectionGenerator.new(params[:data]).call
    render json: result
  end
end