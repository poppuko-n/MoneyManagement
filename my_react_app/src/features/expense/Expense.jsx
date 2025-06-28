import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import ExpenseApi from '../../lib/ExpenseApi';
import ExpenseHeader from './ExpenseHeader';
import ExpensePieChart from "./ExpensePieChart";
import ExpenseList from "./ExpenseList";
import ExpenseNew from './ExpenseNew';
import ExpenseEdit from './ExpenseEdit';
import Modal from '../../components/Modal';

const Expense = () => {
  const [isNewExpenseModal, setIsNewExpenseModal] = useState(false);
  const [displayMode, setDisplayMode] = useState('chart');
  const [expenseId, setExpenseId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    fetchCategories();
    initializeYearMonth();
  }, []);

  // NOTE: year と month を監視して家計簿データを再取得
  useEffect(() => {
    if (year && month) fetchExpenses();
  }, [year, month]);

  const initializeYearMonth = () => {
    const now = new Date;
    setYear(now.getFullYear());
    setMonth(String(now.getMonth() + 1).padStart(2, '0'));
  };

  const fetchCategories = async() => {
    const data = await ExpenseApi.getCategories();
    setCategories(data);
    }

  const fetchExpenses = async () => {
    try {
      const data = await ExpenseApi.getExpenseLogs(year, month);
      setExpenses(data);
    } catch (error) {
      alert("家計簿データの取得に失敗しました。");
    }
  };

  const motionProps = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1 },
  };

  return (
    <motion.div {...motionProps}>
      <ExpenseHeader
        expenses={expenses}
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
        initializeYearMonth={initializeYearMonth}
        onCreateNew={() => setIsNewExpenseModal(true)}
      />

      {displayMode === 'chart' && (
        <motion.div {...motionProps}>
          <ExpensePieChart
            expenses={expenses}
            categories={categories}
            onBack={() => setDisplayMode('list')}
          />
        </motion.div>
      )}

      {displayMode === 'list' && (
        <motion.div {...motionProps}>
          <ExpenseList
            expenses={expenses}
            setExpenseId={setExpenseId}
            onBack={() => {
              setDisplayMode('chart')
              fetchExpenses()}
            }
          />
        </motion.div>
      )}

      {isNewExpenseModal && (
        <Modal>
          <ExpenseNew
            categories={categories}
            onBack={() => {
              setIsNewExpenseModal(false);
              fetchExpenses();
            }}
          />
        </Modal>
      )}

      {expenseId && (
        <Modal>
          <ExpenseEdit
            categories={categories}
            expenseId={expenseId}
            onBack={() => {
              setExpenseId(null);
              fetchExpenses();
            }}
          />
        </Modal>
      )}
    </motion.div>
  );
};

export default Expense;
