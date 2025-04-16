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

  describe 'バリデーション' do
    subject { Category.new(name: name, transaction_type: transaction_type) }

    context '有効な場合' do
      let(:name) { '教育費' }
      let(:transaction_type) { '支出' }

      it '有効なカテゴリである' do
        expect(subject).to be_valid
      end
    end

    context '無効な場合' do
      context 'name が空' do
        let(:name) { '' }
        let(:transaction_type) { '収入' }

        it '無効である' do
          expect(subject).not_to be_valid
          expect(subject.errors[:name]).to include('を入力してください')
        end
      end

      context 'name が重複している' do
        let(:name) { '光熱費' }
        let(:transaction_type) { '収入' }

        before { Category.create!(name: name, transaction_type: transaction_type) }

        it '無効である' do
          expect(subject).not_to be_valid
          expect(subject.errors[:name]).to include('はすでに存在します')
        end
      end

      context 'name が51文字以上' do
        let(:name) { 'あ' * 51 }
        let(:transaction_type) { '支出' }

        it '無効である' do
          expect(subject).not_to be_valid
          expect(subject.errors[:name]).to include('は50文字以内で入力してください')
        end
      end

      context 'transaction_type が未入力' do
        let(:name) { '雑費' }
        let(:transaction_type) { nil }

        it '無効である' do
          expect(subject).not_to be_valid
          expect(subject.errors[:transaction_type]).to include('を入力してください')
        end
      end
    end
  end
  
end
