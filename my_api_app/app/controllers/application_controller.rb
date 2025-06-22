class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate_user
    @current_user = User.find_by(id: session[:user_id])
    return if @current_user

    render json: { error: "unauthorized" }, status: :unauthorized
  end
end
