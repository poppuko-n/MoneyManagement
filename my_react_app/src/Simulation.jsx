import { useState, useEffect } from "react";
import SimulationResult from "./SimulationResult.jsx"
import SelectCompanyHeader from "./SelectCompanyHeader.jsx";
import SelectCompanyFilterBar from "./SelectCompanyFilterBar.jsx";
import SelectCompanyTable from "./SelectCompanyTable.jsx";
import Modal from "./Modal.jsx";
import CompanyApi from './lib/CompanyApi.js'
import { motion } from "framer-motion";

const Simulation = () => {
  const [companies, setCompanies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [filtername, setFilterName] = useState("");
  const [simulationData, setSimulationData] = useState(null);
  const [isFilteringSelectedCompanies, setIsFilteringSelectedCompanies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingSimulationResult , setIsShowingSimulationResult] = useState(false);

  useEffect(() => {
    CompanyApi.getCompanies().then((response) => {
      const initialQuantities = response.data.reduce((acc, company) => {
        acc[company.code] = 0;
        return acc;
      }, {});
      setCompanies(response.data);
      setQuantities(initialQuantities);
    });
  }, []);

  const handleQuantityChange = (code, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [code]: Math.max(prevQuantities[code] + change, 0),
    }));
  };

  const resetQuantity = (code) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [code]: 0,
    }));
  };

  const calculateTotalAmount = () =>
    companies.reduce(
      (total, company) => total + company.latest_price * (quantities[company.code] || 0), 0
    );

  const sendQuantitiesToServer = () => {
    const selectedCompanies = companies
      .filter((company) => quantities[company.code] > 0)
      .map((company) => ({
        code: company.code,
        name: company.name,
        price: company.latest_price,
        quantity: quantities[company.code],
      }));

    setIsLoading(true);

    CompanyApi.getSimulations({data: selectedCompanies})
      .then((response)=>{
        setSimulationData({
          results: response.data.results,
          ai_analysis: response.data.ai_analysis
        });
        setIsShowingSimulationResult(true)
      })
      .finally(()=>setIsLoading(false))
  };

  const displayedCompanies = isFilteringSelectedCompanies
    ? companies.filter((company) => quantities[company.code] > 0)
    : companies;

  if (isShowingSimulationResult ){
    return(
      <SimulationResult
        results={simulationData.results}
        ai_analysis={simulationData.ai_analysis}
        onBack={()=>setIsShowingSimulationResult(false)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y:100 }}
      animate={{ opacity:1, y: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto p-4">

      {isLoading && (
        <Modal>
          <div className="text-center p-6">
          <motion.p
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.0 }}
            className="text-xl font-semibold mb-2"
          >
            AI分析中です…
          </motion.p>
            <p className="text-sm text-gray-500">しばらくお待ちください</p>
          </div>
        </Modal>
      )}

      <SelectCompanyHeader
        totalAmount = {calculateTotalAmount}
        onSubmit = {sendQuantitiesToServer}
      />

      <SelectCompanyFilterBar 
        filtername = {filtername}
        setFilterName = {setFilterName}
        isFilteringSelectedCompanies={isFilteringSelectedCompanies}
        toggleFiltered={()=>setIsFilteringSelectedCompanies(!isFilteringSelectedCompanies)}
      />

      <SelectCompanyTable 
        displayedCompanies = {displayedCompanies}
        filtername = {filtername}
        quantities = {quantities}
        handleQuantityChange = {handleQuantityChange}
        resetQuantity = {resetQuantity}
      />
    </motion.div>
  );
};

export default Simulation;
