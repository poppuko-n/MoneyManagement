import addImage from "./assets/add.svg";
import downLoadImage from "./assets/download.svg";

const ExpenseHeader = ({expenses, year, month, setYear, setMonth, initializeYearMonth, onCreateNew}) => {
  const incomeTotal = expenses
    .filter((expense) => expense.transaction_type === "収入")
    .reduce((total, expense) => total + expense.amount, 0);

  const expenseTotal = expenses
    .filter((expense) => expense.transaction_type === "支出")
    .reduce((total, expense) => total + expense.amount, 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-2xl border-b border-black pb-2 inline-block">月次収支</h1>
        </div>
        <div className="flex-1 flex justify-center gap-2 items-center">
          <div className="flex gap-2 items-center">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="text-xl bg-white border border-gray-300 rounded px-2 py-1"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <label className="text-gray-700">年</label>

            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="text-xl bg-white border border-gray-300 rounded px-2 py-1"
            >
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <label className="text-gray-700">月</label>
            <button
              onClick={initializeYearMonth}
              className=" text-gray-800 border bg-gray-100 border-gray-300 rounded px-2 py-1 hover:bg-gray-300 transition duration-300"
            >
              今月
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-end gap-2">
            <div
              onClick={onCreateNew}
              className="cursor-pointer hover:bg-red-300 bg-red-400 text-white rounded-full p-4 transition duration-700 flex items-center justify-center"
            >
              <img 
                src={addImage} 
                alt="add"
                className="w-6 h-6" 
              />
              新規登録
            </div>
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

    </div> 
  );
};

export default ExpenseHeader;