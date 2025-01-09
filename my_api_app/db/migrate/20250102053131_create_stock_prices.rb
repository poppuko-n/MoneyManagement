class CreateStockPrices < ActiveRecord::Migration[8.0]
  def change
    create_table :stock_prices do |t|
      t.integer :company_code, null: false, index: true
      t.date :date, null: false
      t.integer :close_price, null: false

      t.timestamps
    end
    add_foreign_key :stock_prices, :companies, column: :company_code, primary_key: :code
  end
end
