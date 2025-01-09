class ChangeEquityNullOnCompanies < ActiveRecord::Migration[8.0]
  def change
    change_column_null :companies, :equity, true
  end
end
