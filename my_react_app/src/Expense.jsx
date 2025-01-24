import { useState } from 'react'
import ExpenseList from './ExpenseList'
import ExpenseNew from './ExpenseNew'
import ExpenseEdit from './ExpenseEdit'

const Expense = () => {
  const [ isCreating, setIsCreateting ] = useState(false);
  const [ currentExpenseId, setCurrentExpenseId ] = useState(null);

  return(
    <div>
      {isCreating?(
        <ExpenseNew onBack = { () => setIsCreateting(false)} />
      ) : currentExpenseId? (
        <ExpenseEdit 
          expenseId={currentExpenseId}
          onBack = {() => setCurrentExpenseId(null)} />
      ) : (
        <ExpenseList 
          onSelectExpense={setCurrentExpenseId}
          onCreateNew={() => setIsCreateting(true)} />
      )}
    </div>
  )
}

export default Expense;