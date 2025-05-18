class RemoveLimitsFromColumns < ActiveRecord::Migration[8.0]
  def change
    change_column :categories, :name, :string, limit:nil, null: false
    change_column :expense_logs, :item, :string, limit:nil, null:false
    change_column :sectors, :name, :string, limit:nil, null:false
    change_column :users, :name, :string, limit:nil, null:false
  end
end
