class ExpenseLog < ApplicationRecord
  belongs_to :category
  belongs_to :user

  enum :transaction_type, { 収入: 0, 支出: 1 }

  validates :date, presence: true
  validates :item, presence: true, length: { maximum: 50 }
  validates :amount, presence: true, numericality: { greater_than: 0 }

 def self.fetch_all_expenses_for_user(user_id)
  ExpenseLog.joins(:category)
            .where(user_id: user_id)
            .order(date: :asc)
            .select(:id, :date, :item, :amount, "categories.name AS category_name","categories.transaction_type AS transaction_type", :user_id)
 end

 def self.fetch_expense_for_user_byid(user_id, expense_id)
  ExpenseLog.joins(:category)
            .where(user_id: user_id, id: expense_id)
            .select("categories.transaction_type AS transaction_type", :category_id, :date, :item, :amount, :id, :user_id)
            .first
 end
end
