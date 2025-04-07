class SimulationsController < ApplicationController
  def create
    # TODO: dataの型を書く
    data = params[:data]
    simulated_results = data.map { |item| Simulation::InvestmentSimulator.call(item) }
    render json: Simulation::ResultBuilder.call(simulated_results), status: :ok
  end
end
