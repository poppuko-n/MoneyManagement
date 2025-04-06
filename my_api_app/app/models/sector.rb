class Sector < ApplicationRecord
  has_many :companies
  validates :name, presence: true, uniqueness: true, length: { maximum: 25 }
end
