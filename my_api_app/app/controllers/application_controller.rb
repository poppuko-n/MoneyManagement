# JWTを用いたユーザー認証に関する以下の処理を担う。
# - JWTトークンによるユーザー認証（authenticate_user）:
#     - リクエストヘッダーからトークンを取得・デコードし、@current_user を設定。
#     - 家計簿ログなど、ユーザーを特定して操作するAPIで使用。
# - JWTトークンの生成（create_token）:
#     - ログイン、新規登録時にトークンを発行し、クライアントへ返却。

class ApplicationController < ActionController::API
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
