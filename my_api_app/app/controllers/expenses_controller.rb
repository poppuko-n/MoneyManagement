class ExpensesController < ApplicationController
  before_action :authenticate_user, {only: [:index, :create, :show, :update, :destroy ]}

  def index
    expenses = ExpenseLog.fetch_expense_log(@current_user.id).map do |expense|
      {
        id: expense.id,
        transaction_type: expense.transaction_type,
        date: expense.date,
        item: expense.item,
        amount: expense.amount,
        category_name: expense.category_name
      }
    end
    render json: expenses
  end

  def create
    expense = ExpenseLog.new(expense_params)
    expense.user = @current_user
    if expense.save
      render json: expense, status: :created
    else
      render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    expense = ExpenseLog.find(params[:id])
    render json: expense
  end

  def update
    expense = ExpenseLog.find(params[:id])
    if expense.update(expense_params)
      render json: expense, status: :ok
    else
      render json: { errors: expense.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    expense = ExpenseLog.find(params[:id])
    expense.destroy
    head :no_content
  end

  private

  def expense_params
    params.require(:expense).permit(:transaction_type, :category_id, :date, :item, :amount)
  end
end
