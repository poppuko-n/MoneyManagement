import { useEffect, useState } from 'react';
import axios from 'axios';

const ExpenseEdit = ({ onBack, expenseId }) => {

  const [expense, setExpense] = useState({
    transaction_type: '',
    category_id: '',
    date: '',
    item: '',
    amount: '',
  });


  useEffect(() => {
    axios
      .get(`http://localhost:3000/expenses/${expenseId}`)
      .then((response) => {
        setExpense(response.data);
      })
      .catch(() => {
        alert('データの取得に失敗しました。');
      });
  }, [expenseId]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">編集画面</h1>
      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">種類</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={expense.transaction_type}
            onChange={(e) => setExpense({ ...expense, transaction_type: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">カテゴリ</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={expense.category_id}
            onChange={(e) => setExpense({ ...expense, category_id: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">日付</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">内容</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="内容をご入力ください"
            value={expense.item}
            onChange={(e) => setExpense({ ...expense, item: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">金額</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          登録
        </button>
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default ExpenseEdit;
