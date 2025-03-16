class StockPriceUpdateController < ApplicationController
  def create
    StockPrice::Importer.call
    render json: { message: "Stock prices updated" }, status: :ok
  end
end
