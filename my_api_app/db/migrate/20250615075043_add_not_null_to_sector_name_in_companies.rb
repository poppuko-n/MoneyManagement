class AddNotNullToSectorNameInCompanies < ActiveRecord::Migration[8.0]
  def change
    change_column_null :companies, :sector_name, false
  end
end
