RSpec.describe Company, type: :model do
  describe 'バリデーション' do
    it '企業コード、企業名、業種名が全て揃っていればvalid' do
      company = Company.new(code: 1001, name: 'テスト会社', sector_name: '情報・通信業')
      expect(company).to be_valid
    end

    it '企業コードが空の場合はinvalidになり、エラーメッセージが表示される' do
      company = Company.new(name: 'テスト会社', sector_name: '情報・通信業')
      expect(company).not_to be_valid
      expect(company.errors[:code]).to include('を入力してください')
    end

    it '企業名が空の場合はinvalidになり、エラーメッセージが表示される' do
      company = Company.new(code: 1001, sector_name: '情報・通信業')
      expect(company).not_to be_valid
      expect(company.errors[:name]).to include('を入力してください')
    end

    it '業種名が空の場合はinvalidになり、エラーメッセージが表示される' do
      company = Company.new(code: 1001, name: 'テスト会社')
      expect(company).not_to be_valid
      expect(company.errors[:sector_name]).to include('を入力してください')
    end

    it '企業コードが重複している場合はinvalidになり、エラーメッセージが表示される' do
      create(:company, code: 1001)
      company = Company.new(code: 1001, name: '別の会社', sector_name: '別の業種')
      expect(company).not_to be_valid
      expect(company.errors[:code]).to include('はすでに存在します')
    end
  end

  describe 'アソシエーション' do
    it '複数のStockPriceを持っている（has_many関係）' do
      company = create(:company)
      stock_price = create(:stock_price, company: company)
      expect(company.stock_prices).to include(stock_price)
    end
  end
end
