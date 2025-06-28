import { useEffect, useState } from "react";
import SimulationModeSelector from './SimulationModeSelector';
import ResultsSummary from './ResultsSummary';
import ProfitLossChart from './ProfitLossChart';
import ResultsDataTable from './ResultsDataTable';
import AIAnalysisInsight from './AIAnalysisInsight';
import CompanyApi from '../../lib/CompanyApi.js';

const SimulationResultsPage = ({projectionResults}) => {
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
      <SimulationModeSelector
        simulationType={simulationType}
        setSimulationType={setSimulationType}
      />
      <ResultsSummary resultsByType={resultsByType} />
      <ProfitLossChart
        projectionResults={projectionResults}
        simulationType={simulationType} 
      />
      <AIAnalysisInsight aiAnalysis={aiAnalysis}/>
      <ResultsDataTable resultsByType={resultsByType} />
    </div>
  );
};

export default SimulationResultsPage;
