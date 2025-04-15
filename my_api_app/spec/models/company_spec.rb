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

  describe 'バリデーション' do
    let(:sector) { Sector.create!(name: "一般") }

    context '正常な場合' do
      it 'すべての属性が揃っていれば有効' do
        company = Company.new(code: 100, name: "テスト株式会社", sector: sector)
        expect(company).to be_valid
      end
    end

    context '必須項目が欠けている場合' do
      it 'code が無いと無効' do
        company = Company.new(name: "NoCode", sector: sector)
        expect(company).not_to be_valid
        expect(company.errors[:code]).to include("を入力してください")
      end

      it 'name が無いと無効' do
        company = Company.new(code: 101, sector: sector)
        expect(company).not_to be_valid
        expect(company.errors[:name]).to include("を入力してください")
      end

      it 'sector_id が無いと無効' do
        company = Company.new(code: 102, name: "NoSector")
        expect(company).not_to be_valid
        expect(company.errors[:sector_id]).to include("を入力してください")
      end
    end

    context '重複チェック' do
      before { Company.create!(code: 103, name: "ユニーク会社", sector: sector) }

      it 'code が重複していると無効' do
        company = Company.new(code: 103, name: "他の会社", sector: sector)
        expect(company).not_to be_valid
        expect(company.errors[:code]).to include("はすでに存在します")
      end

      it 'name が重複していると無効' do
        company = Company.new(code: 104, name: "ユニーク会社", sector: sector)
        expect(company).not_to be_valid
        expect(company.errors[:name]).to include("はすでに存在します")
      end
    end
  end
end
