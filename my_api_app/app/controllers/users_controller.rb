class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      token = create_token(user.id)
      render json: { token: token }, status: :created
    else
      render json: { user: user, errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      token = create_token(user.id)
      render json: { token: token }, status: :ok
    else
      render json: { user: user, errors: user.errors.full_messages }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end
end
