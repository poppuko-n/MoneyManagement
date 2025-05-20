class StockPricesController < ApplicationController
  # POST /stock_prices/update
  def update
    StockPrice::Importer.call
    render json: { message: "Stock prices updated" }, status: :ok
  end

  # POST /stock_prices/simulate
  def simulate
    # params[:data] = [{"code"=>銘柄コード, "name"=>"銘柄名", "price"=>現在価格, "quantity"=>購入数量}]
    render json: StockPrice::SimulationResultBuilder.call(params[:data]), status: :ok
  end
end
