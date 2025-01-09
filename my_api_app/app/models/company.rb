class Company < ApplicationRecord
  belongs_to :sector
  has_many :stock_prices

  validates :code, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
  validates :sector_id, presence: true
end
