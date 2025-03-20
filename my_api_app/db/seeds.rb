# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
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
