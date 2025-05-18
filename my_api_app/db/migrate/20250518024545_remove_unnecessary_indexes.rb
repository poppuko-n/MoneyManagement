class RemoveUnnecessaryIndexes < ActiveRecord::Migration[8.0]
  def change
    remove_index :categories, name:  "index_categories_on_name"
    remove_index :companies, name: "index_companies_on_name"
    remove_index :sectors, name: "index_sectors_on_name"
  end
end
