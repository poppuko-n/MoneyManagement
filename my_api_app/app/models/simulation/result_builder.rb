# NOTE:
# フロントエンドから送られてきた複数の投資シミュレーションデ対象（銘柄コード・銘柄名・現在価格・数量）に対し、
# シミュレーション（一括＋積立）を実行し、その結果一覧とAIによる診断結果を返す。
# - `results`: 各銘柄ごとのシミュレーション結果（hashの配列）
# - `ai_analysis`: 全体に対するAI分析結果（md形式）

module Simulation
  class ResultBuilder
    def self.call(investment_simulation_targets)
      simulated_results = investment_simulation_targets.map { |target| Simulation::InvestmentSimulator.call(target) }
      {
        results: simulated_results,
        ai_analysis: AiAnalyzer.call(simulated_results)
      }
    end
  end
end
