class Category < ApplicationRecord
  has_many :expense_logs

  validates :name, presence: true
  validates :transaction_type, presence: true
end
