class CategoriesController < ApplicationController
  # GET /categories
  def index
    render json: {
      expense_categories: Category.where(transaction_type: "支出"),
      income_categories: Category.where(transaction_type: "収入")
    }
  end
end
