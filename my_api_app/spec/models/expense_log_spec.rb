RSpec.describe ExpenseLog, type: :model do
  before do
    @user1 = create(:user1)
    @user2 = create(:user2)

    @food_log = create(:food_log, user: @user1)
    @rent_log = create(:rent_log, user: @user2)
    @salary_log = create(:salary_log, user: @user1)
    @bonus_log = create(:bonus_log, user: @user2)
  end

  describe '::fetch_all_expenses_for_user' do
    subject {ExpenseLog.fetch_all_expenses_for_user(@user1)}
    it '指定したユーザーのみのログを返す' do
      expect(subject.map(&:user_id).uniq).to eq([@user1.id])
    end

    it '全件のログを返す' do
      expect(subject.size).to eq(2)
    end
  end
end