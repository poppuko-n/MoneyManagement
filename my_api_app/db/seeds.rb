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

# Note: ここからSectorテーブルの初期設定。
[
  { id: 1, name: "食品" },
  { id: 2, name: "エネルギー資源" },
  { id: 3, name: "建設・資材" },
  { id: 4, name: "素材・化学" },
  { id: 5, name: "医薬品" },
  { id: 6, name: "自動車・輸送機" },
  { id: 7, name: "鉄鋼・非鉄" },
  { id: 8, name: "機械" },
  { id: 9, name: "電機・精密" },
  { id: 10, name: "情報通信・サービスその他" },
  { id: 11, name: "電気・ガス" },
  { id: 12, name: "運輸・物流" },
  { id: 13, name: "商社・卸売" },
  { id: 14, name: "小売" },
  { id: 15, name: "銀行" },
  { id: 16, name: "金融（除く銀行）" },
  { id: 17, name: "不動産" },
  { id: 99, name: "その他" }
].each do |attrs|
  Sector.find_or_create_by!(attrs)
end

# Note: ここからCompanyテーブルの初期設定。
AUTH_TOKEN = StockPrice::WeeklyStockFetcher.fetch_token

def fetch_company_info(code)
  response = HTTParty.get(
    "#{StockPrice::WeeklyStockFetcher::BASE_URL}/listed/info",
    query: { code: code },
    headers: { Authorization: AUTH_TOKEN }
  )
  JSON.parse(response.body)["info"]
end

companies = StockPrice::WeeklyStockFetcher::TARGET_CODES.map do |code|
  info = fetch_company_info(code)
  Company.new(
    code: info[0]["Code"].to_i,
    sector_id: info[0]["Sector17Code"].to_i,
    name: info[0]["CompanyName"]
  )
end

Company.import(
  companies,
  on_duplicate_key_update: [ :sector_id, :name]
)

# Note: ここからStockPriceテーブルの初期設定。
FROM_DATE = "20230101"
TO_DATE = "20250501"

def fetch_stock_price(code)
  response = HTTParty.get(
    "#{StockPrice::WeeklyStockFetcher::BASE_URL}/prices/daily_quotes",
    query: { code: code, from: FROM_DATE, to: TO_DATE },
    headers: { Authorization: AUTH_TOKEN }
  )
  JSON.parse(response.body)["daily_quotes"]
end

stock_prices = StockPrice::WeeklyStockFetcher::TARGET_CODES.flat_map do |code|
  daily_quotes = fetch_stock_price(code)

  daily_quotes.map do |quote|
    StockPrice.new(
      company_code: quote["Code"].to_i,
      date: quote["Date"],
      close_price: quote["Close"].to_i
    )
  end
end

StockPrice.import(
  stock_prices,
  on_duplicate_key_update: [ :close_price ]
)
