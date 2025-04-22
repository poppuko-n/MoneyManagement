RSpec.describe Category, type: :model do
  before do
    @food   = create(:food)
    @rent   = create(:rent)
    @salary = create(:salary)
    @bonus  = create(:bonus)
  end

  describe '::fetch_expense_categories' do
    subject { Category.fetch_expense_categories }

    it '支出カテゴリのみを返す' do
      expect(subject).to  eq([@food, @rent])
    end

    it 'ActiveRecord::Relationが返される' do
      expect(subject).to be_an(ActiveRecord::Relation)
    end

  end

  describe '::fetch_income_categories' do
    subject { Category.fetch_income_categories }

    it '収入カテゴリのみを返す' do
      expect(subject).to eq([@salary, @bonus])
    end

    it 'ActiveRecord::Relationが返される' do
      expect(subject).to be_an(ActiveRecord::Relation)
    end

  end

  describe 'バリデーションのテスト' do
    subject { Category.new(name: name, transaction_type: transaction_type) }
    let(:name) { '教育費' }
    let(:transaction_type) { '支出' }

    context '正常系' do
      it '有効なカテゴリである' do
        expect(subject).to be_valid
      end
    end

    context '異常系' do
      context 'name が未入力' do
        let(:name) { '' }

        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:name]).to include('を入力してください')
        end
      end

      context 'transaction_type が未入力' do
        let(:transaction_type) { nil }

        it 'valid?メソッドがfalseを返し、errorsに「入力してください」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors[:transaction_type]).to include('を入力してください')
        end
      end
    end
  end
end
