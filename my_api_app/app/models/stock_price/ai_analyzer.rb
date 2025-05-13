require "httparty"

class StockPrice
  module AiAnalyzer
    BASE_URL = "https://api.openai.com/v1/chat/completions".freeze

    class << self
      def call(simulation_results)
        prompt = build_prompt(simulation_results)

        response = HTTParty.post(
          BASE_URL,
          headers: {
            "Content-Type" => "application/json",
            "Authorization" => "Bearer #{Rails.application.credentials.openai[:api_key]}"
          },
          body: {
            model: "gpt-4",
            messages: [ { role: "user", content: prompt } ]
          }.to_json
          )
        JSON.parse(response.body)["choices"][0]["message"]["content"]
      end

      private

      def build_prompt(simulation_results)
        body = simulation_results.map do |result|
          name = result[:name]
          one_time = result[:one_time]
          accumulated = result[:accumulated]

          <<~T
            #{name}
            一括: #{one_time.map { |s| "#{s[:period]}=#{s[:value]}(#{s[:deposit]})" }.join(", ")}
            積立: #{accumulated.map { |s| "#{s[:period]}=#{s[:value]}(#{s[:deposit]})" }.join(", ")}
          T
        end.join("\n")

        <<~PROMPT
          あなたは投資初心者向けのアドバイザー。
          以下のシミュレーション結果を読み取り、初心者でも理解できるように、簡潔にアドバイスして。
          シミュレーションは過去と現在の株価を比較しその成長率から損益額を算出している。

          ### 指示内容
          - 各銘柄のシミュレーション結果を簡潔に分析。大きな変動があった場合はその理由も含めて。たとえば時事事象も含めて。
          - 初心者向けに、今後の投資方針をわかりやすく提案。
          - 出力は「###」による見出しや箇条書きを活用し、視認性の高い構成に。
          - ２つ以上の銘柄がある場合は、銘柄毎ではなく全体的な傾向を分析して。
          - 回答は、敬語かつ簡潔にして。
          
          ### シミュレーションデータ
          一括: の各値は 期間=評価額(投資額)。積立: は期間=評価額(累計投資額)である。
          #{body}
        PROMPT
      end
    end
  end
end
