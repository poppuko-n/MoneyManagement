class AddNotNullConstraintToDateAndAmountInExpenseLogs < ActiveRecord::Migration[8.0]
  def change
    change_column_null :expense_logs, :date, false
    change_column_null :expense_logs, :amount, false
  end
end
