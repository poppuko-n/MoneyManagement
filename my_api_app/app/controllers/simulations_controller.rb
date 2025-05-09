class SimulationsController < ApplicationController
  def create
    # params[:data] = [{"code"=>銘柄コード, "name"=>"銘柄名", "price"=>現在価格, "quantity"=>購入数量}]
    render json: Simulation::ResultBuilder.call(params[:data]), status: :ok
  end
end
