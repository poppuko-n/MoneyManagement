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
    if (year && month) fetchExpenses();
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

  const fetchExpenses = async () => {
    try {
      const data = await ExpenseApi.getExpenseLogs(year, month);
      setExpenses(data);
    } catch (error) {
      alert("家計簿データの取得に失敗しました。");
    }
  };

  const filterCategoriesByType = (transactionType) =>
    categories.filter((c) => c.transaction_type === transactionType);

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
        onCreateNew={() => setIsCreating(true)}
      />

      {/* NOTE: 円グラフ表示。切り替えで明細表示へ */}
      {isPieChart && (
        <motion.div {...motionProps}>
          <ExpensePieChart
            expenses={expenses}
            expense_categories={filterCategoriesByType("支出")}
            onChange={() => {
              setIsPieChart(false);
              setIsDetail(true);
              fetchExpenses();
            }}
          />
        </motion.div>
      )}

      {/* NOTE: 明細表示。戻ると円グラフに切り替え */}
      {isDetail && (
        <motion.div {...motionProps}>
          <ExpenseDetail
            expenses={expenses}
            onSelectExpense={setCurrentExpenseId}
            onBack={() => {
              setIsPieChart(true);
              setIsDetail(false);
              fetchExpenses();
            }}
          />
        </motion.div>
      )}

      {isCreating && (
        <Modal>
          <ExpenseNew
            filterCategoriesByType={filterCategoriesByType}
            onBack={() => {
              setIsPieChart(true);
              setIsDetail(false);
              setIsCreating(false);
              fetchExpenses();
            }}
          />
        </Modal>
      )}

      {currentExpenseId && (
        <Modal>
          <ExpenseEdit
            filterCategoriesByType={filterCategoriesByType}
            expenseId={currentExpenseId}
            onBack={() => {
              setIsPieChart(true);
              setIsDetail(false);
              setCurrentExpenseId(null);
              fetchExpenses();
            }}
          />
        </Modal>
      )}
    </motion.div>
  );
};

export default Expense;
