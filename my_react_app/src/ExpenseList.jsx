import { useState, useEfect} from 'react';


const ExpenseList = ({onSelectexpense, onCreateNew}) => {
  const [expense, setExpense] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm('本当に削除しますか')){
      axios
      .delete('expense/${id}')
      .then(()=>{setExpense(expense.filter((expense) => expense.id !== id));
      })
      .catch(() => {alert('削除に失敗しました。');
      });
    }
  }


  return(
    <div>
      <h1>家計簿一覧</h1>
      <button onClick={onCreateNew}>新規登録</button>
      <ul>
        {expense.map((expense) => (
          <li key={expense.id}>
            {/* 日付とカテゴリ、項目、金額の一覧を表示させる。 */}
            <button onClick={()=>onSelectexpense(expense.id)}>編集</button>
            <button onClick={()=>handleDelete(expense.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExpenseList;