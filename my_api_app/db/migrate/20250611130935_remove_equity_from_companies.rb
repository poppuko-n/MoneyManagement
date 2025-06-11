class RemoveEquityFromCompanies < ActiveRecord::Migration[8.0]
  def change
    remove_column :companies, :equity
  end
end
