class ExpenseLog < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :date, presence: true
  validates :item, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }

  scope :in_date_range, ->(range) { where(date: range) }
  scope :with_category, -> { preload(:category) }

  def as_json_with_category
    as_json.merge(
      transaction_type: category.transaction_type,
      category_name: category.name
    )
  end
end
