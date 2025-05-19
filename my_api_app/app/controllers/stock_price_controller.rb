class StockPriceController < ApplicationController
  # POST /stock_price/update
  def update
    StockPrice::Importer.call
    render json: { message: "Stock prices updated" }, status: :ok
  end
end
