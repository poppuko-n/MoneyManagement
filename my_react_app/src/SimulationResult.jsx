import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const SimulationResult = () => {
  const location = useLocation();
  const results = location.state.results;

  const [selectedPeriod, setSelectedPeriod] = useState("3_months");
  const [selectedType, setSelectedType] = useState("simulation");

  const periodMonths = {
    "3_months": 3,
    "6_months": 6,
    "9_months": 9,
    "1_year": 12,
  };

  const calculateTotalEvaluation = (period) => {
    return results.reduce((total, item) => total + item[selectedType][`${period}_ago`], 0);
  };

  const calculateInitialInvestment = (item, period) => {
    const monthlyInvestment = item.current_price * item.quantity;
    return selectedType === "accumulation_simulation"
      ? monthlyInvestment * periodMonths[period]
      : monthlyInvestment;
  };

  const calculateTotalInvestment = (period) => {
    return results.reduce((total, item) => total + calculateInitialInvestment(item, period), 0);
  };

  const calculateTotalProfitLoss = (period) => {
    return calculateTotalEvaluation(period) - calculateTotalInvestment(period);
  };

  const calculateTotalChangeRate = (period) => {
    const initialInvestment = calculateTotalInvestment(period);
    if (initialInvestment === 0) return 0;
    return ((calculateTotalProfitLoss(period) / initialInvestment) * 100).toFixed(2);
  };

  const calculateInvestmentTrend = () => {
    return Object.keys(periodMonths).map((period) => ({
      date: `${periodMonths[period]}ヶ月後`,
      purchase_amount: calculateTotalInvestment(period),
      evaluation_amount: calculateTotalEvaluation(period),
    }));
  };

  const totalEvaluation = calculateTotalEvaluation(selectedPeriod);
  const totalInvestment = calculateTotalInvestment(selectedPeriod);
  const totalProfitLoss = calculateTotalProfitLoss(selectedPeriod);
  const totalChangeRate = calculateTotalChangeRate(selectedPeriod);

  const formatAmount = (amount) => amount.toLocaleString();
  const profitLossClass = totalProfitLoss > 0 ? "text-red-500" : totalProfitLoss < 0 ? "text-blue-500" : "text-gray-500";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl border-b border-black pb-2 inline-block mb-6">シミュレーション結果</h1>

      <div className="flex gap-4 mb-4">
        {Object.keys(periodMonths).map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded ${
              selectedPeriod === period ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {periodMonths[period]}ヶ月後
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedType("simulation")}
          className={`px-4 py-2 rounded ${
            selectedType === "simulation" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          通常
        </button>
        <button
          onClick={() => setSelectedType("accumulation_simulation")}
          className={`px-4 py-2 rounded ${
            selectedType === "accumulation_simulation" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          積み立て
        </button>
      </div>

      <div className="flex flex-wrap justify-between mb-6 p-4 bg-white rounded shadow">
        <div className="w-1/4 text-center">
          <h2 className="text-lg font-semibold mb-2">買付金額</h2>
          <p className="text-2xl font-bold">{formatAmount(totalInvestment)} 円</p>
        </div>
        <div className="w-1/4 text-center">
          <h2 className="text-lg font-semibold mb-2">合計評価額</h2>
          <p className="text-2xl font-bold">{formatAmount(totalEvaluation)} 円</p>
        </div>
        <div className="w-1/4 text-center">
          <h2 className="text-lg font-semibold mb-2">損益額 (増減率 %)</h2>
          <p className={`text-2xl font-bold ${profitLossClass}`}>
            {formatAmount(totalProfitLoss)} 円 ({totalChangeRate} %)
          </p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">預金と投資した場合の比較</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={calculateInvestmentTrend()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="purchase_amount" stroke="#4285F4" strokeWidth={4} name="預金" />
            <Line type="monotone" dataKey="evaluation_amount" stroke="#34A853" strokeWidth={4} name="投資" />
          </LineChart>
        </ResponsiveContainer>
      </div>


      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border-b">コード</th>
            <th className="p-3 border-b">銘柄名</th>
            <th className="p-3 border-b">現在価格 (円)</th>
            <th className="p-3 border-b">保有数量</th>
            <th className="p-3 border-b">買付金額 (円)</th>
            <th className="p-3 border-b">評価額 (円)</th>
            <th className="p-3 border-b">損益額 (増減率 %)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => {
            const evaluationValue = item[selectedType][`${selectedPeriod}_ago`];
            const initialInvestment = calculateInitialInvestment(item, selectedPeriod);
            const profitLoss = evaluationValue - initialInvestment;
            const changeRate = ((profitLoss / initialInvestment) * 100).toFixed(2);
            const profitLossCellClass = profitLoss > 0 ? "text-red-500" : profitLoss < 0 ? "text-blue-500" : "text-gray-500";

            return (
              <tr key={item.code} className="text-center">
                <td className="p-3 border-b">{item.code}</td>
                <td className="p-3 border-b">{item.name}</td>
                <td className="p-3 border-b">{formatAmount(item.current_price)}</td>
                <td className="p-3 border-b">{formatAmount(item.quantity)}</td>
                <td className="p-3 border-b">{formatAmount(initialInvestment)} 円</td>
                <td className="p-3 border-b">{formatAmount(evaluationValue)} 円</td>
                <td className={`p-3 border-b ${profitLossCellClass}`}>
                  {formatAmount(profitLoss)} 円 ({changeRate} %)
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SimulationResult;
