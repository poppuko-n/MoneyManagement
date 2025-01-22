RSpec.describe Company, type: :model do
  describe '::fetch_companies_with_sectors' do
    # Arrange = テストデータの準備
    before do
      sector_a = Sector.create!(name: "Technology")
      sector_b = Sector.create!(name: "Finance")

      Company.create!(code: 0, name: "Alpha Corp", sector: sector_a, equity: 500)
      Company.create!(code: 1, name: "Beta Ltd", sector: sector_b, equity: 700)
      Company.create!(code: 2, name: "Gamma Inc", sector: sector_a, equity: 600)
    end

    it '銘柄がequity（純資産）の大きい順に並び替えられていて全件返ってくる' do
      # Act = 実際にテストしたい対象のメソッドを呼び出す行為
      result = Company.fetch_companies_with_sectors

      aggregate_failures do
        # Assert = テスト結果の検証
        expect(result.is_a?(Array)).to eq(true)
        expect(result.size).to eq(3)

        # NOTE: equity（純資産）の大きい順に並び替えられていることを検証する
        expect(result[0]).to eq([1, "Beta Ltd", "Finance"])
        expect(result[1]).to eq([2, "Gamma Inc", "Technology"])
        expect(result[2]).to eq([0, "Alpha Corp", "Technology"])
      end
    end
  end
end
