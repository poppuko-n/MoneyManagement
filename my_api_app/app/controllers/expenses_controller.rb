# - 認証済ユーザーの支出ログに対して、参照・作成・更新・削除・CSVエクスポートを提供。
# - 操作対象が当該ユーザー自身のログであることを保証するため、show/update/destroyでは事前に認可チェック（set_authorized_expense）を行う。
# - index では年・月を指定してログを絞り込み、整形したJSONを返却。
# - export では全ログをCSV形式で出力。クライアントでからの要望を受けて追加。
require "csv"

class ExpensesController < ApplicationController
  before_action :authenticate_user, { only: [ :index, :create, :show, :update, :destroy, :export ] }
  before_action :set_authorized_expense, { only: [ :show, :update, :destroy ] }

  # GET /expenses
  def index
    year = params[:year]
    month = params[:month]
    expenses = ExpenseLog.for_user_in_month(@current_user.id, year, month).map do |expense|
      {
        id: expense.id,
        transaction_type: Category.transaction_type.key(expense.transaction_type),
        date: expense.date,
        item: expense.item,
        amount: expense.amount,
        category_name: expense.category_name
      }
    end
    render json: expenses, status: :ok
  end

  # POST /expenses
  def create
    expense = ExpenseLog.new(expense_params)
    expense.user = @current_user
    if expense.save
      render json: expense, status: :created
    else
      render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /expenses/:id
  def show
    render json: {
      expense_log: {
        category_id: @expense.category_id,
        date: @expense.date,
        item: @expense.item,
        amount: @expense.amount
      },
      transaction_type: Category.transaction_types.key(@expense.transaction_type)
    }
  end

  # PATCH PUT /expenses/:id
  def update
    if @expense.update(expense_params)
      render json: @expense, status: :ok
    else
      render json: { errors: @expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /expenses/:id
  def destroy
    @expense.destroy
    head :no_content
  end

  # GET /export
  def export
    expenses = ExpenseLog.for_user(@current_user.id)
    csv_data = CSV.generate do |csv|
      csv << [ "日付", "種別", "カテゴリ", "内容", "金額" ]
      expenses.each do |expense|
        csv << [
          expense.date.to_s,
          Category.transaction_types.key(expense.transaction_type),
          expense.category_name,
          expense.item,
          expense.amount
        ]
      end
    end
    send_data csv_data, filename: "expenses_#{Time.zone.today}.csv", type: "text/csv"
  end

  private

  def expense_params
    params.require(:expense).permit(:category_id, :date, :item, :amount)
  end

  def set_authorized_expense
    @expense = ExpenseLog.find_for_user(@current_user.id, params[:id])
    return if @expense

    render json: { error: "権限がありません" }, status: :forbidden
  end
end
