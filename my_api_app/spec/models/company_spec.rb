RSpec.describe Company, type: :model do
  let!(:sector_food) { create(:sector, name: '食品') }
  let!(:sector_energy) { create(:sector, name: 'エネルギー資源') }

  let!(:company_alpha)  { create(:company, code: 1, name: 'アルファ食品', equity: 100, sector: sector_food) }
  let!(:company_beta)  { create(:company, code: 2, name: 'ベータ食品', equity: 200, sector: sector_food) }
  let!(:company_ganma)  { create(:company, code: 3, name: 'ガンマエネルギー', equity: 300, sector: sector_food) }

  describe '::fetch_companies_with_sectors' do
    subject { Company.fetch_companies_with_sectors }

    it '配列が返される' do
      expect(subject).to be_an(Array)
    end

    it '全件（3件）が返される' do
      expect(subject.size).to eq(3)
    end

    it 'equityの大きい順に正しいデータが並ぶ' do
      expected_result = [
        [ company_ganma.code, company_ganma.name, company_ganma.sector.name ],
        [ company_beta.code,  company_beta.name,  company_beta.sector.name ],
        [ company_alpha.code, company_alpha.name, company_alpha.sector.name ]
      ]

      expect(subject).to eq(expected_result)
    end
  end

  describe 'バリデーションのテスト' do
    subject { Company.new(code: code, name: name, sector: sector) }
    let(:sector) { sector_food }
    let(:code) { 4 }
    let(:name) { "test_company" }

    context '正常系' do
      it '有効なカテゴリである' do
        expect(subject).to be_valid
      end
    end

    context '異常系' do
      context 'codeが未入力' do
        let(:code) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:code]).to include("を入力してください")
        end
      end

      context 'nameが未入力' do
        let(:name) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:name]).to include("を入力してください")
        end
      end

      context 'sectorが未入力' do
        let(:sector) { nil }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:sector]).to include("を入力してください")
        end
      end
    end

    context 'nameとsectorの重複チェック' do
      subject { Company.new(code: 1, name: "アルファ食品", sector: sector) }
      it 'valid?メソッドがfalseを返し、errorsに「すでに存在します」と格納されること' do
        expect(subject).not_to be_valid
        expect(subject.errors[:code]).to include("はすでに存在します")
        expect(subject.errors[:name]).to include("はすでに存在します")
      end
    end
  end

  describe 'アソシエーションのテスト' do
    it '業種を関連づけられる' do
      expect(company_alpha.sector).to eq(sector_food)
    end
  end
end
