class AddForeignKeyToCompaniesSector < ActiveRecord::Migration[8.0]
  def change
    change_column :companies, :sector_id, :bigint
    add_foreign_key :companies, :sectors, column: :sector_id
  end
end
