class Company
  class StockPriceDifferenceCalculator
  end

  
end StockPriceDifferenceCalculator
  def self.fetch_latest_two_price(code)
    StockPrice.where(company_code: code)
              .order(date: :desc)
              .limit(2)
              .pluck(:close_price)
  end
end