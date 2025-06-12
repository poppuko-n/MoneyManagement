class ExpenseLog < ApplicationRecord
  belongs_to :category
  belongs_to :user

  validates :date, presence: true
  validates :item, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }

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

 def build_api_json
  {
      expense_log: {
        category_id: category.id,
        date: date,
        item: item,
        amount: amount
      },
      transaction_type: category.transaction_type
    }
 end

 def build_csv
  [
    date.to_s,
    category.transaction_type,
    category.name,
    item,
    amount
  ]
 end
end
