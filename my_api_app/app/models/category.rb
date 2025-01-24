class Category < ApplicationRecord
  has_many :expsense_logs

  validates :name, presence: true, uniqueness: true, length: { maximum: 50 }
end
