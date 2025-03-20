require "httparty"

class StockPrice
  module WeeklyStockFetcher
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

    class << self
      def call(code)
        get_stock_prices(code, last_week, today)
      end

      def fetch_token
        refresh_token = Rails.application.credentials.jqunts[:refresh_token]
        response = HTTParty.post(
          "#{BASE_URL}/token/auth_refresh",
          query: { refreshtoken: refresh_token })
        JSON.parse(response.body)["idToken"]
      end

      private

      def get_stock_prices(code, from, to)
        response = HTTParty.get(
          "#{BASE_URL}/prices/daily_quotes",
          query: { code: code, from: from, to: to },
          headers: { Authorization: fetch_token }
        )
        JSON.parse(response.body)["daily_quotes"]
      end

      def today
        Date.today.strftime("%Y%m%d")
      end

      def last_week
        (Date.today - 7).strftime("%Y%m%d")
      end
    end
  end
end
