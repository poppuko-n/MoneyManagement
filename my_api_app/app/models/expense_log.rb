class ExpenseLog < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :date, presence: true
  validates :item, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }

 def self.for_user_in_month(user_id, year, month)
  start_date = Date.new(year.to_i, month.to_i, 1)
  end_data = start_date.end_of_month

  includes(:category)
    .where(user_id: user_id, date: start_date..end_data)
    .order(date: :asc)
 end

 def self.for_user(user_id)
  includes(:category)
    .where(user_id: user_id)
    .order(date: :asc)
 end

 def self.find_for_user(user_id, expense_id)
  includes(:category).find_by(user_id: user_id, id: expense_id)
 end

 def transaction_type_name
  category.transaction_type
 end
end
