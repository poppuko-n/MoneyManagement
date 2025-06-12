class StockPricesController < ApplicationController
  # POST /stock_prices/update
  def update
    StockPrice::Importer.call
    render json: { message: "Stock prices updated" }, status: :ok
  end

  # POST /stock_prices/simulate
  def simulate
    # params[:data] = [{"code"=>銘柄コード, "name"=>"銘柄名", "price"=>現在価格, "quantity"=>購入数量}]
    render json: build_simulation_result(params[:data]), status: :ok
  end

  private

  def build_simulation_result(investment_simulation_targets)
        results = investment_simulation_targets.map do |target|
        StockPrice::InvestmentSimulator.call(target)
      end
      {
        results: results,
        ai_analysis: StockPrice::AiAnalyzer.call(results)
      }
  end
end
