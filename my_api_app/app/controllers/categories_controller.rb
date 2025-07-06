class CategoriesController < ApplicationController
  # GET /categories
  def index
    render json: Category.find_each, status: :ok
  end
end
