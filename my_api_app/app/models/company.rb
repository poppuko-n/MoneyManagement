class Company < ApplicationRecord
  has_many :stock_prices, foreign_key: :company_code, primary_key: :code

  validates :code, presence: true, uniqueness: true
  validates :name, presence: true
  validates :sector_name, presence: true

  def self.all_with_latest_prices
    latest_prices = StockPrice.latest_prices_by_code
    all.map { |c| c.as_json.merge("latest_price" => latest_prices[c.code]) }
  end
end
