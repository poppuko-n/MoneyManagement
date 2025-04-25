RSpec.describe ExpenseLog, type: :model do
  before do
    @user1 = create(:user1)
    @user2 = create(:user2)

    @food_log = create(:food_log, user: @user1)
    @rent_log = create(:rent_log, user: @user2)
    @salary_log = create(:salary_log, user: @user1)
    @bonus_log = create(:bonus_log, user: @user2)
  end

  describe 'バリデーションのテスト' do
    it '有効なカテゴリである' do
      puts @food_log.inspect
      puts @rent_log.inspect
      puts @salary_log.inspect
      puts @bonus_log.inspect
    end
  end
end