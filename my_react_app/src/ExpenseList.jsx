import editImage from "./assets/edit.svg";
import deleteImage from "./assets/delete.svg";
import arrowImage from "./assets/arrow.svg";
import ExpenseApi from './lib/ExpenseApi';

const ExpenseList =  ({ expenses, setExpenseId, onBack }) => {
  const handleDelete = async(expense_id) => {
    if (!window.confirm("本当に削除しますか")) return;

    try{
      await ExpenseApi.deleteExpenseLog(expense_id);
      alert("削除しました。")
      onBack();
    } catch {
      alert("削除に失敗しました。再度お試しください。");
    }
  };

  return (
    <div className="container mx-auto">
      <p className="font-bold text-center mb-4">収支一覧</p>

      <div className='flex justify-end mb-2'>
        <button onClick={onBack} className='flex items-center'>
          グラフへ戻る
          <img src={arrowImage} alt="arrow" className='w-4 h-4 ml-2' />
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border font-bold bg-gray-100 text-left">
            <th className="border p-2">日付</th>
            <th className="border p-2">種類</th>
            <th className="border p-2">カテゴリ</th>
            <th className="border p-2">項目</th>
            <th className="border p-2 text-right w-40">金額</th>
            <th className="border p-2 text-center w-20">編集</th>
            <th className="border p-2 text-center w-20">削除</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="border p-2">{expense.date}</td>
              <td
                className={`border p-2 font-bold ${
                  expense.transaction_type === "収入" ? "text-green-600" : "text-red-600"
                }`}
              >
                {expense.transaction_type}
              </td>
              <td className="border p-2">{expense.category_name}</td>
              <td className="border p-2">{expense.item}</td>
              <td
                className="border p-2 text-right"
              >
                {expense.amount.toLocaleString()}
              </td>
              <td className="border p-2 text-center">
                <button onClick={() => setExpenseId(expense.id)}>
                  <img
                    src={editImage}
                    alt="edit"
                    className="hover:bg-gray-300 p-1"
                  />
                </button>
              </td>
              <td className="border p-2 text-center">
                <button onClick={() => handleDelete(expense.id)}>
                  <img
                    src={deleteImage}
                    alt="delete"
                    className="inline-block hover:bg-red-100 p-1"
                  />
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