import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectCompanyHeader from "./SelectCompanyHeader.jsx";
import SelectCompanyFilterBar from "./SelectCompanyFilterBar.jsx";
import addImage from './assets/add_circle.svg'
import subtractImage from './assets/subtract_circle.svg'
import CompanyApi from './lib/CompanyApi.js'

const SelectCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showFiltered, setShowFiltered] = useState(false);
  const [filtername, setFilterName] = useState("");

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

    CompanyApi.getSimulations({data: selectedCompanies})
      .then((response) => {
        navigate("/simulation_result", {
          state: { results: response.data.results },
        });
      })
  };

  const filteredCompanies = showFiltered
    ? companies.filter((company) => quantities[company.code] > 0)
    : companies;

  const formatWithComma = (value) => {
    return new Intl.NumberFormat("ja-JP").format(value);
  };

  return (
    <div className="container mx-auto p-4">
      <SelectCompanyHeader
        totalCost={calculateTotalCost}
        onSubmit={sendQuantitiesToServer}
      />

      <SelectCompanyFilterBar 
        filtername = {filtername}
        setFilterName = {setFilterName}
        showFiltered={showFiltered}
        toggleShowFiltered={()=>setShowFiltered((prev) => !prev)}
      />

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-left">コード</th>
            <th className="border px-4 py-2 text-left">銘柄名</th>
            <th className="border px-4 py-2 text-left">業種</th>
            <th className="border px-4 py-2 text-left">株価(円)</th>
            <th className="border px-4 py-2 text-left"></th>
            <th className="border px-4 py-2 text-left">口数</th>
            <th className="border px-4 py-2 text-left">金額</th>
            <th className="border px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies
            .filter((company) => {
              const normalizedFilter = filtername.toLowerCase();
              return (
                company.name.toLowerCase().includes(normalizedFilter) ||
                company.code.toString().includes(normalizedFilter)
              );
            })
            .map((company) => (
              <tr key={company.code} className="text-center">
                <td className="p-3 border-b">{company.code}</td>
                <td className="p-3 border-b text-left">{company.name}</td>
                <td className="p-3 border-b text-left">{company.sector_name}</td>
                <td
                  className={`p-3 border-b text-lg font-semibold ${
                    company.price_difference > 0
                      ? "text-red-500"
                      : company.price_difference < 0
                      ? "text-green-500"
                      : ""
                  }`}
                >
                  {formatWithComma(company.latest_price)} 
                </td>
                <td className="p-3 border-b text-sm">
                  <div
                    className={`${
                      company.price_difference > 0
                        ? "text-red-500"
                        : company.price_difference < 0
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {company.price_difference > 0
                      ? `+${formatWithComma(company.price_difference)} `
                      : `${formatWithComma(company.price_difference)} `}
                  </div>
                  <div
                    className={`${
                      company.price_difference_rate > 0
                        ? "text-red-500"
                        : company.price_difference_rate < 0
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {company.price_difference_rate > 0
                      ? `+${company.price_difference_rate}%`
                      : `${company.price_difference_rate}%`}
                  </div>
                </td>
                <td className="p-3 border-b">
                  <input
                    type="number"
                    placeholder="0"
                    value={quantities[company.code] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [company.code]:
                          value === "" ? 0 : Math.max(parseInt(value, 10), 0),
                      }));
                    }}
                    className="border border-gray-300 rounded text-right p-1 w-20"
                  />
                </td>

                <td className="p-3 border-b">
                  {formatWithComma(quantities[company.code] * company.latest_price)} 
                </td>
                <td className="p-3 border-b">
                  <div className="flex items-center gap-2 justify-center h-full">
                    <img 
                      src={addImage}
                      alt="add"
                      onClick={() => handleQuantityChange(company.code, 1)}
                      className="cursor-pointer hover:bg-gray-300 rounded p-1 transition duration-700"
                    />
                    <img 
                      src={subtractImage} 
                      alt="subtract"
                      onClick={() => handleQuantityChange(company.code, -1)}
                      className="cursor-pointer hover:bg-gray-300 rounded p-1 transition duration-700"
                    />
                    <button
                      onClick={() => resetQuantity(company.code)}
                      className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-700"
                    >
                      リセット
                    </button>
                  </div>
                </td>

              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectCompany;
