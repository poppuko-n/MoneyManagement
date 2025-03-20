# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

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

def fetch_company_equity(code)
  response = HTTParty.get(
    "#{StockPrice::WeeklyStockFetcher::BASE_URL}/fins/statements",
    query: { code: code },
    headers: { Authorization: AUTH_TOKEN }
  )
  JSON.parse(response.body)["statements"][0]["Equity"].to_i
end

companies = StockPrice::WeeklyStockFetcher::TARGET_CODES.map do |code|
  info = fetch_company_info(code)
  Company.new(
    code: info[0]["Code"].to_i,
    sector_id: info[0]["Sector17Code"].to_i,
    name: info[0]["CompanyName"],
    equity: fetch_company_equity(code)
  )
end

Company.import(
  companies,
  on_duplicate_key_update: [ :sector_id, :name, :equity ]
)


# Note: ここからStockPriceテーブルの初期設定。
