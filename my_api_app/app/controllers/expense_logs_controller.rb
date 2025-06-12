require "csv"

class ExpenseLogsController < ApplicationController
  before_action :authenticate_user, { only: [ :index, :create, :show, :update, :destroy, :export ] }
  before_action :set_expense_log, { only: [ :show, :update, :destroy ] }

  # GET /expense_logs
  def index
    year, month = params.values_at(:year, :month).map(&:to_i)
    start_date = Date.new(year, month, 1)
    end_data = start_date.end_of_month
    expense_logs = @current_user.expense_logs.where(date: start_date..end_data).map(&:as_api_json)

    render json: expense_logs, status: :ok
  end

  # POST /expense_logs
  def create
    expense_log = ExpenseLog.new(expense_log_params)
    expense_log.user = @current_user
    if expense_log.save
      render json: expense_log, status: :created
    else
      render json: { errors: expense_log.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /expense_logs/:id
  def show
    render json: {
      expense_log: {
        category_id: @expense_log.category.id,
        date: @expense_log.date,
        item: @expense_log.item,
        amount: @expense_log.amount
      },
      transaction_type: @expense_log.category.transaction_type
    }
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
    expenses = ExpenseLog.for_user(@current_user.id)
    csv_data = CSV.generate do |csv|
      csv << [ "日付", "種別", "カテゴリ", "内容", "金額" ]
      expenses.each do |expense|
        csv << [
          expense.date.to_s,
          expense.transaction_type_name,
          expense.category.name,
          expense.item,
          expense.amount
        ]
      end
    end
    send_data csv_data, filename: "expenses_#{Time.zone.today}.csv", type: "text/csv"
  end

  private

  def expense_log_params
    params.require(:expense_log).permit(:category_id, :date, :item, :amount)
  end

  def set_expense_log
    @expense_log = @current_user.expense_logs.find(params[:id])
    return if @expense_log

    render json: { error: "ログが見つかりません" }, status: :not_found
  end
end
