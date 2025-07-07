class ApplicationController < ActionController::API
  include ActionController::Cookies

  def authenticate_user
    @current_user = User.find_by(id: session[:user_id])
    return if @current_user

    render json: { error: "認証が必要です。" }, status: :unauthorized
  end

  def set_expense_log
    @expense_log = @current_user.expense_logs.find(params[:id])
  end

  private

  def check_xhr_header
    return if request.xhr?
    render json: { error: "不正なアクセス方法です" }, status: :forbidden
  end
end
