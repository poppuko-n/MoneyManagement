class Company < ApplicationRecord
  has_many :stock_prices, foreign_key: :company_code, primary_key: :code

  validates :code, presence: true, uniqueness: true
  validates :name, presence: true
  validates :sector_name, presence: true

  def latest_stock_price
    stock_prices.order(date: :desc).limit(1).pluck(:close_price).first
  end

  def self.all_with_latest_prices(latest_price_map)
    all.map { |c| c.as_json.merge(latest_price: latest_price_map[c.code]) }
  end

  def self.map_by_code(codes)
    where(code: codes).index_by(&:code)
  end
end
