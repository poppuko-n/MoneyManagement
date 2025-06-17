class StockPriceRefresher
  def  call
    stock_prices = target_codes.flat_map { |code| format_stock_prices(code) }
    update_company_stock_prices(stock_prices)
  end

  private

  def target_codes
    Company.pluck(:code)
  end

  def format_stock_prices(code)
    JquantsClient.new.fetch_daily_quotes(code).map do |quote|
      StockPrice.new(
        company_code: quote["Code"],
        date: quote["Date"],
        close_price: quote["Close"]
      )
    end
  end

  def update_company_stock_prices(stock_prices)
    valid, invalid = stock_prices.partition(&:valid?)
    log_errors(invalid) if invalid.any?
    StockPrice.import valid, on_duplicate_key_update: [ :close_price ]
  end

  def log_errors(records)
    records.each { |record| puts record.errors.full_messages }
  end
end
