import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const SimulationResult = () => {
  const location = useLocation();
  const results = location.state.results;

  // 表示する期間の状態 (初期値は3ヶ月)
  const [selectedPeriod, setSelectedPeriod] = useState("3_months");

  // 合計損益額を計算
  const calculateTotalProfitLoss = (period) => {
    return results.reduce((total, item) => {
      return total + item.simulation[`${period}_ago`];
    }, 0);
  };

  // 現在選択されている期間の合計金額
  const totalProfitLoss = calculateTotalProfitLoss(selectedPeriod);

  return (
    <div>
      <h1>シミュレーション結果</h1>
      {/* ボタンで表示する期間を選択 */}
      <div>
        <button onClick={() => setSelectedPeriod("3_months")}>3ヶ月後</button>
        <button onClick={() => setSelectedPeriod("6_months")}>6ヶ月後</button>
        <button onClick={() => setSelectedPeriod("1_year")}>1年後</button>
      </div>

      {/* 選択された期間の合計損益額を表示 */}
      <div>
        <h2>合計損益額 ({selectedPeriod === "3_months" ? "3ヶ月後" : selectedPeriod === "6_months" ? "6ヶ月後" : "1年後"})</h2>
        <p>{totalProfitLoss.toLocaleString()} 円</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>コード</th>
            <th>銘柄名</th>
            <th>現在価格 (円)</th>
            <th>保有数量</th>
            <th>{selectedPeriod === "3_months" ? "3ヶ月後 (円)" : selectedPeriod === "6_months" ? "6ヶ月後 (円)" : "1年後 (円)"}</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item) => (
            <tr key={item.code}>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.current_price.toLocaleString()}</td>
              <td>{item.quantity.toLocaleString()}</td>
              <td>{item.simulation[`${selectedPeriod}_ago`].toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimulationResult;
