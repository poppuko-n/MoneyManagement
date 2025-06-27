import { useState } from 'react';
import ExpenseApi from './lib/ExpenseApi';

const ExpenseNew = ({ onBack, categories }) => {
  const today = new Date().toISOString().split('T')[0]; 
  const [transactionType, setTransactionType] = useState('');
  const [newExpense, setNewExpense] = useState({
    category_id: '',
    date: today,
    item: '',
    amount: ''
  });

  const filterCategoriesByType = (transactionType) =>
    categories.filter((c) => c.transaction_type === transactionType);

  const handleCreate = async() => {
    try{
      await ExpenseApi.createExpenseLog(newExpense);
      alert('登録が完了しました。')
      onBack();
    } catch(error) {
      alert(error.response.data.errors.join('\n'))
    };
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center text-indigo-700">新規登録</p>

      <div className="space-y-4">
        <div>
          <label>種類</label>
          <select
            className="w-full px-4 py-2 border shadow text-sm"
            value={newExpense.transaction_type}
            onChange={e => setTransactionType(e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="支出">支出</option>
            <option value="収入">収入</option>
          </select>
        </div>

        <div>
          <label>カテゴリ</label>
          <select
            className="w-full px-4 py-2 border shadow text-sm"
            value={newExpense.category_id}
            onChange={(e) => setNewExpense({ ...newExpense, category_id: e.target.value })}
          >
            <option value="">選択してください</option>
            {filterCategoriesByType(transactionType).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>日付</label>
          <input
            type="date"
            className="w-full px-4 py-2 border shadow text-sm"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          />
        </div>

        <div>
          <label>内容</label>
          <input
            type="text"
            className="w-full px-4 py-2 border shadow text-sm"
            placeholder="内容をご入力ください"
            value={newExpense.item}
            onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
          />
        </div>

        <div>
          <label>金額</label>
          <input
            type="number"
            className="w-full px-4 py-2 border shadow text-sm"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={handleCreate}
          className="bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
        >
          登録
        </button>
        <button
          onClick={onBack}
          className="bg-gray-300 font-bold py-2 px-4 rounded hover:bg-gray-400"
        >
          戻る
        </button>
      </div>
    </div>
  );
};

export default ExpenseNew;
