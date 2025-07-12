require 'rails_helper'

RSpec.describe JquantsClient, type: :model do
  let(:mock_response) { double("HTTParty::Response") }
  let(:mock_body) { { "daily_quotes" => [{"Code" => "1234", "Date" => "20240101", "Close" => 100}] }.to_json }
  let(:mock_info_body) { { "info" => [{"Code" => "1234", "CompanyName" => "Test Company"}] }.to_json }
  let(:mock_token_body) { { "idToken" => "test_token_123" }.to_json }

  before do
    stub_const("JquantsClient::REFRESH_TOKEN", "test_refresh_token")
  end

  describe '#fetch_daily_quotes' do
    let(:code) { "1234" }
    let(:months_ago) { 2 }

    before do
      allow(HTTParty).to receive(:post).with(
        "https://api.jquants.com/v1/token/auth_refresh",
        query: { refreshtoken: "test_refresh_token" }
      ).and_return(double(body: mock_token_body))

      allow(HTTParty).to receive(:get).with(
        "https://api.jquants.com/v1/prices/daily_quotes",
        query: {
          code: code,
          from: (Date.today << months_ago).strftime("%Y%m%d"),
          to: Date.today.strftime("%Y%m%d")
        },
        headers: { Authorization: "test_token_123" }
      ).and_return(double(body: mock_body))
    end

    it 'APIから日次株価データを取得する' do
      result = described_class.fetch_daily_quotes(code, months_ago: months_ago)
      
      expect(result).to be_an(Array)
      expect(result.first).to include("Code" => "1234", "Date" => "20240101", "Close" => 100)
    end

    it 'デフォルトでは2ヶ月前からのデータを取得する' do
      expect(HTTParty).to receive(:get).with(
        "https://api.jquants.com/v1/prices/daily_quotes",
        query: {
          code: code,
          from: (Date.today << 2).strftime("%Y%m%d"),
          to: Date.today.strftime("%Y%m%d")
        },
        headers: { Authorization: "test_token_123" }
      ).and_return(double(body: mock_body))

      described_class.fetch_daily_quotes(code)
    end
  end

  describe '#fetch_company_info' do
    let(:code) { "1234" }

    before do
      allow(HTTParty).to receive(:post).with(
        "https://api.jquants.com/v1/token/auth_refresh",
        query: { refreshtoken: "test_refresh_token" }
      ).and_return(double(body: mock_token_body))

      allow(HTTParty).to receive(:get).with(
        "https://api.jquants.com/v1/listed/info",
        query: { code: code },
        headers: { Authorization: "test_token_123" }
      ).and_return(double(body: mock_info_body))
    end

    it 'APIから企業情報を取得する' do
      result = described_class.fetch_company_info(code)
      
      expect(result).to be_an(Array)
      expect(result.first).to include("Code" => "1234", "CompanyName" => "Test Company")
    end
  end

  describe '#id_token' do
    before do
      allow(HTTParty).to receive(:post).with(
        "https://api.jquants.com/v1/token/auth_refresh",
        query: { refreshtoken: "test_refresh_token" }
      ).and_return(double(body: mock_token_body))
    end

    it 'リフレッシュトークンを使用してIDトークンを取得する' do
      token = described_class.send(:id_token)
      
      expect(token).to eq("test_token_123")
    end
  end
end 