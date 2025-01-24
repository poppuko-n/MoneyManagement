class Category < ApplicationRecord
  has_many :expsense_logs
  enum :transaction_type, { 収入: 0, 支出: 1 }

  validates :name, presence: true, uniqueness: true, length: { maximum: 50 }
end
