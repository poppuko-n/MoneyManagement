class User < ApplicationRecord
  has_many :expense_logs
  validates :name, presence: true, uniqueness: true
  has_secure_password
end
