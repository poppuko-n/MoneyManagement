class StockPricesController < ApplicationController
  # POST /stock_prices/update
  def update
    StockPrice::Importer.call
    render json: { message: "Stock prices updated" }, status: :ok
  end

  # POST /stock_prices/simulate
  def simulate
    results = params[:data].map { |target| to_api(target) }
    ai_analysis = AiAnalyzer.new(results).call
    render json: { results:, ai_analysis: }, status: :ok
  end

  private

  def to_api(target)
    company_code, quantity  = target.values_at(:code, :quantity)
    company = Company.find_by!(code: company_code)
    {
      name: company.name,
      current_price: company.latest_stock_price,
      quantity: quantity,
      one_time: OneTimeSimulator.new(company, quantity).call,
      accumulated: AccumulatedSimulator.new(company, quantity).call
    }
  end
end
