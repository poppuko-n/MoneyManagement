FactoryBot.define do
  factory :expense_log do
    date { Date.today }
    item { '内容' }
    amount { 1000 }
  end
end
