FactoryBot.define do
  factory :user1, class: 'User' do
    name { 'テストユーザ１' }
    password { 'password1' }
  end

  factory :user2, class: 'User' do
    name { 'テストユーザ２' }
    password { 'password2' }
  end
end
