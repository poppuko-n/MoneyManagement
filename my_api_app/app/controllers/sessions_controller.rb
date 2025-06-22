class SessionsController < ApplicationController
  before_action :authenticate_user, only: [:show, :destroy]

  def show
    render json: { logged_in: true }, status: :ok
  end

  def create
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: { errors: [ "名前またはパスワードが正しくありません。" ] }, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    render json: { message: "ログアウトしました。" }, status: :ok
  end
end
