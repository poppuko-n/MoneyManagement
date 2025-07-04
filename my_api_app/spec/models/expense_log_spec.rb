RSpec.describe ExpenseLog, type: :model do
  let(:user1) { create(:user, name: 'テストユーザー1') }
  let(:food) { create(:category, name: '食費', transaction_type: '支出') }
  let(:salary) { create(:category, name: '給与', transaction_type: '収入') }

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
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:date]).to include('を入力してください')
          end
        end
      end

      context 'itemが未入力' do
        let(:item) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:item]).to include('を入力してください')
          end
        end
      end

      context 'amountが未入力' do
        let(:amount) { '' }
        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:amount]).to include('を入力してください')
          end
        end
      end

      context 'amountが数値でない場合' do
        let(:amount) { 'test' }
        it 'valid?メソッドがfalseを返し、errorsに「数値で入力してください」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:amount]).to include('は数値で入力してください')
          end
        end
      end

      context 'amountが整数でない場合' do
        let(:amount) { 0 }
        it 'valid?メソッドがfalseを返し、errorsに「より大きい値にしてください」と格納されること' do
          aggregate_failures do
            expect(subject).not_to be_valid
            expect(subject.errors[:amount]).to include('0より大きい値にしてください')
          end
        end
      end
    end
  end
end
