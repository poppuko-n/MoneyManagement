class AddUniqueIndexToCompaniesCode < ActiveRecord::Migration[8.0]
  def change
    add_index :companies, :code, unique: true
  end
end
