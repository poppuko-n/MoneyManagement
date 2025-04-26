FactoryBot.define do
  factory :food, class: 'Category' do
    name { '食費' }
    transaction_type { '支出' }
  end

  factory :rent, class: 'Category' do
    name { '家賃' }
    transaction_type { '支出' }
  end

  factory :salary, class: 'Category' do
    name { '給与' }
    transaction_type { '収入' }
  end

  factory :bonus, class: 'Category' do
    name { 'ボーナス' }
    transaction_type { '収入' }
  end
end
