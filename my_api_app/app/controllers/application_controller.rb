class ApplicationController < ActionController::API
  def create_token(user_id)
    payload = { user_id: user_id }
    secret_key = Rails.application.credentials.secret_key_base
    token = JWT.encode(payload, secret_key)
    token
  end
end
