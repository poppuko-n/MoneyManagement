import { useEffect, useState } from "react";
import SimulationTypeSelector from './SimulationTypeSelector';
import SimulationSummary from './SimulationSummary';
import SimulationChart from './SimulationChart';
import SimulationResultTable from './SimulationResultTable';
import SimulationInsight from './SimulationInsight';
import CompanyApi from './lib/CompanyApi.js';

const SimulationResult = ({projectionResults}) => {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [simulationType, setSimulationType] = useState("one_time");

  const ResultsByType = projectionResults.map( r => {
    const finalResult = r[simulationType].at(-1);
    return {
      name: r.name,
      current_price: r.current_price,
      quantity: r.quantity,
      deposit: finalResult.deposit,
      value: finalResult.value
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
    <div className="p-10">
      <p className="text-center text-2xl font-bold mb-4">シミュレーション結果</p>
      <SimulationTypeSelector
        simulationType={simulationType}
        setSimulationType={setSimulationType}
      />
      <SimulationSummary ResultsByType={ResultsByType} />
      <SimulationChart data={getChartData()} />
      <SimulationInsight ai_analysis={aiAnalysis}/>
      <SimulationResultTable ResultsByType={ResultsByType} />
    </div>
  );
};

export default SimulationResult;
