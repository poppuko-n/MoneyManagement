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

  def self.bulk_update_prices
    StockPrice::WeeklyStockFetcher::TARGET_CODES.each do |code|
      stock_prices = StockPrice::WeeklyStockFetcher.fetch_weekend_stock_price(code).map do |quote|
        {
          company_code: quote["Code"].to_i,
          date: quote["Date"],
          close_price: quote["Close"]
        }
      end
      upsert_all(stock_prices, on_duplicate: :update)
    end
  end
end
