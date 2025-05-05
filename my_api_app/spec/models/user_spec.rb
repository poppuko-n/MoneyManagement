RSpec.describe User, type: :model do
  describe 'バリデーションのテスト' do
    subject { User.new(name: name, password: password) }
    let(:name) { 'テストユーザー' }
    let(:password) { 'password' }

    context '正常系' do
      it '有効なカテゴリである' do
        expect(subject).to be_valid
      end
    end

    context '異常系' do
      context '名前が未入力' do
        let(:name) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors.full_messages).to include("名前 を入力してください")
        end
      end

      context '名前が重複している場合' do
        before { User.create!(name: name, password: password) }

        it 'valid?メソッドがfalseを返し、errorsに「すでに存在します」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors.full_messages).to include('名前 はすでに存在します')
        end
      end
    end
  end

  describe 'アソシエーションのテスト' do
    let!(:user) { create(:user, name: 'テストユーザー', password: 'password') }
    let!(:food) { create(:category, name: '食費', transaction_type: '支出') }
    let!(:salary) { create(:category, name: '給与', transaction_type: '収入') }
    let!(:food_log) { create(:expense_log, date: Date.today, item: '昼食', amount: 1000,  category: food,  user: user) }
    let!(:salary_log) { create(:expense_log, date: Date.today, item: '給与', amount: 200000,  category: salary,  user: user) }
    it '家計簿記録を関連づけられる' do
      expect(user.expense_logs).to match_array([ food_log, salary_log ])
    end
  end
end
