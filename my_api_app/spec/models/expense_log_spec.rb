RSpec.describe ExpenseLog, type: :model do
  let(:user) { create(:user) }
  let(:category) { create(:category) }

  describe 'バリデーション' do
    it '日付、項目、金額、カテゴリ、ユーザーが全て揃っていればvalid' do
      expense_log = ExpenseLog.new(date: Date.today, item: '昼食', amount: 1000, category: category, user: user)
      expect(expense_log).to be_valid
    end

    it '日付が空の場合はinvalidになり、エラーメッセージが表示される' do
      expense_log = ExpenseLog.new(item: '昼食', amount: 1000, category: category, user: user)
      expect(expense_log).not_to be_valid
      expect(expense_log.errors[:date]).to include('を入力してください')
    end

    it '項目が空の場合はinvalidになり、エラーメッセージが表示される' do
      expense_log = ExpenseLog.new(date: Date.today, amount: 1000, category: category, user: user)
      expect(expense_log).not_to be_valid
      expect(expense_log.errors[:item]).to include('を入力してください')
    end

    it '金額が空の場合はinvalidになり、エラーメッセージが表示される' do
      expense_log = ExpenseLog.new(date: Date.today, item: '昼食', category: category, user: user)
      expect(expense_log).not_to be_valid
      expect(expense_log.errors[:amount]).to include('を入力してください')
    end

    it '金額が0以下の場合はinvalidになり、エラーメッセージが表示される' do
      expense_log = ExpenseLog.new(date: Date.today, item: '昼食', amount: 0, category: category, user: user)
      expect(expense_log).not_to be_valid
      expect(expense_log.errors[:amount]).to include('0より大きい値にしてください')
    end

    it '金額が数値でない場合はinvalidになり、エラーメッセージが表示される' do
      expense_log = ExpenseLog.new(date: Date.today, item: '昼食', amount: 'test', category: category, user: user)
      expect(expense_log).not_to be_valid
      expect(expense_log.errors[:amount]).to include('は数値で入力してください')
    end
  end

  describe 'アソシエーション' do
    it 'Categoryに所属している（belongs_to関係）' do
      expense_log = create(:expense_log, category: category, user: user)
      expect(expense_log.category).to eq(category)
    end

    it 'Userに所属している（belongs_to関係）' do
      expense_log = create(:expense_log, category: category, user: user)
      expect(expense_log.user).to eq(user)
    end
  end

  describe 'スコープ' do
    before do
      create(:expense_log, date: Date.new(2023, 1, 15), category: category, user: user)
      create(:expense_log, date: Date.new(2023, 2, 10), category: category, user: user)
      create(:expense_log, date: Date.new(2023, 3, 20), category: category, user: user)
    end

    describe '.in_date_range' do
      it '指定した期間内のExpenseLogを取得する' do
        range = Date.new(2023, 1, 1)..Date.new(2023, 2, 28)
        result = ExpenseLog.in_date_range(range)

        expect(result.count).to eq(2)
        expect(result.pluck(:date)).to include(Date.new(2023, 1, 15), Date.new(2023, 2, 10))
      end
    end

    describe '.with_category' do
      it 'categoryを事前読み込みしたExpenseLogを取得する' do
        result = ExpenseLog.with_category
        expect(result.first.association(:category)).to be_loaded
      end
    end
  end

  describe 'インスタンスメソッド' do
    describe '#as_json_with_category' do
      it 'JSONにカテゴリの取引種別と名前を付与したハッシュを返す' do
        expense_log = create(:expense_log, category: category, user: user)
        result = expense_log.as_json_with_category

        expect(result[:transaction_type]).to eq(category.transaction_type)
        expect(result[:category_name]).to eq(category.name)
      end
    end
  end
end
