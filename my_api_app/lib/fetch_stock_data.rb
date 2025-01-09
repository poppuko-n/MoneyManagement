require 'httparty'
require 'json'

codes = [
"72030", "83060", "61780", "83160", "99840",
"72670", "94320", "84110", "80580", "71820",
"80310", "67580", "45020", "72010", "62010",
"87660", "77510", "94330", "80010", "80530",
"70110", "65010", "72020", "77520", "70130",
"69020", "65030", "65060", "65040", "65080",
"65050", "65070", "65130", "65160", "65170",
"65210", "65220", "65230", "65240"
]


auth_token =  "eyJraWQiOiJHQXNvU2xxUzMyUktLT2lVYm1xcjU3ekdYNE1TVFhsWFBrbDNJTmhWKzNzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1MjM2ZGY3ZC1mMjRiLTRjODAtOGUyYS00YjM2NmZiN2UwNGIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLW5vcnRoZWFzdC0xX0FGNjByeXJ2NCIsImNvZ25pdG86dXNlcm5hbWUiOiI1MjM2ZGY3ZC1mMjRiLTRjODAtOGUyYS00YjM2NmZiN2UwNGIiLCJvcmlnaW5fanRpIjoiMzcyMmIwMWEtZmQyMi00YmM2LWFmZmUtY2VkYTk4MWY4NzE4IiwiYXVkIjoiNXZyN2xiOGppdThvZmhvZmJmYWxmbm1waWkiLCJldmVudF9pZCI6IjZlMDhlYzkwLTg3YmItNDFjMC1hODAzLWI2MmM5NGMxYjkwMCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzM2Mjg2OTE1LCJleHAiOjE3MzYzNzMzNjcsImlhdCI6MTczNjI4Njk2NywianRpIjoiOTA4ZmU2YWQtMWJlNC00OGUzLWEyNzktNDliN2FhYmQwOGU3IiwiZW1haWwiOiJzb3V0YTA2MDlAaWNsb3VkLmNvbSJ9.iHjDFv2Ux3LuEZ30rrloBudhiNYoij_LHd4Cd_dtvejJ6ICXrYKzBRiGwetrFoBuKVRVprTpgrp6oI8G6wpXCNvyUQnsUZaipDVdGH6kZMBC_2zsfyd3UxKhQvz8lI4eXN4uNKduBCheKSmCdMCE3sofCtD5fNUTrDCLur2Nc1cXPaO_3tTPBNt8hrLlA8KQtT6hee375ZnzcwM9GsN5HG7tiqkukHlhQfYGg7GaqFoinYfRkIVNFMArMJpkPdI1HmqB_omfDT-q1epQG57ECP6Mktgoq8CSY0wTf5BeASc1I_jf3eW-vE_OVYgtLOX7DYXh1hVZptTMCk9Wr_uJdw"

def fetch_api_data(url, auth_token)
  response = HTTParty.get(url, headers: { 'Authorization' => auth_token })
  unless response.success?
    raise "HTTP request failed with code #{response.code} and message: #{response.message}"
  end
  JSON.parse(response.body)
end

bulk_insert_data = []
bulk_update_data = []

codes.each do |code|
  info_url = "https://api.jquants.com/v1/listed/info?code=#{code}"
  statement_url = "https://api.jquants.com/v1/fins/statements?code=#{code}"

  info_data = fetch_api_data(info_url, auth_token)
  statement_data = fetch_api_data(statement_url, auth_token)

  # バルクインサートデータの準備
  info_data['info'].each do |quote|
    bulk_insert_data << {
      code: quote['Code'].to_i,
      sector_id: quote['Sector17Code'].to_i,
      name: quote['CompanyName'],
      equity: nil 
    }
  end

  # バルクアップデートデータの準備
  statement_data['statements'].each do |statement|
    bulk_update_data << {
      code: code.to_i,
      equity: statement['Equity'].to_i
    }
  end
end

# バルクインサート
if bulk_insert_data.any?
  Company.insert_all(bulk_insert_data)
end

# バルクアップデート
if bulk_update_data.any?
  bulk_update_data.each do |update|
    Company.where(code: update[:code]).update_all(equity: update[:equity])
  end
end
