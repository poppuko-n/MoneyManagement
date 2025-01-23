import { useState } from 'react';


const ExpenseNew = ( { onBack }) => {
  const [expense, setExpense] = useState({transaction_type:'', category_id:'', date:'', item:'', amout:''})

  return(
    <div>
      <h1>新規登録</h1>
      <label>
        <input 
          type="integer"
          value={expense.transaction_type}
          onChange={(e)=>setExpense({...expense, transaction_type: e.target.value})} />
      </label>
    </div>
  )
}

export default ExpenseNew;