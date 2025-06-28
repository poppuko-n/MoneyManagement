import { useState, useEffect } from "react";
import SimulationResult from "./SimulationResult.jsx"
import SimulationButton from "./SimulationButton.jsx";
import FilterToggleBar from "./FilterToggleBar.jsx";
import SelectCompanyTable from "./SelectCompanyTable.jsx";
import TotalAmountBox from "./TotalAmountBox.jsx";
import Modal from "../../components/Modal.jsx";
import CompanyApi from '../../lib/CompanyApi.js'
import { motion } from "framer-motion";

const Simulation = () => {
  const [companies, setCompanies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [projectionResults, setProjectionResults] = useState(null);
  const [isFilteringSelectedCompanies, setIsFilteringSelectedCompanies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulationResultVisible, setIsSimulationResultVisible] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const companies = await CompanyApi.getCompanies();
      const initialQuantities = companies.reduce((acc, company) => {
        acc[company.code] = 0;
        return acc;
      }, {});
      setCompanies(companies);
      setQuantities(initialQuantities);
    } catch (error) {
      alert("企業データの取得に失敗しました。");
    }
  };

  const totalAmount = companies.reduce(
      (sum, c) => sum + c.latest_price * (quantities[c.code] || 0), 0);

  // NOTE: API処理中は isLoading を true にしてローディングUIを表示、完了後に false に戻す。
  const sendQuantitiesToServer = async() => {
    const selectedCompanies = companies
      .filter(c => quantities[c.code] > 0)
      .map(c => ({ code: c.code, quantity: quantities[c.code] }));

    setIsLoading(true);
    try {
      const results = await CompanyApi.createProjections({ data: selectedCompanies });
      setProjectionResults(results);
      setIsSimulationResultVisible(true);
    } catch(error) {
      alert("データ送信に失敗しました。")
    } finally {
      setIsLoading(false);
    }
  };

  const displayedCompanies = isFilteringSelectedCompanies
    ? companies.filter(c => quantities[c.code] > 0)
    : companies;

  if (isSimulationResultVisible ){
    return(
      <SimulationResult projectionResults={projectionResults}/>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y:100 }}
      animate={{ opacity:1, y: 0 }}
      transition={{ duration: 1 }}
      className="p-10">

      {isLoading && (
        <Modal>
          <motion.p
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.0 }}
            className="text-center text-xl font-bold"
          >
            株価予測中です…
          </motion.p>
        </Modal>
      )}

      <TotalAmountBox totalAmount={totalAmount}></TotalAmountBox>

      <div className="flex items-center justify-between mb-4"> 
        <FilterToggleBar 
          isFilteringSelectedCompanies={isFilteringSelectedCompanies}
          toggleFiltered={()=>setIsFilteringSelectedCompanies(!isFilteringSelectedCompanies)}
        />
        <SimulationButton
          totalAmount= {totalAmount}
          sendQuantitiesToServer={sendQuantitiesToServer}
        />
      </div>

      <SelectCompanyTable 
        displayedCompanies={displayedCompanies}
        quantities={quantities}
        setQuantities={setQuantities}
      />
    </motion.div>
  );
};

export default Simulation;
