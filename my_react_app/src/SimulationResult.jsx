import { useState } from "react";
import SimulationTypeSelector from './SimulationTypeSelector';
import SimulationSummary from './SimulationSummary';
import SimulationChart from './SimulationChart';
import SimulationResultTable from './SimulationResultTable';
import SimulationInsight from './SimulationInsight';
import arrowImage from "./assets/arrow.svg";

const SimulationResult = ({results, ai_analysis, onBack}) => {
  // NOTE: 運用方法の選択状態（"one_time"＝一括、"accumulated"＝積立）
  const DISPLAY_PERIOD = "12_month";
  const [selectedSimulationType, setSelectedSimulationType] = useState("one_time");

  const simulationResultsByTypeAndPeriod = results.map( result => {
    const data = result[selectedSimulationType].find(sim => sim.period === DISPLAY_PERIOD);
    return {
      code: result.code,
      name: result.name,
      current_price: result.current_price,
      quantity: result.quantity,
      value: data.value,
      deposit: data.deposit
    };
  });

  // // NOTE: グラフ用のデータ（3ヶ月・6ヶ月・9ヶ月・1年ごとの推移）を作成
  // const getChartData = () =>
  //   ["3_months", "6_months", "9_months", "1_year"].map((period) => {
  //     const s = getSummary(period);
  //     return {
  //       date: `${getMonthlyCount(period)}ヶ月後`,
  //       purchase_amount: s.investment,
  //       evaluation_amount: s.evaluation,
  //     };
  //   });

  return (
    <div className="container mx-auto p-4">
      {/* NOTE: タイトル表示 */}
      <div className="flex justify-between ">
        <h1 className="text-2xl border-b border-black pb-2 inline-block mb-6">シミュレーション結果</h1>
        <button
          onClick={onBack}
          className="flex items-center"
          >
            銘柄選択へ戻る
            <img src={arrowImage} alt="arrow" className='w-5 h-5 ml-2' />
        </button>
      </div>

      {/* NOTE: 運用方法の選択ボタン（一括 / 積立） */}
      <SimulationTypeSelector
        selectedSimulationType={selectedSimulationType}
        setSelectedSimulationType={setSelectedSimulationType}
      />
      
      {/* NOTE: 運用額・評価額・損益額のサマリー表示 */}
      <SimulationSummary simulationResultsByTypeAndPeriod={simulationResultsByTypeAndPeriod} />

      {/* NOTE: 運用推移の折れ線グラフ（預金 vs 投資） */}
      {/* <SimulationChart data={getChartData()} /> */}

      {/* NOTE: AIによる投資診断 */}
      <SimulationInsight ai_analysis={ai_analysis} />

      {/* NOTE: 各銘柄ごとの明細テーブル */}
      <SimulationResultTable simulationResultsByTypeAndPeriod={simulationResultsByTypeAndPeriod} />
    </div>
  );
};

export default SimulationResult;
