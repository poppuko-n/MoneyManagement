class CategoriesController < ApplicationController
  # GET /categories
  def index
    render json: {
      income_categories: Category.income,
      expense_categories: Category.expense
    }
  end
end
