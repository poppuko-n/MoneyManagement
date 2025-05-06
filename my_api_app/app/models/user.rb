class User < ApplicationRecord
  has_many :expense_logs
  # ログイン時に名前でユーザーを識別するため、一意性を設定
  validates :name, presence: true, uniqueness: true
  has_secure_password
end
