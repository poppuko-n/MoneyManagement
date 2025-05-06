class Category < ApplicationRecord
  has_many :expsense_logs
  enum :transaction_type, { 収入: 0, 支出: 1 }

  validates :name, presence: true
  validates :transaction_type, presence: true

  def self.search(transaction_type:)
    where(transaction_type: transaction_type).select(:id, :name, :transaction_type)
  end
end
