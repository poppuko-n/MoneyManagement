# NOTE:
# フロントエンドから送られてきた複数の投資シミュレーションデ対象（銘柄コード・銘柄名・現在価格・数量）に対し、
# シミュレーション（一括＋積立）を実行し、その結果一覧とAIによる診断結果を返す。
# - `results`: 各銘柄ごとのシミュレーション結果（hashの配列）
# - `ai_analysis`: 全体に対するAI分析結果（md形式）

class StockPrice
  module SimulationResultBuilder
    def self.call(investment_simulation_targets)
      results = investment_simulation_targets.map do |target|
        StockPrice::InvestmentSimulator.call(target)
      end

      {
        results: results,
        ai_analysis: AiAnalyzer.call(results)
      }
    end
  end
end
