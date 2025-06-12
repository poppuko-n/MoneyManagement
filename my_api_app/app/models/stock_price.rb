class StockPrice < ApplicationRecord
  belongs_to :company, foreign_key: :company_code, primary_key: :code

  validates :date, presence: true
  validates :close_price, presence: true
end
