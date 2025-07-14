require 'rails_helper'

RSpec.describe "StockPrices::Projections", type: :request do
  describe "GET /stock_prices/projections" do
    let(:test_data) { [ { "code" => "1234", "quantity" => 100 } ] }
    let(:mock_result) { [ { "name" => "テスト株式", "current_price" => 1000, "quantity" => 100 } ] }

    before do
      allow(ProjectionGenerator).to receive(:new).and_return(double(call: mock_result))
    end

    it "ProjectionGeneratorが呼ばれて結果が返される" do
      get "/stock_prices/projections", params: { data: test_data.to_json }

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to eq(mock_result)
      expect(ProjectionGenerator).to have_received(:new).with(test_data)
    end
  end
end
