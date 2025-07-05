class StockPrices::ProjectionsController < ApplicationController
  # GET /stock_prices/projections
  def index
    result = ProjectionGenerator.new(projection_params).call
    render json: result, status: :ok
  end

  private

  def projection_params
    JSON.parse(params[:data])
  end
end
