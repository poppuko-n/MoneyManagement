import { useState, useEffect } from "react";
import axios from "axios";

const ExpenseList = ({ onSelectExpense, onCreateNew }) => {
  const [expenses, setExpense] = useState([]);

  // 収入、支出、収支の計算
  const incomeTotal = expenses
    .filter((expense) => expense.transaction_type === "収入")
    .reduce((total, expense) => total + expense.amount, 0);

  const expenseTotal = expenses
    .filter((expense) => expense.transaction_type === "支出")
    .reduce((total, expense) => total + expense.amount, 0);

  const balance = incomeTotal - expenseTotal;

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

  const handleDelete = (id) => {
    if (window.confirm("本当に削除しますか")) {
      axios
        .delete(`http://localhost:3000/expenses/${id}`)
        .then(() => {
          setExpense(expenses.filter((expense) => expense.id !== id));
        })
        .catch(() => {
          alert("削除に失敗しました。");
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">家計簿一覧</h1>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600"
        onClick={onCreateNew}
      >
        新規登録
      </button>

      <div className="flex justify-around items-center bg-gray-100 p-4 rounded shadow mb-4 text-center">
        <div>
          <p className="text-sm text-gray-600">収入</p>
          <p className="text-3xl font-bold text-green-600">¥{incomeTotal.toLocaleString()}</p>
        </div>
        <p className="text-xl font-bold text-gray-600">-</p>
        <div>
          <p className="text-sm text-gray-600">支出</p>
          <p className="text-3xl font-bold text-red-600">¥{expenseTotal.toLocaleString()}</p>
        </div>
        <p className="text-xl font-bold text-gray-600">=</p>
        <div>
          <p className="text-sm text-gray-600">収支</p>
          <p className="text-3xl font-bold text-blue-600">¥{balance.toLocaleString()}</p>
        </div>
      </div>



      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">日付</th>
            <th className="border px-4 py-2 text-left">種類</th>
            <th className="border px-4 py-2 text-left">カテゴリ</th>
            <th className="border px-4 py-2 text-left">項目</th>
            <th className="border px-4 py-2 text-left">金額</th>
            <th className="border px-4 py-2 text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{expense.date}</td>
              <td
                className={`border px-4 py-2 font-bold ${
                  expense.transaction_type === "収入" ? "text-green-600" : "text-red-600"
                }`}
              >
                {expense.transaction_type}
              </td>
              <td className="border px-4 py-2">{expense.category_name}</td>
              <td className="border px-4 py-2">{expense.item}</td>
              <td
                className={`border px-4 py-2 font-bold ${
                  expense.transaction_type === "収入" ? "text-green-600" : "text-red-600"
                }`}
              >
                ¥{expense.amount.toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 text-white py-1 px-2 rounded mr-2 hover:bg-green-600"
                  onClick={() => onSelectExpense(expense.id)}
                >
                  編集
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(expense.id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
