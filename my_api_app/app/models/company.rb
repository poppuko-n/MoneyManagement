# 銘柄を表すモデル
class Company < ApplicationRecord
  belongs_to :sector, optional: true
  has_many :stock_prices

  validates :code, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
  validates :sector_id, presence: true

  def self.fetch_companies_with_sectors
    Company.joins(:sector)
           .order(equity: :desc)
           .pluck(:code, :name, "sectors.name")
  end
end
