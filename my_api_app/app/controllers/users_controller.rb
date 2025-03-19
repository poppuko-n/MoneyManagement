class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      token = create_token(user.id)
      render json: {token: token}, status: :created
    else
      render json: { user: user, errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end
end
