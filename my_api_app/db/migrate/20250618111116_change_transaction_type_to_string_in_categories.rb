class ChangeTransactionTypeToStringInCategories < ActiveRecord::Migration[8.0]
  def change
    change_column :categories, :transaction_type, :string, null: false
  end
end
