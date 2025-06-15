class RemoveSectorAndAddSectorNameToCompanies < ActiveRecord::Migration[8.0]
  def change
    remove_foreign_key :companies, :sectors
    remove_index :companies, :sector_id
    remove_column :companies, :sector_id
    drop_table :sectors
    add_column :companies, :sector_name, :string
  end
end
