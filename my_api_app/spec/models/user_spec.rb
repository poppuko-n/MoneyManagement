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
        before{ User.create!(name: name, password: password) }

        it 'valid?メソッドがfalseを返し、errorsに「すでに存在します」と格納されること' do
          expect(subject).not_to be_valid
          expect(subject.errors.full_messages).to include('名前 はすでに存在します')
        end
      end
    end
  end
end
