import { useEffect, useState } from "react";
import SimulationTypeSelector from './SimulationTypeSelector';
import SimulationSummary from './SimulationSummary';
import SimulationChart from './SimulationChart';
import SimulationResultTable from './SimulationResultTable';
import SimulationInsight from './SimulationInsight';
import CompanyApi from '../../lib/CompanyApi.js';

const SimulationResult = ({projectionResults}) => {
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [simulationType, setSimulationType] = useState("one_time");

  const resultsByType = projectionResults.map(r => ({
    name: r.name,
    deposit: r[simulationType].at(-1).deposit,
    value: r[simulationType].at(-1).value
  }));

  useEffect(()=>{
    CompanyApi.createProjectionsAnalyses({data: projectionResults})
      .then(response => setAiAnalysis(response.data))
  },[])

  return (
    <div className="p-10">
      <p className="text-center text-2xl font-bold mb-4">シミュレーション結果</p>
      <SimulationTypeSelector
        simulationType={simulationType}
        setSimulationType={setSimulationType}
      />
      <SimulationSummary resultsByType={resultsByType} />
      <SimulationChart
        projectionResults={projectionResults}
        simulationType={simulationType} 
      />
      <SimulationInsight aiAnalysis={aiAnalysis}/>
      <SimulationResultTable resultsByType={resultsByType} />
    </div>
  );
};

export default SimulationResult;
