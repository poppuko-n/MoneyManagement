class ExpenseLog < ApplicationRecord
  belongs_to :category
  enum :transaction_type, { income: 0, expense: 1 }

  
  validates :transaction_type, presence: true
  validates :date, presence: true
  validates :item, presence: true, length: { maximum: 50 }
  validates :amount, presence: true, numericality: { greater_than: 0 }
end
