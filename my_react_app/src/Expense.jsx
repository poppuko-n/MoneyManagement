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

const Expense = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [isPieChart, setIsPieChart] = useState(true);
  const [currentExpenseId, setCurrentExpenseId] = useState(null);
  const [expense_categories, setExpenseCategories] = useState([]);
  const [income_categories, setIncomeCategories] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [year, setYear] = useState('')
  const [month, setMonth] = useState('')
  const { token } = useAuth();
 
  useEffect(()=> {
    loadCategories();
    initializeYearMonth();
  },[]);

  useEffect(() => {
    if (year && month) {
      fetchExpenses(token, year, month);
    }
  }, [year, month]);

  const loadCategories = () => {
    ExpenseApi.getCategories().then(data => {
      setExpenseCategories(data.expense_categories);
      setIncomeCategories(data.income_categories);
    });
  };

  const initializeYearMonth = () => {
    const now = new Date;
    setYear(now.getFullYear());
    setMonth(String(now.getMonth()+1).padStart(2, '0'));
  };

  const fetchExpenses = (token, year, month) => {
    ExpenseApi.getExpenses(token, year, month).then(data => {
      setExpenses(data.expenses)
    })
  };

  const getCategoriesBySelectType = (transactionType) => {
    switch(transactionType){
      case "支出":
        return expense_categories;
      case "収入":
        return income_categories;
      default:
        return [];
    }
  };

  const onExportExpenses = (token) => {
    ExpenseApi.exportExpenses(token)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y:100 }}
      animate={{ opacity:1, y: 0 }}
      transition={{ duration: 1 }}>
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
      {isPieChart && (
        <motion.div
        initial={{ opacity: 0, y:100 }}
        animate={{ opacity:1, y: 0 }}
        transition={{ duration: 1 }}>
          <ExpensePieChart
            expenses={expenses} 
            expense_categories={expense_categories}
            onChange={() =>{
              setIsPieChart(false);
              setIsDetail(true);
              fetchExpenses(token, year, month);
            }}
          />
        </motion.div>
      )}
      {isDetail && (
        <motion.div
        initial={{ opacity: 0, y:100 }}
        animate={{ opacity:1, y: 0 }}
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
