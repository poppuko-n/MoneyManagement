import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectCompanyHeader from "./SelectCompanyHeader.jsx";
import SelectCompanyFilterBar from "./SelectCompanyFilterBar.jsx";
import SelectCompanyTable from "./SelectCompanyTable.jsx";
import Modal from "./Modal.jsx";
import CompanyApi from './lib/CompanyApi.js'
import { motion } from "framer-motion";

const SelectCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isShowFiltered, setIsShowFiltered] = useState(false);
  const [filtername, setFilterName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    CompanyApi.getCompanies().then((response) => {
      setCompanies(response.data);
      const initialQuantities = response.data.reduce((acc, company) => {
        acc[company.code] = 0;
        return acc;
      }, {});
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

  const calculateTotalCost = () => {
    return companies.reduce((total, company) => {
      const quantity = quantities[company.code];
      return total + company.latest_price * quantity;
    }, 0);
  };

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
      .then((response) => {
        navigate("/simulation_result", {
          state: {
            results: response.data.results,
            ai_analysis: response.data.ai_analysis },
        });
        setIsLoading(false);
      })
  };

  const filteredCompanies = isShowFiltered
    ? companies.filter((company) => quantities[company.code] > 0)
    : companies;

  return (
    <div className="container mx-auto p-4">

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
        totalCost={calculateTotalCost}
        onSubmit={sendQuantitiesToServer}
      />

      <SelectCompanyFilterBar 
        filtername = {filtername}
        setFilterName = {setFilterName}
        isShowFiltered={isShowFiltered}
        toggleShowFiltered={()=>setIsShowFiltered((prev) => !prev)}
      />

      <SelectCompanyTable 
        companies = {filteredCompanies}
        filtername = {filtername}
        quantities = {quantities}
        onChange = {handleQuantityChange}
        onReset = {resetQuantity}
        setQuantities = {setQuantities}
      />
    </div>
  );
};

export default SelectCompany;
