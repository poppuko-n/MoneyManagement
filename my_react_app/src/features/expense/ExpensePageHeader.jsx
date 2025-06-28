import addImage from "../../assets/add.svg";

const ExpensePageHeader = ({expenses, year, month, setYear, setMonth, initializeYearMonth, onCreateNew}) => {
  const incomeTotal = expenses
    .filter((e) => e.transaction_type === "収入")
    .reduce((sum, e) => sum + e.amount, 0);

  const expenseTotal = expenses
    .filter((e) => e.transaction_type === "支出")
    .reduce((sum, e) => sum + e.amount, 0);

  const balance = incomeTotal - expenseTotal;
  const years = ["2023", "2024", "2025"];
  // "01" 〜 "12" を生成
  const months = [...Array(12)].map((_, i)=>String(i+1).padStart(2, "0"))

  return (
    <div className="container mx-auto p-4">
      <div className="flex mb-4">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-center gap-2 items-center">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <label>年</label>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2"
          >
            {months.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <label>月</label>
          
          <button
            onClick={initializeYearMonth}
            className="border bg-gray-100 rounded p-2 hover:bg-gray-300"
          >
            今月
          </button>
        </div>

        <div className="flex-1 flex justify-end">
            <button
              onClick={onCreateNew}
              className="bg-red-400 text-white rounded-full p-4 flex justify-center hover:bg-red-300"
            >
              <img src={addImage} alt="add" className="w-6 h-6" />
              新規登録
            </button>
        </div>
      </div>

      <div className="flex justify-around items-center p-4 shadow mb-2 text-center">
        <div>
          <p>収入</p>
          <p className="text-3xl">{incomeTotal.toLocaleString()}</p>
        </div>
        <p className="text-xl font-bold">-</p>
        <div>
          <p>支出</p>
          <p className="text-3xl">{expenseTotal.toLocaleString()}</p>
        </div>
        <p className="text-xl font-bold">=</p>
        <div>
          <p>収支</p>
          <p className="text-3xl">{balance.toLocaleString()}</p>
        </div>
      </div>
    </div> 
  );
};

export default ExpensePageHeader;