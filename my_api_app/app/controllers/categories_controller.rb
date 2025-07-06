class CategoriesController < ApplicationController
  # GET /categories
  def index
    render json: Category.all, status: :ok
  end
end
