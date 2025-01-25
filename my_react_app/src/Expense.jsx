import { useEffect, useState } from 'react';
import ExpenseList from './ExpenseList';
import ExpenseNew from './ExpenseNew';
import ExpenseEdit from './ExpenseEdit';
import Modal from './Modal';

const Expense = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);

  return (
    <div>
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <ExpenseNew onBack={() => setIsCreating(false)} />
        </Modal>
      )}
      {currentExpenseId && (
        <Modal onClose={() => setCurrentExpenseId(null)}>
          <ExpenseEdit
            expenseId={currentExpenseId}
            onBack={() => setCurrentExpenseId(null)}
          />
        </Modal>
      )} 
        <ExpenseList
          onSelectExpense={setCurrentExpenseId}
          onCreateNew={() => setIsCreating(true)}
        />
    </div>
  );
};

export default Expense;
