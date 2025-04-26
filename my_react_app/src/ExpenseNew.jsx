import { useState } from 'react';
import ExpenseApi from './lib/ExpenseApi';
import { useAuth } from "./contexts/Authcontext"

const ExpenseNew = ({ onBack, getCategoriesBySelectType }) => {
  const today = new Date().toISOString().split('T')[0]; 
  const { token } = useAuth();
  const [transactionType, setTransactionType] = useState('');
  const [createExpense, setExpense] = useState({
    category_id: '',
    date: today,
    item: '',
    amount: ''
  });

  const handleCreate = () => {
    ExpenseApi.createExpense(createExpense, token).then(() => {
      onBack();
    });
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">新規登録</h1>

      <div className="space-y-4">

        <div>
          <label className="block text-base font-normal text-gray-900 mb-1">種類</label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={transactionType}
            onChange={(e) => {
              setTransactionType(e.target.value);
            }}
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
            value={createExpense.category_id}
            onChange={(e) => setExpense({ ...createExpense, category_id: e.target.value })}
          >
            <option value="">選択してください</option>
            {getCategoriesBySelectType(transactionType).map((category) => (
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
            value={createExpense.date}
            onChange={(e) => setExpense({ ...createExpense, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-base font-normal text-gray-900 mb-1">内容</label>
          <input
            type="text"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="内容をご入力ください"
            value={createExpense.item}
            onChange={(e) => setExpense({ ...createExpense, item: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-base font-normal text-gray-900 mb-1">金額</label>
          <input
            type="number"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={createExpense.amount}
            onChange={(e) => setExpense({ ...createExpense, amount: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleCreate}
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

export default ExpenseNew;
