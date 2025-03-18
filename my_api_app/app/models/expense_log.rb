class ExpenseLog < ApplicationRecord
  belongs_to :category
  enum :transaction_type, { 収入: 0, 支出: 1 }

  validates :transaction_type, presence: true
  validates :date, presence: true
  validates :item, presence: true, length: { maximum: 50 }
  validates :amount, presence: true, numericality: { greater_than: 0 }

 def self.fetch_expense_log
  ExpenseLog.joins(:category)
            .order(date: :asc)
            .select(:id, :transaction_type, :date, :item, :amount, "categories.name AS category_name")
 end

end
