class ExpensesController < ApplicationController
  def index
    expenses = ExpenseLog.joins(:category)
                         .order(date: :asc)
                         .pluck(:id, :transaction_type, :date, :item, :amount, "category.name")
                         .map do |id, transaction_type, date, item, amount, category_name|
                           {
                             id: id,
                             transaction_type: transaction_type,
                             date: date,
                             item: item,
                             amount: amount,
                             category_name: category_name
                           }
                         end
    render json: expenses
  end

  def create
    expense = ExpenseLog.new(expense_params)
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
