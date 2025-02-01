import { useState, useEffect } from "react";
import axios from "axios";
import editImage from "./assets/edit.svg";
import deleteImage from "./assets/delete.svg";
import addImage from "./assets/add.svg";
import ExpensePieChart from "./ExpensePieChart";


const ExpenseList = ({ onSelectExpense, onCreateNew,
  expense_categories
 }) => {
  const [expenses, setExpense] = useState([]);

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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl border-b border-black pb-2 inline-block">月次収支</h1>
        <div
          onClick={onCreateNew}
          className="cursor-pointer hover:bg-red-300 bg-red-400 rounded-full p-4 transition duration-700 flex items-center justify-center"
        >
          <img 
            src={addImage} 
            alt="add"
            className="w-6 h-6" 
          />
        </div>
      </div>


      <div className="flex justify-around items-center bg-gray-100 p-4 rounded shadow mb-4 text-center">
        <div>
          <p className="text-sm text-gray-600">収入</p>
          <p className="text-3xl text-green-600">¥{incomeTotal.toLocaleString()}</p>
        </div>
        <p className="text-xl font-bold text-gray-600">-</p>
        <div>
          <p className="text-sm text-gray-600">支出</p>
          <p className="text-3xl text-red-600">¥{expenseTotal.toLocaleString()}</p>
        </div>
        <p className="text-xl font-bold text-gray-600">=</p>
        <div>
          <p className="text-sm text-gray-600">収支</p>
          <p className="text-3xl text-blue-600">¥{balance.toLocaleString()}</p>
        </div>
      </div>

      <ExpensePieChart expenses={expenses} expense_categories={expense_categories} />

      <h2 className="text-xl font-bold text-center mb-4 mt-08">収支一覧</h2>
      
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">日付</th>
            <th className="border px-4 py-2 text-left">種類</th>
            <th className="border px-4 py-2 text-left">カテゴリ</th>
            <th className="border px-4 py-2 text-left">項目</th>
            <th className="border px-4 py-2 text-right w-40">金額(円)</th>
            <th className="border px-4 py-2 text-center w-20">編集</th>
            <th className="border px-4 py-2 text-center w-20">削除</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50 transition duration-200">
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
                className={`border px-4 py-2 text-right`}
              >
                {expense.amount.toLocaleString()}
              </td>
              <td className="border px-2 py-1 text-center">
                <div className="flex justify-center items-center h-full">
                  <img
                    src={editImage}
                    alt="edit"
                    className="cursor-pointer hover:bg-gray-300 rounded p-1 transition duration-700"
                    onClick={() => onSelectExpense(expense.id)}
                  />
                </div>
              </td>
              <td className="border px-2 py-1 text-center">
                <div className="flex justify-center items-center h-full">
                  <img
                    src={deleteImage}
                    alt="delete"
                    className="cursor-pointer hover:bg-red-100 rounded p-1 transition duration-700"
                    onClick={() => handleDelete(expense.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
