class ExpenseLog < ApplicationRecord
  belongs_to :category
  belongs_to :user
  enum :transaction_type, { 収入: 0, 支出: 1 }

  validates :transaction_type, presence: true
  validates :date, presence: true
  validates :item, presence: true, length: { maximum: 50 }
  validates :amount, presence: true, numericality: { greater_than: 0 }

 def self.fetch_all_expenses_for_user(user_id)
  ExpenseLog.joins(:category)
            .where(user_id: user_id)
            .order(date: :asc)
            .select(:id, :transaction_type, :date, :item, :amount, "categories.name AS category_name", :user_id)
 end

 def self.fetch_expense_for_user_byid(user_id, expense_id)
  ExpenseLog.joins(:category)
            .where(user_id: user_id, id: expense_id)
            .select(:transaction_type, :category_id, :date, :item, :amount)
            .first
 end
end
