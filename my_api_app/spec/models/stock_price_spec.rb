RSpec.describe StockPrice, type: :model do
  describe 'バリデーションのテスト' do
    subject { StockPrice.new(company_code: company_code, date: date, close_price: close_price) }
    let(:date) { Date.today }
    let(:close_price) { 1000 }
    let(:company_code) { company.code }
    let!(:company) { create(:company) }

    context '正常系' do
      it '有効なカテゴリーである' do
        expect(subject).to be_valid
      end
    end

    context '異常系' do
      context 'dateが未入力' do
        let(:date) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:date]).to include('を入力してください')
        end
      end

      context 'close_priceが未入力' do
        let(:close_price) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:close_price]).to include('を入力してください')
        end
      end
    end
  end
end
