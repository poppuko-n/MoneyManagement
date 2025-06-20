class StockPrice < ApplicationRecord
  belongs_to :company, foreign_key: :company_code, primary_key: :code

  validates :date, presence: true
  validates :close_price, presence: true

  def self.latest_price_map_by_code
    latest_ids = group(:company_code).maximum(:id).values
    where(id: latest_ids).pluck(:company_code, :close_price).to_h
  end

  def self.grouped_by_company_code(codes)
    where(company_code: codes).group_by(&:company_code)
  end
end
