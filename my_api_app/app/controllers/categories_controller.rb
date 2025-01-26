class CategoriesController < ApplicationController
  def index
    expense_categories = Category.where(transaction_type: "支出")
                                 .select(:id, :name, :transaction_type)
    income_categories = Category.where(transaction_type: "収入")
                                 .select(:id, :name, :transaction_type)
    
    render json: {
      expense_categories: expense_categories,
      income_categories: income_categories
    }
  end
end
