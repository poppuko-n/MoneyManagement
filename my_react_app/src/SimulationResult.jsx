import { useState } from "react";
import { useLocation } from "react-router-dom";
import SimulationTypeSelector from './SimulationTypeSelector';
import SimulationSummary from './SimulationSummary';
import SimulationChart from './SimulationChart';
import SimulationResultTable from './SimulationResultTable';
import SimulationInsight from './SimulationInsight';

const SimulationResult = () => {
  const { results, ai_analysis } = useLocation().state;

  // NOTE: 運用方法の選択状態（"simulation"＝一括、"accumulation_simulation"＝積立）
  const [selectedType, setSelectedType] = useState("simulation");

  // NOTE: 表示するシミュレーション期間は固定（1年間）
  const selectedPeriod = "1_year";

  // NOTE: 期間コードから月数を取得するヘルパー関数
  const getMonthlyCount = (period) => ({
    "3_months": 3,
    "6_months": 6,
    "9_months": 9,
    "1_year": 12,
  }[period]);

  // NOTE: 1銘柄あたりの投資額（運用額）を算出
  // 積立運用なら「月数分 × 毎月の金額」、通常運用なら「単純な一括投資」
  const calculateInitialInvestment = (item, period) => {
    const base = item.current_price * item.quantity;
    return selectedType === "accumulation_simulation"
      ? base * getMonthlyCount(period)
      : base;
  };

  // NOTE: すべての銘柄に対して、合計の運用額・評価額・損益額・増減率を算出する
  const getSummary = (period) => {
    const investment = results.reduce((sum, item) => sum + calculateInitialInvestment(item, period), 0);
    const evaluation = results.reduce((sum, item) => sum + item[selectedType][`${period}_ago`], 0);
    const profitLoss = evaluation - investment;
    const changeRate = investment === 0 ? 0 : ((profitLoss / investment) * 100).toFixed(2);
    return { investment, evaluation, profitLoss, changeRate };
  };

  // NOTE: サマリーは12ヶ月固定（selectedPeriod = "1_year"）で表示
  const summary = getSummary(selectedPeriod);

  // NOTE: グラフ用のデータ（3ヶ月・6ヶ月・9ヶ月・1年ごとの推移）を作成
  const getChartData = () =>
    ["3_months", "6_months", "9_months", "1_year"].map((period) => {
      const s = getSummary(period);
      return {
        date: `${getMonthlyCount(period)}ヶ月後`,
        purchase_amount: s.investment,
        evaluation_amount: s.evaluation,
      };
    });

  return (
    <div className="container mx-auto p-4">
      {/* NOTE: タイトル表示 */}
      <h1 className="text-2xl border-b border-black pb-2 inline-block mb-6">シミュレーション結果</h1>

      {/* NOTE: 運用方法の選択ボタン（通常 / 積立） */}
      <SimulationTypeSelector
        selectedType={selectedType}
        onChange={setSelectedType}
      />
      
      {/* NOTE: 運用額・評価額・損益額のサマリー表示 */}
      <SimulationSummary {...summary} />

      {/* NOTE: 運用推移の折れ線グラフ（預金 vs 投資） */}
      <SimulationChart data={getChartData()} />

      {/* NOTE: AIによる投資診断 */}
      <SimulationInsight ai_analysis={ai_analysis} />


      {/* NOTE: 各銘柄ごとの明細テーブル */}
      <SimulationResultTable
        results={results}
        selectedType={selectedType}
        selectedPeriod={selectedPeriod}
        calculateInitialInvestment={calculateInitialInvestment}
      />
    </div>
  );
};

export default SimulationResult;
