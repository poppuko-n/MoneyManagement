class StockPriceUpdateController < ApplicationController
  def create
    StockPrice.bulk_update_prices
  end
end
