FactoryBot.define do
  factory :company_alpha, class: 'Company' do
    code { 1 }
    name { "アルファ食品" }
    equity { 100 }
  end

  factory :company_beta, class: 'Company' do
    code { 2 }
    name { "ベータ食品" }
    equity { 200 }
  end

  factory :company_ganma, class: 'Company' do
    code { 3 }
    name { "ガンマエネルギー" }
    equity { 300 }
  end
end
