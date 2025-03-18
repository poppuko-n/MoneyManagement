class CategoriesController < ApplicationController
  def index
    render json: {
      expense_categories: Category.fetch_expense_categories,
      income_categories: Category.fetch_income_categories
    }
  end
end
