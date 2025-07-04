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
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:date]).to include('を入力してください')
          end
        end
      end

      context 'close_priceが未入力' do
        let(:close_price) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:close_price]).to include('を入力してください')
          end
        end
      end
    end
  end

  describe 'アソシエーションのテスト' do
    let!(:company) { create(:company, code: '1001', name: 'テスト会社') }
    let!(:stock_price) { create(:stock_price, company: company) }

    it 'companyと関連付けられている' do
      expect(stock_price.company).to eq(company)
    end

    it 'company_codeでcompanyを参照している' do
      expect(stock_price.company_code).to eq(company.code)
    end
  end

  describe 'クラスメソッドのテスト' do
    let!(:company1) { create(:company, code: '1001', name: '会社1') }
    let!(:company2) { create(:company, code: '1002', name: '会社2') }
    
    before do
      create(:stock_price, company: company1, date: Date.new(2023, 1, 1), close_price: 1000)
      create(:stock_price, company: company1, date: Date.new(2023, 1, 2), close_price: 1100)
      create(:stock_price, company: company1, date: Date.new(2023, 1, 3), close_price: 1200)
      
      create(:stock_price, company: company2, date: Date.new(2023, 1, 1), close_price: 2000)
      create(:stock_price, company: company2, date: Date.new(2023, 1, 2), close_price: 2100)
    end

    describe '.latest_prices_by_code' do
      it '会社コードごとの最新価格を取得できる' do
        result = StockPrice.latest_prices_by_code
        
        expect(result[company1.code]).to eq(1200)
        expect(result[company2.code]).to eq(2100)
      end
    end

    describe '.grouped_by_code' do
      it '指定されたコードで株価データをグループ化できる' do
        codes = [company1.code, company2.code]
        result = StockPrice.grouped_by_code(codes)
        
        expect(result[company1.code].size).to eq(3)
        expect(result[company2.code].size).to eq(2)
      end

      it '株価データを日付順で取得できる' do
        result = StockPrice.grouped_by_code([company1.code])
        
        expect(result[company1.code].map(&:close_price)).to eq([1000, 1100, 1200])
      end
    end
  end
end
