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
      
    end
  end
end
