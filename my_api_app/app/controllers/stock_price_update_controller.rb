class StockPriceUpdateController < ApplicationController
  def create
    StockPrice::WeeklyStockFetcher::TARGET_CODES.each do |code|
      response_data = StockPrice::WeeklyStockFetcher.call(code)

      one_week_stock_price = response_data["daily_quotes"]

      bulk_insert_stock_prices = reject_existing_stock_price(code, one_week_stock_price)
      StockPrice.insert_all(bulk_insert_stock_prices)
    end
  end

  private

  def reject_existing_stock_price(code, one_week_stock_price)
    bulk_insert_stock_prices = []

    recorded_dates =  StockPrice.where(company_code: code).pluck(:date).map(&:to_date)

    one_week_stock_price.each do |quote|
      quote_date = Date.parse(quote["Date"])
      next if recorded_dates.include?(quote_date)

      bulk_insert_stock_prices << {
        company_code: quote["Code"].to_i,
        date: quote["Date"],
        close_price: quote["Close"]
      }
    end
    bulk_insert_stock_prices
  end
end
