class User < ApplicationRecord
  has_many :expense_logs
  validates :name, presence: true, length: { maximum: 50 }, uniqueness: true
  has_secure_password
end
