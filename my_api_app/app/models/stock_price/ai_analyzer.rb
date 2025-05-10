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
            model: "gpt-3.5-turbo",
            messages: [ { role: "user", content: prompt } ]
          }.to_json
          )
        JSON.parse(response.body)["choices"][0]["message"]["content"]
      end

      private

      def build_prompt(simulation_results)
        readable_results = simulation_results.map do |result|
          <<~TEXT
            銘柄: #{result[:name]}（#{result[:code]}）
            現在価格: #{result[:current_price]}円 / 保有数量: #{result[:quantity]}

            【一括運用】
            ・3ヶ月後: #{result[:simulation]["3_months_ago"]}円
            ・6ヶ月後: #{result[:simulation]["6_months_ago"]}円
            ・9ヶ月後: #{result[:simulation]["9_months_ago"]}円
            ・1年後: #{result[:simulation]["1_year_ago"]}円

            【積立運用】（毎月の購入額: #{result[:current_price] * result[:quantity]}円）
            ・3ヶ月後: #{result[:accumulation_simulation]["3_months_ago"]}円（総購入額: #{result[:current_price] * result[:quantity] * 3}円）
            ・6ヶ月後: #{result[:accumulation_simulation]["6_months_ago"]}円（総購入額: #{result[:current_price] * result[:quantity] * 6}円）
            ・9ヶ月後: #{result[:accumulation_simulation]["9_months_ago"]}円（総購入額: #{result[:current_price] * result[:quantity] * 9}円）
            ・1年後: #{result[:accumulation_simulation]["1_year_ago"]}円（総購入額: #{result[:current_price] * result[:quantity] * 12}円）
          TEXT
        end.join("\n-------------------------\n")

        <<~PROMPT
          あなたは投資初心者向けのアドバイザー。
          以下のシミュレーション結果を読み取り、初心者でも理解できるように、簡潔にアドバイスして。
          シミュレーションは過去と現在の株価を比較しその成長率から損益額を算出している。
          出力は Markdown 形式で記述。解答は敬語。

          ### 指示内容
          - 各銘柄のシミュレーション結果を簡潔に分析。大きな変動があった場合はその理由も含めて。たとえば時事事象も含めて。
          - 初心者向けに、今後の投資方針をわかりやすく提案。
          - 出力は「###」による見出しや箇条書きを活用し、視認性の高い構成に。

          ### シミュレーションデータ
          #{readable_results}
        PROMPT
      end
    end
  end
end
