import { useEffect, useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseNew from './ExpenseNew';
import ExpenseEdit from './ExpenseEdit';
import Modal from './Modal';
import axios from 'axios';

const Expense = ({ apiBaseUrl }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [expense_categories, setExpenseCategories] = useState([]);
  const [income_categories, setIncomeCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/categories`)
      .then((response) => {
        setExpenseCategories(response.data.expense_categories);
        setIncomeCategories(response.data.income_categories);
      })
      .catch(() => {
        alert("カテゴリの取得に失敗しました。");
      });
  }, []);

  const refreshExpenses = () => {
    axios
      .get(`${apiBaseUrl}/expenses`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch(() => {
        alert("データの取得に失敗しました。");
      });
  };

  useEffect(() => {
    refreshExpenses();
  }, []);

  return (
    <div>
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <ExpenseNew 
            onBack={() => {
              setIsCreating(false);
              refreshExpenses(); 
            }}
            expense_categories={expense_categories}
            income_categories={income_categories}
            apiBaseUrl={apiBaseUrl} 
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
            expense_categories={expense_categories}
            income_categories={income_categories}
            apiBaseUrl={apiBaseUrl} 
          />
        </Modal>
      )} 
      <ExpenseList
        onSelectExpense={setCurrentExpenseId}
        onCreateNew={() => setIsCreating(true)}
        expense_categories={expense_categories}
        expenses={expenses}
        apiBaseUrl={apiBaseUrl} 
      />
    </div>
  );
};

export default Expense;
