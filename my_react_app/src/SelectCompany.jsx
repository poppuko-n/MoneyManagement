import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SelectCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showFiltered, setShowFiltered] = useState(false);
  const [filtername, setFilterName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/companies/").then((response) => {
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

  const toggleShowFiltered = () => {
    setShowFiltered((prev) => !prev);
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

    axios
      .post("http://localhost:3000/simulations", { data: selectedCompanies })
      .then((response) => {
        navigate("/simulation_result", {
          state: { results: response.data.results },
        });
      })
      .catch((error) => {
        console.error("データ送信エラー:", error);
        alert("データの送信または受信に失敗しました。");
      });
  };

  const filteredCompanies = showFiltered
    ? companies.filter((company) => quantities[company.code] > 0)
    : companies;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">銘柄選択</h1>
      <h2 className="text-xl font-semibold mb-6">
        合計購入金額: {calculateTotalCost()} 円
      </h2>

      <div className="mb-6">
        <label htmlFor="search" className="block text-lg font-medium mb-2">
          銘柄検索
        </label>
        <input
          type="text"
          id="search"
          placeholder="銘柄コード、名前で検索"
          value={filtername}
          onChange={(e) => setFilterName(e.target.value.trim())}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={toggleShowFiltered}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showFiltered ? "すべての銘柄を表示" : "選択した銘柄のみ表示"}
        </button>
        <button
          onClick={sendQuantitiesToServer}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          シミュレーション
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border-b">銘柄コード</th>
            <th className="p-3 border-b">銘柄名</th>
            <th className="p-3 border-b">業種</th>
            <th className="p-3 border-b">株価</th>
            <th className="p-3 border-b">口数</th>
            <th className="p-3 border-b">合計金額</th>
            <th className="p-3 border-b">操作</th>
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
                <td className="p-3 border-b">{company.latest_price} 円</td>
                <td className="p-3 border-b">
                  <input
                    type="number"
                    placeholder="0"
                    value={quantities[company.code] || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [company.code]: value === "" ? 0 : Math.max(parseInt(value, 10), 0),
                      }));
                    }}
                    className="border border-gray-300 rounded text-right p-1 w-20"
                  />
                </td>
                <td className="p-3 border-b">
                  {quantities[company.code] * company.latest_price} 円
                </td>
                <td className="p-3 border-b flex gap-2 justify-center">
                  <button
                    onClick={() => handleQuantityChange(company.code, 1)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleQuantityChange(company.code, -1)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => resetQuantity(company.code)}
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    リセット
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SelectCompany;
