import { useEffect, useState } from 'react';
import ExpenseApi from './lib/ExpenseApi';

const ExpenseEdit = ({ onBack, expenseId, categories }) => {
  const [tracsactionType, setTracsactionType] = useState('')
  const [editExpense, setEditExpense] = useState({
    category_id: '',
    date: '',
    item: '',
    amount: '',
  });
  
  const filterCategoriesByType = (transactionType) =>
    categories.filter((c) => c.transaction_type === transactionType);
  
  useEffect(() => {
    fetchExpenseLog()
  }, []);

  const fetchExpenseLog = async() => {
    try{
      const data = await ExpenseApi.showExpenseLog(expenseId)
      setEditExpense(data)
      setTracsactionType(data.transaction_type)
    } catch(error) {
      alert(error.respons?.data.errors.join(`/n`) || "家計簿データの取得に失敗しました。")
    }
  }

  const handleUpdate = async() => {
    try {
      await ExpenseApi.updateExpenseLog(expenseId, editExpense);
      alert("更新が完了しました。")
      onBack();
    } catch(error) {
      alert(error.response?.data.errors.join('\n') || "家計簿データの更新に失敗しました。");
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center text-indigo-700">編集画面</p>

      <div className="space-y-4">
        <div>
          <label>種類</label>
          <select
            className="w-full px-4 py-2 border shadow text-sm"
            value={editExpense.transaction_type}
            onChange={(e) => setTracsactionType(e.target.value)}
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
            value={editExpense.category_id}
            onChange={(e) => setEditExpense({ ...editExpense, category_id: e.target.value })}
          >
            <option value="">選択してください</option>
            {filterCategoriesByType(tracsactionType).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>日付</label>
          <input
            type="date"
            className="w-full px-4 py-2 border shadow text-sm"
            value={editExpense.date}
            onChange={(e) => setEditExpense({ ...editExpense, date: e.target.value })}
          />
        </div>

        <div>
          <label>内容</label>
          <input
            type="text"
            className="w-full px-4 py-2 border shadow text-sm"
            placeholder="内容をご入力ください"
            value={editExpense.item}
            onChange={(e) => setEditExpense({ ...editExpense, item: e.target.value })}
          />
        </div>

        <div>
          <label>金額</label>
          <input
            type="number"
            className="w-full px-4 py-2 border shadow text-sm"
            value={editExpense.amount}
            onChange={(e) => setEditExpense({ ...editExpense, amount: e.target.value })}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={handleUpdate}
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

export default ExpenseEdit;
