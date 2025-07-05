FactoryBot.define do
  factory :stock_price do
    association :company
    date { Date.today }
    close_price { 1000 }
  end
end
