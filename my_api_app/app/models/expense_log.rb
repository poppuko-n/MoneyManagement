class ExpenseLog < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :date, presence: true
  validates :item, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }

 def self.find_for_user(user_id, expense_id)
  includes(:category).find_by(user_id: user_id, id: expense_id)
 end

 def as_api_json
    {
    id: id,
    transaction_type: category.transaction_type,
    date: date,
    item: item,
    amount: amount,
    category_name: category.name
  }
 end
end
