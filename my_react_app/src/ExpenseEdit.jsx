import { useEffect, useState } from 'react';
import ExpenseApi from './lib/ExpenseApi';
import { useAuth } from "./contexts/Authcontext"

const ExpenseEdit = ({ onBack, expenseId, getCategoriesBySelectType }) => {
  const [editExpense, setEditExpense] = useState({
    transaction_type: '',
    category_id: '',
    date: '',
    item: '',
    amount: '',
  });
  
  const { token } = useAuth();

  const handleUpdate = () => {
    ExpenseApi.updateExpense(expenseId, editExpense, token).then(() => {
      onBack();
    });
  };

  useEffect(() => {
    ExpenseApi.showExpense(expenseId, token).then(data => {
      setEditExpense(data.selectExpense);
    });
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">編集画面</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-base font-normal text-gray-900 mb-1">種類</label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={editExpense.transaction_type}
            onChange={(e) => setEditExpense({ ...editExpense, transaction_type: e.target.value })}
          >
            <option value="">選択してください</option>
            <option value="支出">支出</option>
            <option value="収入">収入</option>
          </select>
        </div>

        <div>
          <label className="block text-base font-normal text-gray-900 mb-1">カテゴリ</label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={editExpense.category_id || ''}
            onChange={(e) => setEditExpense({ ...editExpense, category_id: e.target.value })}
          >
            <option value="0">選択してください</option>
            {getCategoriesBySelectType(editExpense).map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-base font-normal text-gray-900 mb-1">日付</label>
          <input
            type="date"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={editExpense.date}
            onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-base font-normal text-gray-900 mb-1">内容</label>
          <input
            type="text"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="内容をご入力ください"
            value={editExpense.item}
            onChange={(e) => setEditExpense({ ...editExpense, item: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-base font-normal text-gray-900 mb-1">金額</label>
          <input
            type="number"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={editExpense.amount}
            onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleUpdate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          登録
        </button>
        <button
          onClick={onBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default ExpenseEdit;
