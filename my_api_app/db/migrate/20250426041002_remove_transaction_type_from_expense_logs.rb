class RemoveTransactionTypeFromExpenseLogs < ActiveRecord::Migration[8.0]
  def change
    remove_column :expense_logs, :transaction_type
  end
end
