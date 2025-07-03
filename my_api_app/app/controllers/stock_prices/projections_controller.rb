class StockPrices::ProjectionsController < ApplicationController
  def create
    companies = Company.map_by_code(company_codes)
    prices = StockPrice.grouped_by_company_code(company_codes)
    
    render json: params[:data].map { |data| build_projection_result(data, companies, prices) }
  end

  private

  def company_codes
    params[:data].map { |t| t[:code] }
  end

  def build_projection_result(data, companies, prices)
    {
      name: companies[data[:code]].name,
      current_price: prices[data[:code]].max_by(&:date).close_price,
      quantity: data[:quantity],
      one_time: simulate_one_time(data[:quantity], prices[data[:code]]),
      accumulated: simulate_accumulated(data[:quantity], prices[data[:code]])
    }
  end

  def simulate_one_time(quantity, prices)
    OneTimeSimulator.new(quantity, prices).call
  end

  def simulate_accumulated(quantity, prices)
    AccumulatedSimulator.new(quantity, prices).call
  end
end
