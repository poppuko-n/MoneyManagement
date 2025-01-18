class CreateExpenseLogs < ActiveRecord::Migration[8.0]
  def change
    create_table :expense_logs do |t|
      t.references :category, null: false, foreign_key: true
      t.integer :transaction_type, null:false
      t.date :date
      t.string :item, limit: 50
      t.bigint :amount

      t.timestamps
    end
  end
end
