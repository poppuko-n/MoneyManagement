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

  // 選択された運用タイプ（"one_time" or "accumulated"）と表示対象期間（例: "12_month"）に基づいて
  // 各銘柄の評価額(value)と運用額（reposit）を取り出し、整形する。
  const simulationResultsByTypeAndPeriod = results.map( result => {
    const selectedPeriodResults = result[selectedSimulationType].find(sim => sim.period === DISPLAY_PERIOD);
    return {
      code: result.code,
      name: result.name,
      current_price: result.current_price,
      quantity: result.quantity,
      value: selectedPeriodResults.value,
      deposit: selectedPeriodResults.deposit
    };
  });

// 各月について、全銘柄の同月のシミュレーション結果を合算し、
// 「○ヶ月後」「預金額（purchase_amount）」「評価額（evaluation_amount）」を持つオブジェクトの配列を返す。
  const getChartData = () =>
  Array.from({ length: 12 }, (_, i) => {
    const period = `${i + 1}_month`;
    const [deposit, value] = results.reduce(
      ([d, v], r) => {
        const sim = r[selectedSimulationType].find(s => s.period === period);
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
      <SimulationChart data={getChartData()} />

      {/* NOTE: AIによる投資診断 */}
      <SimulationInsight ai_analysis={ai_analysis} />

      {/* NOTE: 各銘柄ごとの明細テーブル */}
      <SimulationResultTable simulationResultsByTypeAndPeriod={simulationResultsByTypeAndPeriod} />
    </div>
  );
};

export default SimulationResult;
