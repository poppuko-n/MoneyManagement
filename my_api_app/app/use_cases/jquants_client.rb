module JquantsClient
  extend self

  BASE_URL = "https://api.jquants.com/v1".freeze
  REFRESH_TOKEN = Rails.application.credentials.jquants[:refresh_token].freeze

  def fetch_daily_quotes(code, months_ago: 2)
    response = HTTParty.get(
      "#{BASE_URL}/prices/daily_quotes",
      query: {
        code: code,
        from: (Date.today << months_ago).strftime("%Y%m%d"),
        to: Date.today.strftime("%Y%m%d")
      },
      headers: { Authorization: id_token }
    )
    JSON.parse(response.body)["daily_quotes"]
  end

  def fetch_company_info(code)
    response = HTTParty.get(
      "#{BASE_URL}/listed/info",
      query: { code: code },
      headers: { Authorization: id_token }
    )
    JSON.parse(response.body)["info"]
  end

  private

  def id_token
    response = HTTParty.post(
      "#{BASE_URL}/token/auth_refresh",
      query: { refreshtoken: REFRESH_TOKEN })
    JSON.parse(response.body)["idToken"]
  end
end 