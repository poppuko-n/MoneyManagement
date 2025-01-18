import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SimulationResult = () => {
  const location = useLocation();
  const results = location.state.results;

  const [selectedPeriod, setSelectedPeriod] = useState("3_months");
  const [selectedType, setSelectedType] = useState("simulation");

  const calculateTotalProfitLoss = (period) => {
    return results.reduce((total, item) => {
      return total + item[selectedType][`${period}_ago`];
    }, 0);
  };

  const totalProfitLoss = calculateTotalProfitLoss(selectedPeriod);

  const formatProfitLoss = (amount) => {
    if (amount > 0) return `+${amount.toLocaleString()}`;
    if (amount < 0) return amount.toLocaleString();
    return amount.toLocaleString();
  };

  const profitLossClass =
    totalProfitLoss > 0 ? "text-red-500" : totalProfitLoss < 0 ? "text-blue-500" : "text-gray-500";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">シミュレーション結果</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSelectedPeriod("3_months")}
          className={`px-4 py-2 rounded ${
            selectedPeriod === "3_months"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          3ヶ月後
        </button>
        <button
          onClick={() => setSelectedPeriod("6_months")}
          className={`px-4 py-2 rounded ${
            selectedPeriod === "6_months"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          6ヶ月後
        </button>
        <button
          onClick={() => setSelectedPeriod("1_year")}
          className={`px-4 py-2 rounded ${
            selectedPeriod === "1_year"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          1年後
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedType("simulation")}
          className={`px-4 py-2 rounded ${
            selectedType === "simulation"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          通常
        </button>
        <button
          onClick={() => setSelectedType("accumulation_simulation")}
          className={`px-4 py-2 rounded ${
            selectedType === "accumulation_simulation"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          積み立て
        </button>
      </div>

      {/* 合計損益額 */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">合計損益額</h2>
        <p className={`text-2xl font-bold ${profitLossClass}`}>
          {formatProfitLoss(totalProfitLoss)} 円
        </p>
      </div>

      {/* 結果テーブル */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border-b">コード</th>
            <th className="p-3 border-b">銘柄名</th>
            <th className="p-3 border-b">現在価格 (円)</th>
            <th className="p-3 border-b">保有数量</th>
            <th className="p-3 border-b">
              {selectedPeriod === "3_months"
                ? "3ヶ月後 (円)"
                : selectedPeriod === "6_months"
                ? "6ヶ月後 (円)"
                : "1年後 (円)"}
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr key={item.code} className="text-center">
              <td className="p-3 border-b">{item.code}</td>
              <td className="p-3 border-b">{item.name}</td>
              <td className="p-3 border-b">{item.current_price.toLocaleString()}</td>
              <td className="p-3 border-b">{item.quantity.toLocaleString()}</td>
              <td
                className={`p-3 border-b ${
                  item[selectedType][`${selectedPeriod}_ago`] > 0
                    ? "text-red-500"
                    : item[selectedType][`${selectedPeriod}_ago`] < 0
                    ? "text-blue-500"
                    : "text-gray-500"
                }`}
              >
                {formatProfitLoss(item[selectedType][`${selectedPeriod}_ago`])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimulationResult;
