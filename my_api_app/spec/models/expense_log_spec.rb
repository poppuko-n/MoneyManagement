RSpec.describe ExpenseLog, type: :model do
  let!(:user1) { create(:user1) }
  let!(:user2) { create(:user2) }

  let!(:food) { create(:food) }
  let!(:salary) { create(:salary) }
  let!(:rent) { create(:rent) }
  let!(:bonus) { create(:bonus) }

  let!(:food_log) { create(:food_log, category: food,  user: user1) }
  let!(:salary_log) { create(:salary_log, category: salary, user: user1) }
  let!(:rent_log) { create(:rent_log, category: rent, user: user2) }
  let!(:bonus_log) { create(:bonus_log, category: bonus, user: user2) }

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

  describe 'バリデーションのテスト' do
    subject { ExpenseLog.new(category_id: category_id, user_id: user_id, date: date, item: item, amount: amount) }
    let (:category_id) { food.id }
    let (:user_id) { user1.id }
    let (:date) { Date.today }
    let (:item) { "夜食" }
    let (:amount) { 5000 }

    context '正常系' do
      it '有効なカテゴリである' do
        expect(subject).to be_valid
      end
    end

    context '異常系' do
      context 'dateが未入力' do
        let(:date) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:date]).to include('を入力してください')
        end
      end

      context 'itemが未入力' do
        let(:item) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:item]).to include('を入力してください')
        end
      end

      context 'amountが未入力' do
        let(:amount) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:amount]).to include('を入力してください')
        end
      end

      context 'amountが数値でない場合' do
        let(:amount) { 'test' }
        it 'valid?メソッドがfalseを返し、errorsに「数値で入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:amount]).to include('は数値で入力してください')
        end
      end

      context 'amountが整数でない場合' do
        let(:amount) { 0 }
        it 'valid?メソッドがfalseを返し、errorsに「より大きい値にしてください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:amount]).to include('0より大きい値にしてください')
        end
      end
    end
  end
end
