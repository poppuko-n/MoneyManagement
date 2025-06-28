import { PieChart, Pie, Cell, Legend } from "recharts";
import arrowImage from "../../assets/arrow.svg";

const ExpensePieChart = ({expenses, categories, onBack})=> {

  const COLORS = ["#FF6B6B", "#3B82F6", "#F4A261", "#2EC4B6", "#9B5DE5"];
  const expenseCategories = categories.filter(c => c.transaction_type === "支出");

  const expenseDataByCategory = expenseCategories.map((category) => ({
    name: category.name,
    value: expenses
      .filter((e) => e.category_name === category.name)
      .reduce((sum, e) => sum + e.amount, 0)
  }));

  const totalExpense = expenseDataByCategory.reduce((sum, d)=> sum + d.value, 0);
  
  return(
    <div className="container mx-auto">
      <p className="font-bold text-center mb-4">カテゴリ別支出</p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="w-full md:w-1/2 flex justify-center">
          <PieChart width={450} height={400}>
            <Pie
                data={expenseDataByCategory}
                cx="50%"
                cy="50%"
                dataKey="value"
                startAngle={90}
                endAngle={-270} >
                {expenseCategories.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
          </Pie>
          <Legend verticalAlign="top" align="center" />
          </PieChart>
        </div>

        <div className="md:w-1/2">
          <div className=" flex justify-end mb-2">
            <button onClick={onBack} className="flex items-center">
              一覧へ
              <img src={arrowImage} alt="arrow" className="w-4 h-4 ml-2" />
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr className="font-bold bg-gray-100">
                <td className="border p-2 text-left">カテゴリ</td>
                <td className="border p-2 text-right">金額</td>
              </tr>
            </thead>
            <tbody>
              {expenseDataByCategory.map((data, index) => (
                <tr key={index}>
                  <td className="border font-bold p-2" style={{color: COLORS[index]}}>
                    {data.name}
                  </td>
                  <td className="border p-2 text-right">{data.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td className="border p-2">合計</td>
                <td className="border p-2 text-right">{totalExpense.toLocaleString()} 円</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExpensePieChart;