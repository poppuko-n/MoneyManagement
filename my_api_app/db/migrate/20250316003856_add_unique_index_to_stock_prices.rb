class AddUniqueIndexToStockPrices < ActiveRecord::Migration[8.0]
  def change
    add_index :stock_prices, [:company_code, :date], unique: true, name: "index_stock_prices_on_company_code_and_date"
  end
end
