class StockPrices::ProjectionsController < ApplicationController
  def create
    companies = Company.map_by_code(company_codes)
    prices = StockPrice.grouped_by_company_code(company_codes)
    results = params[:data].map { |t| build_projection_result(t, companies, prices) }
    render json: results, status: :ok
  end

  private

  def company_codes
    params[:data].map { |t| t[:code] }
  end

  def build_projection_result(t, companies, prices)
    company = companies[t[:code]]
    ps = prices[t[:code]] || []
    {
      name: company.name,
      current_price: ps.max_by(&:date)&.close_price,
      quantity: t[:quantity],
      one_time: OneTimeSimulator.new(t[:quantity], ps).call,
      accumulated: AccumulatedSimulator.new(t[:quantity], ps).call
    }
  end
end
