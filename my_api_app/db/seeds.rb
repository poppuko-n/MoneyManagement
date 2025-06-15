# Note: ここからCategoryテーブルの初期設定。
[
  { name: "給与", transaction_type: 0 },
  { name: "副業", transaction_type: 0 },
  { name: "その他", transaction_type: 0 },
  { name: "食費", transaction_type: 1 },
  { name: "日用品", transaction_type: 1 },
  { name: "交際費", transaction_type: 1 },
  { name: "交通費", transaction_type: 1 },
  { name: "固定費", transaction_type: 1 }
].each do |attrs|
  Category.find_or_create_by!(attrs)
end

# Note: ここからCompanyテーブルの初期設定。
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

companies = TARGET_CODES.map do |code|
  info = JquantsClient.new.fetch_company_info(code)
  Company.new(
    code: info[0]["Code"],
    name: info[0]["CompanyName"],
    sector_name: info[0]["Sector17CodeName"]
  )
end

Company.import(
  companies,
  on_duplicate_key_update: %i[code name sector_name]
)

# Note: ここからStockPriceテーブルの初期設定。
stock_prices = TARGET_CODES.flat_map do |code|
  JquantsClient.new.fetch_daily_quotes(code, 12).map do |quote|
    StockPrice.new(
      company_code: quote["Code"],
      date: quote["Date"],
      close_price: quote["Close"]
    )
  end
end

StockPrice.import(
  stock_prices,
  on_duplicate_key_update: %i[company_code date close_price]
)
