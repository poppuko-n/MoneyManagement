class RemoveIndexStockPricesCompanyCode < ActiveRecord::Migration[8.0]
  def change
    remove_index :stock_prices, name: "index_stock_prices_on_company_code"
  end
end
