import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";

const SimulationChart = ({ projectionResults, simulationType }) => {
  const data = Array.from({ length: 12 }, (_, i) => {
      const period = `${i + 1}_month`;
      const [deposit, value] = projectionResults.reduce(
        ([d, v], r) => {
          const sim = r[simulationType].find(s => s.period === period);
          return [d + sim.deposit, v + +sim.value];
        },
        [0, 0]
      );

    return {
      date: `${i + 1}ヶ月後`,
      purchase_amount: deposit,
      evaluation_amount: value,
    };
  });

  return (
    <div className="shadow p-4 mb-6">
      <p className="text-xl font-bold border-b mb-4 pb-2">預金と投資した場合の比較</p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="purchase_amount" stroke="#4285F4" strokeWidth={4} name="預金" />
          <Line type="monotone" dataKey="evaluation_amount" stroke="#34A853" strokeWidth={4} name="投資" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimulationChart;
