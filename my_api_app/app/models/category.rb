class Category < ApplicationRecord
  has_many :expsense_logs
  enum :transaction_type, { income: 0, expense: 1 }

  validates :name, presence: true
  validates :transaction_type, presence: true
end
