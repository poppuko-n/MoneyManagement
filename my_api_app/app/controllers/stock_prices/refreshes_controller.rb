class StockPrices::RefreshesController < ApplicationController
  #POST /stock_prices/refreshes
  def create
    StockPriceUpdater.new.call
    render json: { message: "Stock prices refreshed" }, status: :ok
  end
end