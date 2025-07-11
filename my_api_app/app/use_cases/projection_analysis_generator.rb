class ProjectionAnalysisGenerator
  BASE_URL = "https://api.openai.com/v1/chat/completions".freeze
  def initialize(projection_results)
    @projection_results = projection_results
  end

  def call
    response = HTTParty.post(
      BASE_URL,
      headers: {
        "Content-Type" => "application/json",
        "Authorization" => "Bearer #{Rails.application.credentials.openai[:api_key]}"
      },
      body: {
        model: "gpt-4",
        messages: [ { role: "user", content: build_prompt } ]
      }.to_json
    )
    JSON.parse(response.body)["choices"][0]["message"]["content"]
  end

  private

  def build_prompt
    <<~PROMPT
      あなたは投資初心者向けのアドバイザー。
      以下はシミュレーション結果。
      過去と現在の株価を比較しその成長率から評価額を算出している。
      ### 各値の意味
      - 評価額（value）: 実際に投資した場合の現在価値。
      - 預金額（deposit）: 同額を投資せず、ただ預金していた場合の元本。
      - 「期間=評価額(預金額)」の形式でデータが並んでいる。
      ### 指示内容
      - 初心者向けに、今後の投資方針をわかりやすく提案。
      - 出力は「###」による見出しや箇条書きを活用し、簡潔かつコンパクトに。
      - ２つ以上の銘柄がある場合は、銘柄毎ではなく全体的な傾向を分析して。
      - 回答は、敬語で。
      ### シミュレーション結果
      #{format_results}
    PROMPT
  end

  def format_results
    @projection_results.map do |result|
      <<~T
        #{result["name"]}
        一括: #{result["one_time"].map { |s| "#{s["period"]}=#{s["value"]}(#{s["deposit"]})" }.join(", ")}
        積立: #{result["accumulated"].map { |s| "#{s["period"]}=#{s["value"]}(#{s["deposit"]})" }.join(", ")}
      T
    end.join("\n")
  end
end
