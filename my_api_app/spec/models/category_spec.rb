RSpec.describe Category, type: :model do
  describe 'バリデーション' do
    it 'カテゴリ名と取引種別が全て揃っていればvalid' do
      category = Category.new(name: '食費', transaction_type: '支出')
      expect(category).to be_valid
    end

    it 'カテゴリ名が空の場合はinvalidになり、エラーメッセージが表示される' do
      category = Category.new(transaction_type: '支出')
      expect(category).not_to be_valid
      expect(category.errors[:name]).to include('を入力してください')
    end

    it '取引種別が空の場合はinvalidになり、エラーメッセージが表示される' do
      category = Category.new(name: '食費')
      expect(category).not_to be_valid
      expect(category.errors[:transaction_type]).to include('を入力してください')
    end
  end

  describe 'アソシエーション' do
    it '複数のExpenseLogを持つことができる' do
      category = create(:category)
      user = create(:user)
      expense_log1 = create(:expense_log, category: category, user: user)
      expense_log2 = create(:expense_log, category: category, user: user)
      
      expect(category.expense_logs).to include(expense_log1, expense_log2)
      expect(category.expense_logs.size).to eq(2)
    end
  end
end
