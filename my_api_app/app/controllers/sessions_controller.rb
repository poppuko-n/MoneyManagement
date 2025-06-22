class SessionsController < ApplicationController
  def create
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { name: user.name }, status: :ok
    else
      render json: { errors: [ "名前またはパスワードが正しくありません。" ] }, status: :unauthorized
    end
  end

  def destroy
  end
end
