import { useEffect, useState } from "react";
import SimulationTypeSelector from './SimulationTypeSelector';
import SimulationSummary from './SimulationSummary';
import SimulationChart from './SimulationChart';
import SimulationResultTable from './SimulationResultTable';
import SimulationInsight from './SimulationInsight';
import CompanyApi from './lib/CompanyApi.js';

const SimulationResult = ({projectionResults}) => {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [selectedSimulationType, setSelectedSimulationType] = useState("one_time");
  const DISPLAY_PERIOD = "12_month";

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

  useEffect(()=>{
    CompanyApi.createProjectionsAnalyses({data: projectionResults})
      .then(response => setAiAnalysis(response.data))
  },[])

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
      <p className="text-center text-2xl font-bold mb-4">シミュレーション結果</p>
      <SimulationTypeSelector
        selectedSimulationType={selectedSimulationType}
        setSelectedSimulationType={setSelectedSimulationType}
      />
      <SimulationSummary simulationResultsByTypeAndPeriod={simulationResultsByTypeAndPeriod} />
      <SimulationChart data={getChartData()} />
      <SimulationInsight ai_analysis={aiAnalysis}/>
      <SimulationResultTable simulationResultsByTypeAndPeriod={simulationResultsByTypeAndPeriod} />
    </div>
  );
};

export default SimulationResult;
