import { useEffect, useState } from 'react';
import ExpenseHeader from './ExpenseHeader';
import ExpensePieChart from "./ExpensePieChart";
import ExpenseDetail from "./ExpenseDetail";
import ExpenseNew from './ExpenseNew';
import ExpenseEdit from './ExpenseEdit';
import ExpenseApi from './lib/ExpenseApi';
import Modal from './Modal';
import { motion } from "framer-motion";

const Expense = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isPieChart, setIsPieChart] = useState(true);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    loadCategories();
    initializeYearMonth();
  }, []);

  // NOTE: year と month を監視して家計簿データを再取得
  useEffect(() => {
    if (year && month) {
      fetchExpenses(year, month);
    }
  }, [year, month]);

  const initializeYearMonth = () => {
    const now = new Date;
    setYear(now.getFullYear());
    setMonth(String(now.getMonth() + 1).padStart(2, '0'));
  };

  const loadCategories = async() => {
    const data = await ExpenseApi.getCategories();
    setCategories(data);
    }

  const fetchExpenses = async (year, month) => {
    try {
      const data = await ExpenseApi.getExpenseLogs(year, month);
      setExpenses(data);
    } catch (error) {
      alert("家計簿データの取得に失敗しました。");
    }
  };

  const filterCategoriesByType = (transactionType) => {
    return categories.filter(
      (category) => category.transaction_type === transactionType
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>

      <ExpenseHeader
        expenses={expenses}
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
        initializeYearMonth={initializeYearMonth}
        onCreateNew={() => setIsCreating(true)}
      />

      {/* NOTE: 円グラフ表示。切り替えで明細表示へ */}
      {isPieChart && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <ExpensePieChart
            expenses={expenses}
            expense_categories={filterCategoriesByType("支出")}
            onChange={() => {
              setIsPieChart(false);
              setIsDetail(true);
              fetchExpenses(year, month);
            }}
          />
        </motion.div>
      )}

      {/* NOTE: 明細表示。戻ると円グラフに切り替え */}
      {isDetail && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <ExpenseDetail
            expenses={expenses}
            onSelectExpense={setCurrentExpenseId}
            onBack={() => {
              setIsPieChart(true);
              setIsDetail(false);
              fetchExpenses(year, month);
            }}
          />
        </motion.div>
      )}

      {/* NOTE: 新規作成モーダル */}
      {isCreating && (
        <Modal onClose={() => setIsCreating(false)}>
          <ExpenseNew
            filterCategoriesByType={filterCategoriesByType}
            onBack={() => {
              setIsPieChart(true);
              setIsDetail(false);
              setIsCreating(false);
              fetchExpenses(year, month);
            }}
          />
        </Modal>
      )}

      {/* NOTE: 編集モーダル */}
      {currentExpenseId && (
        <Modal onClose={() => setCurrentExpenseId(null)}>
          <ExpenseEdit
            filterCategoriesByType={filterCategoriesByType}
            expenseId={currentExpenseId}
            onBack={() => {
              setIsPieChart(true);
              setIsDetail(false);
              setCurrentExpenseId(null);
              fetchExpenses(year, month);
            }}
          />
        </Modal>
      )}
    </motion.div>
  );
};

export default Expense;
