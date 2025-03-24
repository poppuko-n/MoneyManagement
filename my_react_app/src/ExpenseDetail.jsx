import editImage from "./assets/edit.svg";
import deleteImage from "./assets/delete.svg";
import arrowImage from "./assets/arrow.svg";
import ExpenseApi from './lib/ExpenseApi';
import { useAuth } from "./contexts/Authcontext"

const ExpenseDetail =  ({ expenses, onSelectExpense, onBack }) => {
  const handleDelete = (id) => {
    if (window.confirm("本当に削除しますか")) {
      ExpenseApi.deleteExpense(id, token).then(() => {
        onBack()
      })
    }
  };
  
  const { token } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4 mt-08">収支一覧</h2>

      <div className='flex justify-end mb-4'>
        <button onClick={onBack} className='flex items-center'>
          グラフへ戻る
          <img src={arrowImage} alt="arrow" className='w-5 h-5 ml-2' />
        </button>
      </div>

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
export default ExpenseDetail;