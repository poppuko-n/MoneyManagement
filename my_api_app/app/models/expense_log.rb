class ExpenseLog < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :date, presence: true
  validates :item, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }

 def self.for_user_in_month(user_id, year, month)
  start_date = Date.new(year.to_i, month.to_i, 1)
  end_data = start_date.end_of_month

  joins(:category)
    .where(user_id: user_id, date: start_date..end_data)
    .order(date: :asc)
    .select(:id, :date, :item, :amount, "categories.name AS category_name", "categories.transaction_type AS transaction_type", :user_id)
 end

 def self.for_user(user_id)
  joins(:category)
    .where(user_id: user_id)
    .order(date: :asc)
    .select(:id, :date, :item, :amount, "categories.name AS category_name", "categories.transaction_type AS transaction_type", :user_id)
 end

 def self.find_for_user(user_id, expense_id)
  joins(:category)
    .where(user_id: user_id, id: expense_id)
    .select("categories.transaction_type AS transaction_type", :category_id, :date, :item, :amount, :id, :user_id)
    .first
 end
end
