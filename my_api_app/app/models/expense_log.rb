class ExpenseLog < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :date, presence: true
  validates :item, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }

  def self.for_user_in_range(user, start_date, end_date)
    where(user: user, date: start_date..end_date).preload(:category).map(&:as_json_with_category)
  end

  def as_json_with_category
    as_json.merge(
      transaction_type: category.transaction_type,
      category_name: category.name
    )
  end
end
