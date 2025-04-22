class Category < ApplicationRecord
  has_many :expsense_logs
  enum :transaction_type, { 収入: 0, 支出: 1 }

  validates :name, presence: true
  validates :transaction_type, presence: true

  def self.fetch_expense_categories
    Category.where(transaction_type: "支出")
            .select(:id, :name, :transaction_type)
  end

  def self.fetch_income_categories
    Category.where(transaction_type: "収入")
            .select(:id, :name, :transaction_type)
  end
end
