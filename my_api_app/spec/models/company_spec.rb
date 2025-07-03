RSpec.describe Company, type: :model do
  let!(:company_alpha) { create(:company, code: 1, name: 'アルファ食品', sector_name: '食品') }
  let!(:company_beta) { create(:company, code: 2, name: 'ベータ食品', sector_name: '食品') }

  describe 'バリデーションのテスト' do
    subject { Company.new(code: code, name: name, sector_name: sector_name) }
    let(:sector_name) { '食品' }
    let(:code) { 3 }
    let(:name) { "test_company" }

    context '正常系' do
      it '有効な企業である' do
        expect(subject).to be_valid
      end
    end

    context '異常系' do
      context 'codeが未入力' do
        let(:code) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:code]).to include("を入力してください")
          end
        end
      end

      context 'nameが未入力' do
        let(:name) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:name]).to include("を入力してください")
          end
        end
      end

      context 'sector_nameが未入力' do
        let(:sector_name) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:sector_name]).to include("を入力してください")
          end
        end
      end

      context 'codeが重複している場合' do
        subject { Company.new(code: 1, name: "新会社", sector_name: "新業種") }
        it 'valid?メソッドがfalseを返し、errorsに「すでに存在します」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:code]).to include("はすでに存在します")
          end
        end
      end
    end
  end

  describe 'アソシエーションのテスト' do
    it '株価データを関連づけられる' do
      expect(company_alpha.stock_prices).to be_empty
    end
  end
end
