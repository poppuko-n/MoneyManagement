class StockPrices::ProjectionsController < ApplicationController
  def create
    codes = params[:data].map { |t| t[:code] }
    companies = Company.where(code: codes).index_by(&:code)
    prices = StockPrice.where(company_code: codes).group_by(&:company_code)

    results = params[:data].map { |t|
      company = companies[t[:code]]
      ps = prices[t[:code]]
      {
        name: company.name,
        current_price: ps.max_by(&:date)&.close_price,
        quantity: t[:quantity],
        one_time: OneTimeSimulator.new(company, t[:quantity], ps).call,
        accumulated: AccumulatedSimulator.new(company, t[:quantity], ps).call
      }
    }

    render json: results, status: :ok
  end
end
