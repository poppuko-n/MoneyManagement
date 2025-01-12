class Sector < ApplicationRecord
  belongs_to :companies

  validates :name, presence: true, uniqueness: true, length: { maximum: 25 }
end
