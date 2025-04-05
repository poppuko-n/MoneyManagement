import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SimulationChart = ({ data }) => {
  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">預金と投資した場合の比較</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="purchase_amount" stroke="#4285F4" strokeWidth={4} name="預金" />
          <Line type="monotone" dataKey="evaluation_amount" stroke="#34A853" strokeWidth={4} name="投資" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulationChart;
