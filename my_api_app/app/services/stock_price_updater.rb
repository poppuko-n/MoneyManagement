class StockPriceUpdater
  TARGET_CODES = %w[
    72030 83060 61780 83160 99840
    72670 94320 84110 80580 71820
    80310 67580 45020 72010 62010
    87660 77510 94330 80010 80530
    70110 65010 72020 77520 70130
    69020 65030 65060 65040 65080
    65050 65070 65130 65160 65170
    65210 65220 65230 65240
  ].freeze

  def  call
    stock_prices = TARGET_CODES.flat_map { |code| format_stock_prices(code) }
    update_company_stock_prices(stock_prices)
  end

  private

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
