class StockPrice < ApplicationRecord
  belongs_to :company, foreign_key: :company_code, primary_key: :code

  validates :company_code, presence: true
  validates :date, presence: true
  validates :close_price, presence: true

  def self.latest_for_company(company_code)
    where(company_code: company_code).order(date: :desc).first&.close_price
  end
  

end
