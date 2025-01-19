RSpec.describe StockPrice, type: :model do
  describe '::fetch_latest_two_price(code)' do
    # Arrange = テストデータの準備
    before do
      sector = Sector.create!(name: "テスト業種")
      company = Company.create!(code: 1,sector: sector,  name: "テスト会社", equity: 2000  )

      StockPrice.create!(company: company, date:"2025-01-01", close_price: 1000)
      StockPrice.create!(company: company, date:"2025-01-02", close_price: 2000)
      StockPrice.create!(company: company, date:"2025-01-03", close_price: 3000)
    end

    it "日付上位２つの株価が返ってくる" do
      # Act = 実際にテストしたい対象のメソッドを呼び出す行為
      result = StockPrice.fetch_latest_two_price(1)

      aggregate_failures do
        # Assert = テスト結果の検証
        expect(result.is_a?(Array)).to eq(true)
        expect(result.size).to eq(2)

        # NOTE: 日付が上位２つなのか検証する
        expect(result[0]).to eq(3000)
        expect(result[1]).to eq(2000)
      end
    end
  end
end
#株価のテーブルから新しい日付の上位2つの株価をとってくる
# def self.fetch_latest_two_price(code)
#   StockPrice.where(company_code: code)
#             .order(date: :desc)
#             .limit(2)
#             .pluck(:close_price)
# end