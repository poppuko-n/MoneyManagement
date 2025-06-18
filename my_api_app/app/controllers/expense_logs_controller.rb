class ExpenseLogsController < ApplicationController
  before_action :authenticate_user, { only: %i[index create show update destroy ] }
  before_action :set_expense_log, { only: %i[show update destroy] }

  # GET /expense_logs
  def index
    start_date, end_date = month_range_from_params
    expense_logs = ExpenseLog.for_user_in_range(@current_user, start_date, end_date)
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

  private

  def expense_log_params
    params.require(:expense_log).permit(:category_id, :date, :item, :amount)
  end

  def set_expense_log
    @expense_log = @current_user.expense_logs.find(params[:id])
  end

  def month_range_from_params
    year, month = params.values_at(:year, :month).map(&:to_i)
    date = Date.new(year, month)
    [ date.beginning_of_month, date.end_of_month ]
  end
end
