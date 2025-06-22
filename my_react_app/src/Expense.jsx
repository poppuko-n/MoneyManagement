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

  // NOTE: 初回マウント時にカテゴリと現在の年月を初期化する処理
  useEffect(() => {
    loadCategories();
    initializeYearMonth();
  }, []);

  // NOTE: 年と月のいずれかが変更されるたびに、その年月の家計簿データをAPIから取得する処理
  useEffect(() => {
    if (year && month) {
      fetchExpenses(year, month);
    }
  }, [year, month]);

  const loadCategories = async() => {
    const data = await ExpenseApi.getCategories();
    setCategories(data);
    }

  // NOTE: 年月の初期化（今月を設定）
  const initializeYearMonth = () => {
    const now = new Date;
    setYear(now.getFullYear());
    setMonth(String(now.getMonth() + 1).padStart(2, '0'));
  };

  // NOTE: 指定した年月の家計簿データを取得
  const fetchExpenses = (year, month) => {
    ExpenseApi.getExpenses(year, month).then(data => {
      setExpenses(data.expenses);
    });
  };

  // NOTE: 支出、収入に応じてカテゴリ一覧を返す
  const getCategoriesBySelectType = (transactionType) => {
    return categories.filter(category => category.transaction_type === transactionType);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>

      {/* NOTE: ヘッダー（年月切替、新規作成） */}
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
            expense_categories={getCategoriesBySelectType("支出")}
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
            getCategoriesBySelectType={getCategoriesBySelectType}
            onBack={() => {
              setIsPieChart(true);
              setIsDetail(false);
              setIsCreating(false);
              fetchExpenses(year, month);
            }}
          />
        </Modal>
      )}

      {/* NOTE: 編集モーダル（選択した費目IDに基づく） */}
      {currentExpenseId && (
        <Modal onClose={() => setCurrentExpenseId(null)}>
          <ExpenseEdit
            getCategoriesBySelectType={getCategoriesBySelectType}
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
