class JquantsClient
  BASE_URL = "https://api.jquants.com/v1".freeze

  def initialize
    @refresh_token = Rails.application.credentials.jqunts[:refresh_token]
  end

  def daily_quotes(code)
  response = HTTParty.get(
    "#{BASE_URL}/prices/daily_quotes",
    query: { code: code, from: start_date, to: current_date },
    headers: { Authorization: id_token }
  )
  JSON.parse(response.body)["daily_quotes"]
  end

  private

  def id_token
  response = HTTParty.post(
    "#{BASE_URL}/token/auth_refresh",
    query: { refreshtoken: @refresh_token })
  JSON.parse(response.body)["idToken"]
  end

  def start_date
    (Date.today << 1).strftime("%Y%m%d")
  end

  def current_date
    Date.today.strftime("%Y%m%d")
  end
end