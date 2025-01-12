class CreateCompanies < ActiveRecord::Migration[8.0]
  def change
    create_table :companies do |t|
      t.integer :code, null: false
      t.integer :sector_id, null: false
      t.string :name, null: false
      t.integer :equity

      t.timestamps
    end
    add_index :companies, :name, unique: true
    add_index :companies, :sector_id
  end
end
