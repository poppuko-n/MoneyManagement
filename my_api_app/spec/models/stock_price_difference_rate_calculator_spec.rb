RSpec.describe CompanyListBuilder::StockPriceDifferenceCalculator, type: :model do
  describe 'calculate_price_difference_rate(price_difference, latest_stock_price)' do
    let(:latest_stock_price) { 3000 }
    let(:price_difference) { 1000 }
    let(:second_latest_stock_price) { 2000 }

    # Arrange = テストデータの準備
    before do
      latest_stock_price
      price_difference
      second_latest_stock_price
    end

    it "株価の差分を算出する" do
      # Act = 実際にテストしたい対象のメソッドを呼び出す行為
      price_defference = described_class.calculate_price_difference_rate(price_difference, latest_stock_price) # => CompanyListBuilder::StockPriceDifferenceCalculator
      price_defference_rate = described_class.calculate_price_difference(latest_stock_price, second_latest_stock_price)

      aggregate_failures do
        expect(price_defference.is_a?(Float)).to eq(true)
        expect(price_defference).to eq(0.33)

        expect(price_defference_rate.is_a?(Integer)).to eq(true)
        expect(price_defference_rate).to eq(1000)
      end
    end
  end
end
