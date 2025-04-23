FactoryBot.define do
  factory :sector_food, class: 'Sector' do
    name { "食品" }
  end

  factory :sector_energy, class: 'Sector' do
    name { "エネルギー資源" }
  end

end
