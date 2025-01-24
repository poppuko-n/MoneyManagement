class AddTransactionTypeToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :transaction_type, :integer, null: false
  end
end

