import { useState } from "react";
import SimulationTypeSelector from './SimulationTypeSelector';
import SimulationSummary from './SimulationSummary';
import SimulationChart from './SimulationChart';
import SimulationResultTable from './SimulationResultTable';
import SimulationInsight from './SimulationInsight';


const SimulationResult = ({projectionResults, onBack}) => {
  // NOTE: 運用方法の選択状態（"one_time"＝一括、"accumulated"＝積立）
  const DISPLAY_PERIOD = "12_month";
  const [selectedSimulationType, setSelectedSimulationType] = useState("one_time");

  // 選択された運用タイプ（"one_time" or "accumulated"）と表示対象期間（例: "12_month"）に基づいて
  // 各銘柄の評価額(value)と運用額（reposit）を取り出し、整形する。
  const simulationResultsByTypeAndPeriod = projectionResults.map( result => {
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
    const [deposit, value] = projectionResults.reduce(
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
      {/* NOTE: 運用方法の選択ボタン（一括 / 積立） */}
      <SimulationTypeSelector
        selectedSimulationType={selectedSimulationType}
        setSelectedSimulationType={setSelectedSimulationType}
        onBack={onBack}
      />
      
      <SimulationSummary simulationResultsByTypeAndPeriod={simulationResultsByTypeAndPeriod} />

      <SimulationChart data={getChartData()} />

      {/* <SimulationInsight ai_analysis={ai_analysis} /> */}

      <SimulationResultTable simulationResultsByTypeAndPeriod={simulationResultsByTypeAndPeriod} />
    </div>
  );
};

export default SimulationResult;
