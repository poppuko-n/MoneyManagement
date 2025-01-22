# 業種を表すモデル
# 業種 は複数の銘柄を持つ
class Sector < ApplicationRecord
  has_many :companies

  validates :name, presence: true, uniqueness: true, length: { maximum: 25 }
end
