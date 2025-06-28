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

  const ResultsByType = projectionResults.map(r => ({
    name: r.name,
    deposit: r[simulationType].at(-1).deposit,
    value: r[simulationType].at(-1).value
  }));

  useEffect(()=>{
    CompanyApi.createProjectionsAnalyses({data: projectionResults})
      .then(response => setAiAnalysis(response.data))
  },[])

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
