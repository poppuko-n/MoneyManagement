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

  describe 'クラスメソッド' do
    let(:company1) { create(:company, code: 1001, name: '会社1') }
    let(:company2) { create(:company, code: 1002, name: '会社2') }

    before do
      create(:stock_price, company: company1, date: '2023-01-01', close_price: 1000)
      create(:stock_price, company: company1, date: '2023-01-02', close_price: 1100)
      create(:stock_price, company: company1, date: '2023-01-03', close_price: 1200)

      create(:stock_price, company: company2, date: '2023-01-01', close_price: 2000)
      create(:stock_price, company: company2, date: '2023-01-02', close_price: 2500)
    end

    describe '.all_with_latest_prices' do
      it '全CompanyオブジェクトをJSONに変換し、最新株価を付与したハッシュの配列を返す' do
        result = Company.all_with_latest_prices

        expect(result).to be_an(Array)
        expect(result.size).to eq(2)

        company1_data = result.find { |c| c['code'] == company1.code }
        expect(company1_data['code']).to eq(company1.code)
        expect(company1_data['name']).to eq(company1.name)
        expect(company1_data['sector_name']).to eq(company1.sector_name)
        expect(company1_data['latest_price']).to eq(1200)

        company2_data = result.find { |c| c['code'] == company2.code }
        expect(company2_data['code']).to eq(company2.code)
        expect(company2_data['name']).to eq(company2.name)
        expect(company2_data['sector_name']).to eq(company2.sector_name)
        expect(company2_data['latest_price']).to eq(2500)
      end
    end

    describe '.indexed_by_code' do
      it '指定した企業コードに対応するCompanyオブジェクトをハッシュで返す' do
        result = Company.indexed_by_code([ company1.code, company2.code ])

        expect(result[company1.code]).to eq(company1)
        expect(result[company2.code]).to eq(company2)
      end
    end
  end
end
