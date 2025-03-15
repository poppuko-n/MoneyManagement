class StockPriceUpdateController < ApplicationController
  def create
    target_codes = [
      "72030", "83060", "61780", "83160", "99840",
      "72670", "94320", "84110", "80580", "71820",
      "80310", "67580", "45020", "72010", "62010",
      "87660", "77510", "94330", "80010", "80530",
      "70110", "65010", "72020", "77520", "70130",
      "69020", "65030", "65060", "65040", "65080",
      "65050", "65070", "65130", "65160", "65170",
      "65210", "65220", "65230", "65240"
      ]

    target_codes.each do |code|
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
