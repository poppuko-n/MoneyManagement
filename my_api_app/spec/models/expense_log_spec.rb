RSpec.describe ExpenseLog, type: :model do
  let!(:user1) { create(:user1) }
  let!(:user2) { create(:user2) }

  let!(:food_log) { create(:food_log, user: user1) }
  let!(:salary_log) { create(:salary_log, user: user1) }
  let!(:rent_log) { create(:rent_log, user: user2) }
  let!(:bonus_log) { create(:bonus_log, user: user2) }

  describe '::fetch_all_expenses_for_user' do
    subject { ExpenseLog.fetch_all_expenses_for_user(user1.id) }
    it '指定したユーザーのみのログを返す' do
      expect(subject).to all(have_attributes(user_id: user1.id))
    end

    it '全件のログを返す' do
      expect(subject.size).to eq(2)
    end
  end

  describe '::fetch_expense_for_user_byid' do
    subject { ExpenseLog.fetch_expense_for_user_byid(user1.id, food_log.id) }
    it '指定したログのみを返す' do
      expect(subject).to have_attributes(user_id: user1.id, id: food_log.id)
    end
  end

  # describe 'バリデーションのテスト' do

  # end
end
