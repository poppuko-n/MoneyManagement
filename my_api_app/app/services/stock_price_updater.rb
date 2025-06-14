class StockPriceUpdater
  BASE_SIZE = 1000
  BASE_URL = "https://api.jquants.com/v1".freeze
  TARGET_CODES = [
    "72030", "83060", "61780", "83160", "99840",
    "72670", "94320", "84110", "80580", "71820",
    "80310", "67580", "45020", "72010", "62010",
    "87660", "77510", "94330", "80010", "80530",
    "70110", "65010", "72020", "77520", "70130",
    "69020", "65030", "65060", "65040", "65080",
    "65050", "65070", "65130", "65160", "65170",
    "65210", "65220", "65230", "65240"
  ].freeze

  def  call
    stock_prices = TARGET_CODES.flat_map do |code|
      format_stock_prices(daily_quotes(code))
    end
    import_with_logging(stock_prices)
  end

  private

  def daily_quotes(code)
  response = HTTParty.get(
    "#{BASE_URL}/prices/daily_quotes",
    query: { code: code, from: from_date, to: to_date },
    headers: { Authorization: id_token }
  )
  JSON.parse(response.body)["daily_quotes"]
  end

  def id_token
  refresh_token = Rails.application.credentials.jqunts[:refresh_token]
  response = HTTParty.post(
    "#{BASE_URL}/token/auth_refresh",
    query: { refreshtoken: refresh_token })
  JSON.parse(response.body)["idToken"]
  end

  def from_date
  (Date.today << 3).strftime("%Y%m%d")
  end

  def to_date
  Date.today.strftime("%Y%m%d")
  end

  def format_stock_prices(quotes)
    quotes.map do |quote|
      StockPrice.new(
        company_code: quote["Code"].to_i,
        date: quote["Date"],
        close_price: quote["Close"]
      )
    end
  end

  def import_with_logging(stock_prices)
    stock_prices.each_slice(BASE_SIZE) do |batch|
      valid_stprice, unvalid_stprice = batch.partition(&:valid?)
      log_errors(unvalid_stprice) unless unvalid_stprice.empty?
      StockPrice.import valid_stprice, on_duplicate_key_update: [ :close_price ]
    end
  end

  def log_errors(records)
    records.each { |record| puts record.errors.full_messages }
  end
end
