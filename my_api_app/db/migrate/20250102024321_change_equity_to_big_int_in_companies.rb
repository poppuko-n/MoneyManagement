class ChangeEquityToBigIntInCompanies < ActiveRecord::Migration[8.0]
  def change
    change_column :companies, :equity, :bigint
  end
end
