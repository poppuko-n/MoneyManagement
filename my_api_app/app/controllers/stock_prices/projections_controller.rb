class StockPrices::ProjectionsController < ApplicationController
  def create
    companies = Company.where(code: set_company_code).index_by(&:code)
    prices = StockPrice.where(company_code: set_company_code).group_by(&:company_code)

    results = params[:data].map { |t|
      company = companies[t[:code]]
      ps = prices[t[:code]]
      {
        name: company.name,
        current_price: ps.max_by(&:date)&.close_price,
        quantity: t[:quantity],
        one_time: OneTimeSimulator.new(t[:quantity], ps).call,
        accumulated: AccumulatedSimulator.new(t[:quantity], ps).call
      }
    }

    render json: results, status: :ok
  end

  private

  def set_company_code
    params[:data].map { |t| t[:code] }
  end
end
