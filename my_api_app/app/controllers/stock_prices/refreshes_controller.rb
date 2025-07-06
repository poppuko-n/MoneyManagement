class StockPrices::RefreshesController < ApplicationController
  # POST /stock_prices/refreshes
  def create
    StockPriceRefresher.call
    render json: { message: "Stock prices refreshed" }, status: :ok
  end
end
