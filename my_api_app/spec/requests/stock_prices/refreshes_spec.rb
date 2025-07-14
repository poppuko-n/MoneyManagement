require 'rails_helper'

RSpec.describe "StockPrices::Refreshes", type: :request do
  describe "POST /stock_prices/refreshes" do
    before do
      allow(StockPriceRefresher).to receive(:call)
    end

    it "StockPriceRefresherが呼ばれて成功メッセージが返される" do
      post "/stock_prices/refreshes"

      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to eq({ "message" => "Stock prices refreshed" })
      expect(StockPriceRefresher).to have_received(:call)
    end
  end
end
