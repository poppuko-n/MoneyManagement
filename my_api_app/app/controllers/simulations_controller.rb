class SimulationsController < ApplicationController
  def create
    # TODO: dataの型を書く
    data = params[:data]
    simulated_results = data.map { |item| StockPrice::Simulator.call(item) }
    render json: { results: simulated_results }, status: :ok
  end
end
