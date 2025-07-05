class StockPrices::ProjectionsController < ApplicationController
  # GET /stock_prices/projections
  def index
    result = ProjectionGenerator.new(projection_params).call
    render json: result
  end

  private

  def projection_params
    params.require(:data).map { |i| i.permit(:code, :quantity) }
  end
end