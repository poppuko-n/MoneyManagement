class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate_user
    return render_unauthorized("ログインが必要です。") unless authorization_header?

    token = request.headers[:Authorization].split(" ")[1]
    secret_key = Rails.application.credentials.secret_key_base
    begin
      # e.g. decoded_code　= [{"user_id"=>1}, {"alg"=>"HS256"}]
      decoded_code = JWT.decode(token, secret_key)
      @current_user = User.find(decoded_code[0]["user_id"])
    rescue ActiveRecord::RecordNotFound
      render_unauthorized("ユーザーが見つかりません。")
    rescue JWT::DecodeError => e
      render_unauthorized("#{e.message}")
    end
  end

  def create_token(user_id)
    payload = { user_id: user_id }
    secret_key = Rails.application.credentials.secret_key_base
    token = JWT.encode(payload, secret_key)
    token
  end

  private
  def authorization_header?
    request.headers[:Authorization].present?
  end

  def render_unauthorized(message)
    render json: { errors: [ message ] }, status: :unauthorized
  end
end
