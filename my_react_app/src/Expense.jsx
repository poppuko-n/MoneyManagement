import { useEffect, useState } from 'react';
import ExpenseTop from './ExpenseTop';
import ExpensePieChart from "./ExpensePieChart";
import ExpenseDetail from "./ExpenseDetail";
import ExpenseNew from './ExpenseNew';
import ExpenseEdit from './ExpenseEdit';
import ExpenseApi from './lib/ExpenseApi';
import Modal from './Modal';

const Expense = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isPieChart, setIsPieChart] = useState(true);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [expense_categories, setExpenseCategories] = useState([]);
  const [income_categories, setIncomeCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
 

  useEffect(()=> {
    ExpenseApi.getCategories().then(data => {
      setExpenseCategories(data.expense_categories);
      setIncomeCategories(data.income_categories);
    });

    refreshExpenses();
  },[]);

  const refreshExpenses = () => {
    ExpenseApi.getExpenses().then(data => {
      setExpenses(data.expenses)
    })
  };

  const getCategoriesBySelectType = (expense) => {
    switch(expense.transaction_type){
      case "支出":
        return expense_categories;
      case "収入":
        return income_categories;
      default:
        return [];
    }
  };

  return (
    <div>
      <ExpenseTop
        expenses={expenses}
        onCreateNew={() => setIsCreating(true)}
      />
      {isPieChart && (
        <ExpensePieChart
          expenses={expenses} 
          expense_categories={expense_categories}
          onChange={() =>{
            setIsDetail(true);
            setIsPieChart(false);
            refreshExpenses();
          }}
        />
      )}
      {isDetail && (
        <ExpenseDetail
          expenses={expenses} 
          onSelectExpense={setCurrentExpenseId}
          onBack={() => {
            setIsPieChart(true);
            setIsDetail(false);
            refreshExpenses();
          }} 
        />
      )}
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <ExpenseNew
            getCategoriesBySelectType={getCategoriesBySelectType}
            onBack={() => {
              setIsPieChart(true);
              setIsCreating(false);
              refreshExpenses(); 
            }}
          />
        </Modal>
      )}
      {currentExpenseId && (
        <Modal onClose={() => setCurrentExpenseId(null)}>
          <ExpenseEdit
            getCategoriesBySelectType={getCategoriesBySelectType}
            expenseId={currentExpenseId}
            onBack={() => {
              setIsPieChart(true);
              setCurrentExpenseId(null);
              refreshExpenses();
            }}
          />
        </Modal>
      )} 
    </div>
  );
};

export default Expense;
