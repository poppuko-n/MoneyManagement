import { useState } from 'react';
import ExpenseApi from './lib/ExpenseApi';

const ExpenseNew = ({ onBack,getCategoriesBySelectType }) => {
  const [createExpense, setExpense] = useState({
    transaction_type: '',
    category_id: '',
    date: '',
    item: '',
    amount: ''
  });

  const handleCreate = () => {
    ExpenseApi.createExpense(createExpense).then(() => {
      onBack()
    })
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center">新規登録</h1>
      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700">種類</label>
          <select
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={createExpense.transaction_type}
            onChange={(e) => setExpense({ ...createExpense, transaction_type: e.target.value })}
          >
            <option value="">選択してください</option>
            <option value="支出">支出</option>
            <option value="収入">収入</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">カテゴリ</label>
          <select
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setExpense({ ...createExpense, category_id: e.target.value })}
          >
            <option value="">選択してください</option>
            {getCategoriesBySelectType(createExpense).map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">日付</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={createExpense.date}
            onChange={(e) => setExpense({ ...createExpense, date: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">内容</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="内容をご入力ください"
            value={createExpense.item}
            onChange={(e) => setExpense({ ...createExpense, item: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">金額</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={createExpense.amount}
            onChange={(e) => setExpense({ ...createExpense, amount: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          登録
        </button>
      </div>
    </div>
  );
};

export default ExpenseNew;
