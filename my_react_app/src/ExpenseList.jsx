import {useState} from 'react';
import ExpensePieChart from "./ExpensePieChart";
import ExpenseDetail from "./ExpenseDetail";

const ExpenseList = ({ onSelectExpense,expense_categories, expenses}) => {
  const [isDetail, setIsDetail] = useState(false);

  return (
    <div className="container mx-auto p-4">
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
