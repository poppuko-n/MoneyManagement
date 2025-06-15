class StockPricesController < ApplicationController
  # POST /stock_prices/update
  def update
    StockPriceUpdater.new.call
    render json: { message: "Stock prices updated" }, status: :ok
  end
end
