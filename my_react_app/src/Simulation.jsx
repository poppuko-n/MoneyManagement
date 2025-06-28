import { useState, useEffect } from "react";
import SimulationResult from "./SimulationResult.jsx"
import SelectCompanyHeader from "./SelectCompanyHeader.jsx";
import FilterToggleBar from "./FilterToggleBar.jsx";
import SelectCompanyTable from "./SelectCompanyTable.jsx";
import Modal from "./Modal.jsx";
import CompanyApi from './lib/CompanyApi.js'
import { motion } from "framer-motion";

const Simulation = () => {
  const [companies, setCompanies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [projectionResults, setProjectionsResults] = useState(null);
  const [isFilteringSelectedCompanies, setIsFilteringSelectedCompanies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingSimulationResult , setIsShowingSimulationResult] = useState(false);

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

  // NOTE: 投資予定数量(quantities)を増減する関数。0未満にはならないようにする
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

  // NOTE: API処理中は isLoading を true にしてローディングUIを表示、完了後に false に戻す。
  const sendQuantitiesToServer = async() => {
    const selectedCompanies = companies
      .filter((company) => quantities[company.code] > 0)
      .map((company) => ({
        code: company.code,
        quantity: quantities[company.code],
      }));

    setIsLoading(true);

    try {
      const results = await CompanyApi.createProjections({ data: selectedCompanies });
      setProjectionsResults(results);
      setIsShowingSimulationResult(true);
    } catch(error) {
      alert("データ送信に失敗しました。")
    } finally {
      setIsLoading(false);
    }
  };

  // NOTE: 表示対象の企業リスト（全体 or 選択済みのみ）を決定
  const displayedCompanies = isFilteringSelectedCompanies
    ? companies.filter((company) => quantities[company.code] > 0)
    : companies;

  if (isShowingSimulationResult ){
    return(
      <SimulationResult
        projectionResults={projectionResults}
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
            株価予測中です…
          </motion.p>
            <p className="text-sm text-gray-500">しばらくお待ちください</p>
          </div>
        </Modal>
      )}

      <SelectCompanyHeader
        totalAmount = {calculateTotalAmount}
        onSubmit = {sendQuantitiesToServer}
      />

      <FilterToggleBar 
        isFilteringSelectedCompanies={isFilteringSelectedCompanies}
        toggleFiltered={()=>setIsFilteringSelectedCompanies(!isFilteringSelectedCompanies)}
      />

      <SelectCompanyTable 
        displayedCompanies = {displayedCompanies}
        quantities = {quantities}
        handleQuantityChange = {handleQuantityChange}
        resetQuantity = {resetQuantity}
      />
    </motion.div>
  );
};

export default Simulation;
