class Company < ApplicationRecord
  belongs_to :sector
  has_many :stock_prices, foreign_key: :company_code, primary_key: :code

  validates :code, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true

  def latest_stock_price
    stock_prices.order(date: :desc).limit(1).pluck(:close_price).first
  end
end
