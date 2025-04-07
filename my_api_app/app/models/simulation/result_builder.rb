module Simulation
  class ResultBuilder
    class << self
      def call(simulated_results)
        {
          results: simulated_results,
          ai_analysis: AiAnalyzer.call(simulated_results)
        }
      end
    end
  end
end