class ChangeCodeColumnsToString < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :stock_prices, column: :company_code
    remove_index :stock_prices, [ :company_code, :date ]
    remove_index :companies, :code
    change_column :stock_prices, :company_code, :string
    change_column :companies, :code, :string
    add_index :companies, :code, unique: true
    add_index :stock_prices, [ :company_code, :date ], unique: true
    add_foreign_key :stock_prices, :companies, column: :company_code, primary_key: :code
  end
end
