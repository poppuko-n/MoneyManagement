class UsersController < ApplicationController
  def create
    user = User.new(user_params)
    if user.save
      render_token_response(user, :created)
    else
      render json: {
        user: user,
        errors: user.errors.full_messages
        }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      render_token_response(user, :ok)
    else
      render json: {
        user: { name: params[:name] },
        errors: [ "名前またはパスワードが違います。" ]
        }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end

  def render_token_response(user, status)
    token = create_token(user.id)
    render json: { token: token }, status: status
  end
end
