import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const ExpensePieChart = ({expenses, expense_categories})=> {

  const expenseData = expense_categories.map((category) => {
    const totalAmount = expenses
    .filter((expense) => expense.category_name === category.name)
    .reduce((sum, expense) => sum + expense.amount, 0);

    return {name: category.name, value: totalAmount}
  })

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];


  return(
    <>
    {console.log({expenseData: expenseData})}
    <div className="container mx-auto p-4">
      
      <h2 className="text-xl font-bold text-center mb-2">支出別カテゴリ</h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8">

      <div className="w-full md:w-1/2 flex justify-center">
      <PieChart width={400} height={400}>
        <Pie
            data={expenseData}
            cx="50%"
            cy="50%"
            label={({ name, value }) => `${value.toLocaleString()}`} 
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value">
            {expenseData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" align="center" />
        </PieChart>

        </div>
        <div className="w-full md:w-1/2">
          <table className="w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">カテゴリ</th>
                <th className="border px-4 py-2 text-right">金額 (円)</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50 transition duration-200">
                  <td className="border px-4 py-2">{data.name}</td>
                  <td className="border px-4 py-2 text-right">{data.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </div>
    </>
  )
}



export default ExpensePieChart;