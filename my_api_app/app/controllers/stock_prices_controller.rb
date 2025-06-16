class StockPricesController < ApplicationController
  # POST /stock_prices/refresh
  def refresh
    StockPriceUpdater.new.call
    render json: { message: "Stock prices updated" }, status: :ok
  end
end
