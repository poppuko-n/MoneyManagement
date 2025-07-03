class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate_user
    @current_user = User.find_by(id: session[:user_id])
    return if @current_user

    render json: { error: "unauthorized" }, status: :unauthorized
  end

  def set_expense_log
    @expense_log = @current_user.expense_logs.find(params[:id])
  end
end
