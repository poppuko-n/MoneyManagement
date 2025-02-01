import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import foodCost from "./assets/foodcost.svg";
import lifeCost from "./assets/lifecost.svg";
import personCost from "./assets/personcost.svg";
import trafficCost from "./assets/trafficcost.svg";
import fiexdCost from "./assets/fixedcost.svg";

const ExpensePieChart = ({expenses, expense_categories})=> {

  const images = [foodCost, lifeCost, personCost, trafficCost, fiexdCost]

  const expenseData = expense_categories.map((category, index) => ({
    name: category.name,
    value: expenses
      .filter((expense) => expense.category_name === category.name)
      .reduce((sum, expense) => sum + expense.amount, 0),
    image: images[index]
  }));

  const totalExpense = expenseData.reduce((sum, data)=> sum + data.value, 0);
  
  const COLORS = ["#FF6B6B", "#3B82F6", "#F4A261", "#2EC4B6", "#9B5DE5"];

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
            {expenseData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" align="center" />
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
                  <td className="border px-4 py-2 font-bold flex items-center">
                    <img src={data.image} alt={data.name} className="w-6 h-6 mr-2" />
                    <span style={{ color: COLORS[index % COLORS.length] }}>{data.name}</span>
                  </td>
                  <td className="border px-4 py-2 text-right">{data.value.toLocaleString()}</td>
                </tr>
              ))}
               <tr className="bg-gray-200 font-bold">
                  <td className="border px-4 py-2 text-left">合計</td>
                  <td className="border px-4 py-2 text-right">{totalExpense.toLocaleString()} 円</td>
                </tr>
            </tbody>
          </table>
        </div>


      </div>
    </div>
    </>
  )
}

export default ExpensePieChart;