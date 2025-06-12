require "csv"

class ExpenseLogsController < ApplicationController
  before_action :authenticate_user, { only: [ :index, :create, :show, :update, :destroy, :export ] }
  before_action :set_expense_log, { only: [ :show, :update, :destroy ] }

  # GET /expense_logs
  def index
    year, month = params.values_at(:year, :month).map(&:to_i)
    start_date, end_date = month_range(year, month)
    expense_logs = @current_user.expense_logs.where(date: start_date..end_date).map(&:as_api_json)

    render json: expense_logs, status: :ok
  end

  # POST /expense_logs
  def create
    expense_log = @current_user.expense_logs.build(expense_log_params)
    if expense_log.save
      render json: expense_log, status: :created
    else
      render json: { errors: expense_log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /expense_logs/:id
  def show
    render json: @expense_log.build_api_json
  end

  # PATCH /expense_logs/:id
  def update
    if @expense_log.update(expense_log_params)
      render json: @expense_log, status: :ok
    else
      render json: { errors: @expense_log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /expense_logs/:id
  def destroy
    @expense_log.destroy
    head :no_content
  end

  # GET /expense_logs/export
  def export
    csv_data = CSV.generate do |csv|
      csv << [ "日付", "種別", "カテゴリ", "内容", "金額" ]
      @current_user.expense_logs.each do |expense_log|
        csv << expense_log.build_csv
      end
    end
    send_data csv_data, filename: "expense_logs_#{Time.zone.today}.csv", type: "text/csv"
  end

  private

  def expense_log_params
    params.require(:expense_log).permit(:category_id, :date, :item, :amount)
  end

  def month_range(year, month)
    start_date = Date.new(year, month, 1)
    end_date = start_date.end_of_month
    [ start_date, end_date ]
  end

  def set_expense_log
    @expense_log = @current_user.expense_logs.find(params[:id])
    return if @expense_log

    render json: { error: "ログが見つかりません" }, status: :not_found
  end
end
