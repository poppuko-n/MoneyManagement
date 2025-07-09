require 'rails_helper'

RSpec.describe "StockPrices::ProjectionAnalyses", type: :request do
  describe "GET /stock_prices/projection_analyses" do
    let(:test_data) { [{ "name" => "テスト株式", "one_time" => [], "accumulated" => [] }] }
    let(:mock_result) { "投資分析結果のメッセージ" }

    before do
      allow(ProjectionAnalysisGenerator).to receive(:new).and_return(double(call: mock_result))
    end

    it "ProjectionAnalysisGeneratorが呼ばれて結果が返される" do
      get "/stock_prices/projection_analyses", params: { data: test_data.to_json }
      
      expect(response).to have_http_status(:ok)
      expect(response.body).to eq(mock_result)
      expect(ProjectionAnalysisGenerator).to have_received(:new).with(test_data)
    end
  end
end 