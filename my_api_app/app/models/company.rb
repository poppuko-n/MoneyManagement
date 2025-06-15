class Company < ApplicationRecord
  has_many :stock_prices, foreign_key: :company_code, primary_key: :code

  validates :code, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true

  def latest_stock_price
    stock_prices.order(date: :desc).limit(1).pluck(:close_price).first
  end

  def to_api
    {
    code: code,
    name: name,
    sector_name: sector.name,
    latest_price: latest_stock_price
    }
  end
end
