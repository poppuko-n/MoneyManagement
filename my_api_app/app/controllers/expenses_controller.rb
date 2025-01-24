class ExpensesController < ApplicationController
  def index
    expenses = ExpenseLog.joins(:category).order(date: :asc)
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

  def destroy
    expense = ExpenseLog.find(params[:id])
    expense.destroy
    head :no_content
  end
end
