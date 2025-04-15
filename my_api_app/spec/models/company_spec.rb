RSpec.describe Company, type: :model do
  describe '::fetch_companies_with_sectors' do
    # カゲゴリーの作成
    let!(:sector_food) { Sector.create!(name: "食品") }
    let!(:sector_ennergy) { Sector.create!(name: "エネルギー資源") }
    # 会社の作成
    let!(:company_alpha) { Company.create!(code: 1, name: "アルファ食品", sector: sector_food, equity: 100) }
    let!(:company_beta) { Company.create!(code: 2, name: "ベータ食品", sector: sector_food, equity: 200) }
    let!(:company_ganma) { Company.create!(code: 3, name: "ガンマエネルギー", sector: sector_ennergy, equity: 300) }

    subject {Company.fetch_companies_with_sectors}

    it '配列が返される' do
      expect(subject).to be_an(Array)
    end
  
    it '全件（3件）が返される' do
      expect(subject.size).to eq(3)
    end
  
    it 'equityの大きい順に正しいデータが並ぶ' do
      expected_result = [
        [company_ganma.code, company_ganma.name, sector_ennergy.name],
        [company_beta.code, company_beta.name, sector_food.name],
        [company_alpha.code, company_alpha.name, sector_food.name],
      ]
      expect(subject).to eq(expected_result)
    end
  end
end
