class Company < ApplicationRecord
  has_many :stock_prices, foreign_key: :company_code, primary_key: :code

  validates :code, presence: true, uniqueness: true
  validates :name, presence: true
  validates :sector_name, presence: true
end
