import { useState, useEffect } from "react";
import SimulationResultsPage from "./SimulationResultsPage.jsx"
import RunSimulationButton from "./RunSimulationButton.jsx";
import CompanyFilterToggle from "./CompanyFilterToggle.jsx";
import CompanySelectionTable from "./CompanySelectionTable.jsx";

import AvailableBudgetDisplay from "./AvailableBudgetDisplay.jsx";
import InvestmentBudgetModal from "./InvestmentBudgetModal.jsx";
import Modal from "../../components/Modal.jsx";
import CompanyApi from '../../lib/CompanyApi.js'
import BudgetCalculator from '../../lib/BudgetCalculator.js'
import { motion } from "framer-motion";

const InvestmentSimulationPage = () => {
  const [companies, setCompanies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [projectionResults, setProjectionResults] = useState(null);
  const [isFilteringSelectedCompanies, setIsFilteringSelectedCompanies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulationResultVisible, setIsSimulationResultVisible] = useState(false);
  const [budgetData, setBudgetData] = useState(null);
  const [showBudgetModal, setShowBudgetModal] = useState(false);

  useEffect(() => {
    fetchCompanies();
    fetchBudgetData();
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

  const fetchBudgetData = async () => {
    try {
      const budget = await BudgetCalculator.getRecentAverageBudget();
      setBudgetData(budget);
      setShowBudgetModal(true);
    } catch (error) {
      alert("予算データの取得に失敗しました。");
    }
  };

  const totalAmount = companies.reduce(
      (sum, c) => sum + c.latest_price * (quantities[c.code] || 0), 0);

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
      <SimulationResultsPage projectionResults={projectionResults}/>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y:100 }}
      animate={{ opacity:1, y: 0 }}
      transition={{ duration: 0.7 }}
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

      {showBudgetModal && (
        <Modal>
          <InvestmentBudgetModal
            budgetData={budgetData}
            onClose={() => setShowBudgetModal(false)}
          />
        </Modal>
      )}

      {budgetData && (
        <AvailableBudgetDisplay
          availableBudget={budgetData.availableForInvestment}
          totalAmount={totalAmount}
        />
      )}

      <div className="flex items-center justify-between mb-4"> 
        <CompanyFilterToggle 
          isFilteringSelectedCompanies={isFilteringSelectedCompanies}
          toggleFiltered={()=>setIsFilteringSelectedCompanies(!isFilteringSelectedCompanies)}
        />
        <RunSimulationButton
          totalAmount= {totalAmount}
          sendQuantitiesToServer={sendQuantitiesToServer}
        />
      </div>

      <CompanySelectionTable 
        displayedCompanies={displayedCompanies}
        quantities={quantities}
        setQuantities={setQuantities}
      />
    </motion.div>
  );
};

export default InvestmentSimulationPage;
