import { useEffect, useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseNew from './ExpenseNew';
import ExpenseEdit from './ExpenseEdit';
import Modal from './Modal';
import axios from 'axios';

const Expense = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [expense_categories, setExpenseCategories] = useState([]);
  const [income_categories, setIncomCategories] = useState([]);
  const [expenses, setExpense] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:3000/categories')
         .then((response) => {
          setExpenseCategories(response.data.expense_categories);
          setIncomCategories(response.data.income_categories);
         })
  },[])

  useEffect(() => {
    axios
      .get("http://localhost:3000/expenses")
      .then((response) => {
        setExpense(response.data);
      })
      .catch(() => {
        alert("データの取得に失敗しました。");
      });
  }, []);

  return (
    <div>
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <ExpenseNew 
            onBack={() => setIsCreating(false)}
            expense_categories={expense_categories}
            income_categories={income_categories} />
        </Modal>
      )}
      {currentExpenseId && (
        <Modal onClose={() => setCurrentExpenseId(null)}>
          <ExpenseEdit
            expenseId={currentExpenseId}
            onBack={() => setCurrentExpenseId(null)}
            expense_categories={expense_categories}
            income_categories={income_categories}
          />
        </Modal>
      )} 
        <ExpenseList
          onSelectExpense={setCurrentExpenseId}
          onCreateNew={() => setIsCreating(true)}
          expense_categories={expense_categories}
          expenses={expenses}
        />
    </div>
  );
};

export default Expense;
