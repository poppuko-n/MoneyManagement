FactoryBot.define do
  factory :user, class: 'User' do
    name { 'テストユーザ' }
    password { 'password1' }
  end
end
