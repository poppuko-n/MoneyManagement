class CreateSectors < ActiveRecord::Migration[8.0]
  def change
    create_table :sectors do |t|
      t.string :name, null: false, limit: 25

      t.timestamps
    end
    add_index :sectors, :name, unique: true
  end
end
