import { useEffect, useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseNew from './ExpenseNew';
import ExpenseEdit from './ExpenseEdit';
import Modal from './Modal';
import ExpenseApi from './lib/ExpenseApi';
import ExpenseTop from './ExpenseTop';

const Expense = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [expense_categories, setExpenseCategories] = useState([]);
  const [income_categories, setIncomeCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(()=> {
    ExpenseApi.getCategories().then(data => {
      setExpenseCategories(data.expense_categories);
      setIncomeCategories(data.income_categories);
    })
  },[]);

  useEffect(() => {
    refreshExpenses();
  }, []);

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
      <ExpenseList
        onSelectExpense={setCurrentExpenseId}
        expense_categories={expense_categories}
        expenses={expenses}
      />
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <ExpenseNew 
            onBack={() => {
              setIsCreating(false);
              refreshExpenses(); 
            }}
            getCategoriesBySelectType={getCategoriesBySelectType}
          />
        </Modal>
      )}
      {currentExpenseId && (
        <Modal onClose={() => setCurrentExpenseId(null)}>
          <ExpenseEdit
            expenseId={currentExpenseId}
            onBack={() => {
              setCurrentExpenseId(null);
              refreshExpenses();
            }}
            getCategoriesBySelectType={getCategoriesBySelectType}
          />
        </Modal>
      )} 
    </div>
  );
};

export default Expense;
