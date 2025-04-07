require 'httparty'

module Simulation
  class AiAnalyzer
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
            messages: [{ role: "user", content: prompt }]
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
      
            【通常運用】
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
          あなたは投資初心者向けのアドバイザーです。
          以下のシミュレーション結果を読み取り、初心者でも理解できるように、簡潔にアドバイスしてください。
          出力は Markdown 形式で記述してください。
      
          ### 指示内容
          - 各業種の傾向を簡潔に分析してください。
          - 初心者向けに、今後の投資方針をわかりやすく提案してください。
          - 出力は「###」による見出しや箇条書きを活用し、視認性の高い構成にしてください。
          - 積立運用では「現在価格 × 保有数量」を毎月購入したと仮定し、月ごとの平均株価の成長率を反映した評価額となっています。
            したがって、「現在価格 × 保有数量 × 月数」とシミュレーション結果の金額との差が損益額です。
            この点も踏まえた上で、適切な解説を行ってください。
      
          ### シミュレーションデータ
          #{readable_results}
        PROMPT
      end      
    end
  end
end
