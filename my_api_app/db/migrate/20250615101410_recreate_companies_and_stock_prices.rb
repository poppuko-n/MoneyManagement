class RecreateCompaniesAndStockPrices < ActiveRecord::Migration[8.0]
  def change
    drop_table :stock_prices
    drop_table :companies

    create_table :companies, id: false do |t|
      t.string :code, null: false, primary_key: true
      t.string :name, null: false
      t.string :sector_name, null: false
      t.timestamps
    end

    create_table :stock_prices do |t|
      t.string :company_code, null: false
      t.date :date, null: false
      t.integer :close_price, null: false

      t.timestamps
    end

    add_index :stock_prices, [ :company_code, :date ], unique: true

    add_foreign_key :stock_prices, :companies, column: :company_code, primary_key: :code
  end
end
