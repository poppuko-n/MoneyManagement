class StockPrice < ApplicationRecord
  belongs_to :company, foreign_key: :company_code, primary_key: :code

  validates :company_code, presence: true
  validates :date, presence: true
  validates :close_price, presence: true


  def self.fetch_latest_two_price(code)
    StockPrice.where(company_code: code)
              .order(date: :desc)
              .limit(2)
              .pluck(:close_price)
  end
end
