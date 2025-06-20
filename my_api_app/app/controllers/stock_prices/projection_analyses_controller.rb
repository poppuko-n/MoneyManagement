class StockPrices::ProjectionAnalysesController < ApplicationController
  # POST /stock_price/projections_analyses
  def create
    results = AiAnalyzer.new(params[:data]).call
    render json: results, status: :ok
  end
end
