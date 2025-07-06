class StockPrice < ApplicationRecord
  belongs_to :company, foreign_key: :company_code, primary_key: :code

  validates :date, presence: true
  validates :close_price, presence: true

  scope :ordered_by_date, -> { order(date: :desc) }

  def self.latest_prices_by_code
    ordered_by_date.group_by(&:company_code)
      .transform_values { |prices| prices.first.close_price }
  end
end
