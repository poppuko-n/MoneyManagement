class StockPrices::ProjectionAnalysesController < ApplicationController
  # GET /stock_prices/projection_analyses
  def index
    result = ProjectionAnalysisGenerator.new(projection_results).call
    render json: result, status: :ok
  end

  private

  def projection_results
    JSON.parse(params[:data])
  end
end
