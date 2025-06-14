class StockPricesController < ApplicationController
  # POST /stock_prices/update
  def update
    StockPrice::Importer.call
    render json: { message: "Stock prices updated" }, status: :ok
  end

  # POST /stock_prices/simulate
  def simulate
    render json: build_simulation_result(params[:data]), status: :ok
  end

  private

  def build_simulation_result(simulation_targets)
      results = simulation_targets.map { |target| simulation_investment(target) }
      {
        results: results,
        ai_analysis: StockPrice::AiAnalyzer.call(results)
      }
  end

  def simulation_investment(target)
    company_code, quantity  = target.values_at(:code, :quantity)
    company = Company.find_by(code: company_code)
        {
          name: company.name,
          current_price: company.latest_stock_price,
          quantity: quantity,
          one_time: OneTimeSimulator.new(company, quantity).call,
          accumulated: AccumulatedSimulator.new(company, quantity).call
        }
  end
end
