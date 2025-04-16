RSpec.describe Category, type: :model do
  let!(:food)   { Category.create!(name: '食費', transaction_type: '支出') }
  let!(:rent)   { Category.create!(name: '家賃', transaction_type: '支出') }
  let!(:salary) { Category.create!(name: '給与', transaction_type: '収入') }
  let!(:bonus)  { Category.create!(name: 'ボーナス', transaction_type: '収入') }

  describe '::fetch_expense_categories' do
    subject { Category.fetch_expense_categories }

    it 'ActiveRecord::Relationが返される' do
      expect(subject).to be_an(ActiveRecord::Relation)
    end

    it '支出カテゴリのみを返す' do
      expect(subject).to match_array([food, rent])
    end

    it '各カテゴリのtransaction_typeがすべて"支出"である' do
      expect(subject.pluck(:transaction_type).uniq).to eq(["支出"])
    end

  end

  describe '::fetch_income_categories' do
    subject { Category.fetch_income_categories }

    it 'ActiveRecord::Relationが返される' do
      expect(subject).to be_an(ActiveRecord::Relation)
    end

    it '収入カテゴリのみを返す' do
      expect(subject).to match_array([salary, bonus])
    end

    it '各カテゴリのtransaction_typeがすべて"収入"である' do
      expect(subject.pluck(:transaction_type).uniq).to eq(["収入"])
    end

  end

  
  
end
