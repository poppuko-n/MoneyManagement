import {useState} from 'react';
import addImage from "./assets/add.svg";
import ExpensePieChart from "./ExpensePieChart";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = ({ onSelectExpense, onCreateNew,expense_categories,expenses
 }) => {
  const [isDetail, setIsDetail] = useState(false);

  const incomeTotal = expenses
    .filter((expense) => expense.transaction_type === "収入")
    .reduce((total, expense) => total + expense.amount, 0);

  const expenseTotal = expenses
    .filter((expense) => expense.transaction_type === "支出")
    .reduce((total, expense) => total + expense.amount, 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl border-b border-black pb-2 inline-block">月次収支</h1>
        <div
          onClick={onCreateNew}
          className="cursor-pointer hover:bg-red-300 bg-red-400 rounded-full p-4 transition duration-700 flex items-center justify-center"
        >
          <img 
            src={addImage} 
            alt="add"
            className="w-6 h-6" 
          />
        </div>
      </div>


      <div className="flex justify-around items-center bg-gray-100 p-4 rounded shadow mb-4 text-center">
        <div>
          <p className="text-sm text-gray-600">収入</p>
          <p className="text-3xl text-green-600">¥{incomeTotal.toLocaleString()}</p>
        </div>
        <p className="text-xl font-bold text-gray-600">-</p>
        <div>
          <p className="text-sm text-gray-600">支出</p>
          <p className="text-3xl text-red-600">¥{expenseTotal.toLocaleString()}</p>
        </div>
        <p className="text-xl font-bold text-gray-600">=</p>
        <div>
          <p className="text-sm text-gray-600">収支</p>
          <p className="text-3xl text-blue-600">¥{balance.toLocaleString()}</p>
        </div>
      </div>

      {isDetail ? (
        <ExpenseDetail 
          onSelectExpense={onSelectExpense}
          expenses={expenses} 
          onBack={()=>setIsDetail(false)} 
        />
      ) : (
        <ExpensePieChart 
          expenses={expenses} 
          expense_categories={expense_categories}
          setIsDetail={setIsDetail}
        />
      )}
    </div>
  );
};

export default ExpenseList;
