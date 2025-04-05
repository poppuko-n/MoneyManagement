import addImage from './assets/add_circle.svg'
import subtractImage from './assets/subtract_circle.svg'

const SelectCompanyTable = ({ companies, filtername, quantities, onChange, onReset, setQuantities}) => {
  const formatAmount = (value) => value.toLocaleString();
  
  return (
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
          {companies
            .filter((company) => {
              return (
                company.name.includes(filtername) ||
                company.code.includes(filtername)
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
                  {formatAmount(company.latest_price)} 
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
                      ? `+${formatAmount(company.price_difference)} `
                      : `${formatAmount(company.price_difference)} `}
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
                  {formatAmount(quantities[company.code] * company.latest_price)} 
                </td>
                <td className="p-3 border-b">
                  <div className="flex items-center gap-2 justify-center h-full">
                    <img 
                      src={addImage}
                      alt="add"
                      onClick={() => onChange(company.code, 1)}
                      className="cursor-pointer hover:bg-gray-300 rounded p-1 transition duration-700"
                    />
                    <img 
                      src={subtractImage} 
                      alt="subtract"
                      onClick={() => onChange(company.code, -1)}
                      className="cursor-pointer hover:bg-gray-300 rounded p-1 transition duration-700"
                    />
                    <button
                      onClick={() => onReset(company.code)}
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
  );
};

export default SelectCompanyTable;