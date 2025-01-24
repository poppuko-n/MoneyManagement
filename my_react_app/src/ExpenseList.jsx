import { useState, useEffect } from "react";
import axios from "axios";

const ExpenseList = ({ onSelectExpense, onCreateNew }) => {
  const [expenses, setExpense] = useState([]);

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
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">日付</th>
            <th className="border px-4 py-2 text-left">取引タイプ</th>
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
              <td className="border px-4 py-2">{expense.transaction_type}</td>
              <td className="border px-4 py-2">{expense.category_name}</td>
              <td className="border px-4 py-2">{expense.item}</td>
              <td className="border px-4 py-2">¥{expense.amount}</td>
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
