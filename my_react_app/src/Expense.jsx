import { useEffect, useState } from 'react';
import { useAuth } from "./contexts/Authcontext.jsx"
import ExpenseHeader from './ExpenseHeader';
import ExpensePieChart from "./ExpensePieChart";
import ExpenseDetail from "./ExpenseDetail";
import ExpenseNew from './ExpenseNew';
import ExpenseEdit from './ExpenseEdit';
import ExpenseApi from './lib/ExpenseApi';
import Modal from './Modal';
import { motion } from "framer-motion";

// NOTE: 家計簿管理画面のメインコンポーネント。
// 支出・収入のカテゴリ別集計（円グラフ）や明細表示、新規作成・編集機能を提供する。
const Expense = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isPieChart, setIsPieChart] = useState(true);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [expense_categories, setExpenseCategories] = useState([]);
  const [income_categories, setIncomeCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const { token } = useAuth(); // NOTE: 認証コンテキストからトークン取得

  // NOTE: 初回マウント時にカテゴリと現在の年月を初期化する処理
  useEffect(() => {
    loadCategories();
    initializeYearMonth();
  }, []);

  // NOTE: 年と月のいずれかが変更されるたびに、その年月の家計簿データをAPIから取得する処理
  useEffect(() => {
    if (year && month) {
      fetchExpenses(token, year, month);
    }
  }, [year, month]);

  // NOTE: カテゴリ情報（支出・収入）をAPIから取得
  // フロントでプルダウンをハードコーディングする代わりに、DB上のカテゴリを毎回取得する設計。
  // これにより、カテゴリの追加・変更があってもサーバー側の管理のみで済む。
  const loadCategories = () => {
    ExpenseApi.getCategories().then(data => {
      setExpenseCategories(data.expense_categories);
      setIncomeCategories(data.income_categories);
    });
  };

  // NOTE: 年月の初期化（今月を設定）
  const initializeYearMonth = () => {
    const now = new Date;
    setYear(now.getFullYear());
    setMonth(String(now.getMonth() + 1).padStart(2, '0'));
  };

  // NOTE: 指定した年月の家計簿データを取得
  const fetchExpenses = (token, year, month) => {
    ExpenseApi.getExpenses(token, year, month).then(data => {
      setExpenses(data.expenses);
    });
  };

  // NOTE: 支出、収入に応じてカテゴリ一覧を返す
  const getCategoriesBySelectType = (transactionType) => {
    switch (transactionType) {
      case "支出":
        return expense_categories;
      case "収入":
        return income_categories;
      default:
        return [];
    }
  };

  // NOTE: 家計簿データをエクスポートする（CSV）
  const onExportExpenses = (token) => {
    ExpenseApi.exportExpenses(token);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}>

      {/* NOTE: ヘッダー（年月切替、新規作成、エクスポート） */}
      <ExpenseHeader
        expenses={expenses}
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
        initializeYearMonth={initializeYearMonth}
        onCreateNew={() => setIsCreating(true)}
        onExportExpenses={() => onExportExpenses(token)}
      />

      {/* NOTE: 円グラフ表示。切り替えで明細表示へ */}
      {isPieChart && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <ExpensePieChart
            expenses={expenses}
            expense_categories={expense_categories}
            onChange={() => {
              setIsPieChart(false);
              setIsDetail(true);
              fetchExpenses(token, year, month);
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
              fetchExpenses(token, year, month);
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
              fetchExpenses(token, year, month);
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
              fetchExpenses(token, year, month);
            }}
          />
        </Modal>
      )}
    </motion.div>
  );
};

export default Expense;
