class StockPrices::Analyses < ApplicationController
  # POST /stock_prices/projections_analyses
  def create
    results = AiAnalyzer.new(params[:data]).call
    render json: results, status: :ok
  end
end
