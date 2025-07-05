RSpec.describe User, type: :model do
  describe 'バリデーション' do
    it '名前とパスワードが揃っていればユーザーを作成できる' do
      user = User.new(name: '田中太郎', password: 'secure_password123')
      expect(user).to be_valid
    end

    it '名前が空の場合はユーザーを作成できない' do
      user = User.new(name: '', password: 'secure_password123')
      expect(user).not_to be_valid
      expect(user.errors.full_messages).to include("名前 を入力してください")
    end

    it '同じ名前のユーザーは作成できない' do
      create(:user, name: '田中太郎')

      duplicate_user = User.new(name: '田中太郎', password: 'another_password')

      expect(duplicate_user).not_to be_valid
      expect(duplicate_user.errors.full_messages).to include('名前 はすでに存在します')
    end
  end

  describe 'アソシエーション' do
    let(:user) { create(:user) }
    let(:category) { create(:category) }

    it 'ユーザーは複数の家計簿記録を持てる（has_many関係）' do
      lunch_log = ExpenseLog.create(
        date: Date.new(2024, 1, 15),
        item: 'ランチ',
        amount: 800,
        category: category,
        user: user
      )

      coffee_log = ExpenseLog.create(
        date: Date.new(2024, 1, 16),
        item: 'スターバックス',
        amount: 450,
        category: category,
        user: user
      )

      expect(user.expense_logs.count).to eq(2)
      expect(user.expense_logs).to include(lunch_log, coffee_log)
    end
  end
end
