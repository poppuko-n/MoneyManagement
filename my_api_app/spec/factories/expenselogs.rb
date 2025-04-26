FactoryBot.define do
  factory :food_log, class: 'ExpenseLog' do
    date { Date.today }
    item { '昼食' }
    amount { 1000 }
  end

  factory :rent_log, class: 'ExpenseLog' do
    date { Date.today }
    item { '家賃' }
    amount { 10000 }
  end

  factory :salary_log, class: 'ExpenseLog' do
    date { Date.today }
    item { '給与' }
    amount { 200000 }
  end

  factory :bonus_log, class: 'ExpenseLog' do
    date { Date.today }
    item { 'ボーナス' }
    amount { 400000 }
  end
end
