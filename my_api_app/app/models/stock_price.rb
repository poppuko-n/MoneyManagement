class StockPrice < ApplicationRecord
  belongs_to :company, foreign_key: :company_code, primary_key: :code

  validates :date, presence: true
  validates :close_price, presence: true


  def self.fetch_latest_two_price(code)
    StockPrice.where(company_code: code)
              .order(date: :desc)
              .limit(2)
              .pluck(:close_price)
  end

  def self.fetch_latest_date(code)
    StockPrice.where(company_code: code)
              .order(date: :desc)
              .first
              &.date
  end

  def self.fetch_price_n_months_ago(code, latest_date, n)
    date_range = (latest_date - n.months)..latest_date
    StockPrice.where(company_code: code, date: date_range)
              .order(date: :asc)
              .first
              &.close_price
  end

  def self.fetch_average_close_price(code, start_date, end_date)
    StockPrice.where(company_code: code, date: start_date..end_date)
              .average(:close_price)
  end
end
