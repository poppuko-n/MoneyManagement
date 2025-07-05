RSpec.describe StockPrice, type: :model do
  let(:company) { create(:company) }

  describe 'バリデーション' do
    it '企業コード、日付、終値が全て揃っていればvalid' do
      stock_price = StockPrice.new(company_code: company.code, date: Date.today, close_price: 1000)
      expect(stock_price).to be_valid
    end

    it '日付が空の場合はinvalidになり、エラーメッセージが表示される' do
      stock_price = StockPrice.new(company_code: company.code, close_price: 1000)
      expect(stock_price).not_to be_valid
      expect(stock_price.errors[:date]).to include('を入力してください')
    end

    it '終値が空の場合はinvalidになり、エラーメッセージが表示される' do
      stock_price = StockPrice.new(company_code: company.code, date: Date.today)
      expect(stock_price).not_to be_valid
      expect(stock_price.errors[:close_price]).to include('を入力してください')
    end
  end

  describe 'アソシエーション' do
    it 'Companyに所属している（belongs_to関係）' do
      stock_price = create(:stock_price, company: company)
      expect(stock_price.company).to eq(company)
    end
  end

  describe 'クラスメソッド' do
    before do
      company2 = create(:company, code: '2001')
      create(:stock_price, company: company, date: '2023-01-01', close_price: 1000)
      create(:stock_price, company: company, date: '2023-01-02', close_price: 1200)
      create(:stock_price, company: company2, date: '2023-01-01', close_price: 2000)
    end

    describe '.latest_prices_by_code' do
      it '企業コードをキーとして各企業の最新株価をハッシュで返す' do
        result = StockPrice.latest_prices_by_code
        expect(result[company.code]).to eq(1200)
      end
    end

    describe '.grouped_by_code' do
      it '指定した企業コードの株価データを企業コードでグループ化して返す' do
        result = StockPrice.grouped_by_code([ company.code ])
        expect(result[company.code].size).to eq(2)
        expect(result[company.code].map(&:close_price)).to eq([ 1000, 1200 ])
      end
    end
  end
end
