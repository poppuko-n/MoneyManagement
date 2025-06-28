class JquantsClient
  BASE_URL = "https://api.jquants.com/v1".freeze

  def initialize
    @refresh_token = Rails.application.credentials.jquants[:refresh_token]
  end

  def fetch_daily_quotes(code, months_ago: 1)
    response = HTTParty.get(
      "#{BASE_URL}/prices/daily_quotes",
      query: { code: code, from: date_before(months_ago), to: current_date },
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
    query: { refreshtoken: @refresh_token })
  JSON.parse(response.body)["idToken"]
  end

  def date_before(months_ago)
    (Date.today << months_ago).strftime("%Y%m%d")
  end

  def current_date
    Date.today.strftime("%Y%m%d")
  end
end
