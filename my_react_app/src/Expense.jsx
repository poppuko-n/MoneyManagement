import { useEffect, useState } from 'react';
import { useAuth } from "./contexts/Authcontext.jsx"
import ExpenseHeader from './ExpenseHeader';
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
  const { token } = useAuth();
 
  useEffect(()=> {
    ExpenseApi.getCategories().then(data => {
      setExpenseCategories(data.expense_categories);
      setIncomeCategories(data.income_categories);
    });

    refreshExpenses(token);
  },[]);

  const refreshExpenses = (token) => {
    ExpenseApi.getExpenses(token).then(data => {
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
      <ExpenseHeader
        expenses={expenses}
        onCreateNew={() => setIsCreating(true)}
      />
      {isPieChart && (
        <ExpensePieChart
          expenses={expenses} 
          expense_categories={expense_categories}
          onChange={() =>{
            setIsPieChart(false);
            setIsDetail(true);
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
              setIsDetail(false);
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
              setIsDetail(false);
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
