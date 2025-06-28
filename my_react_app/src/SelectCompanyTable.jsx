import addImage from './assets/add_circle.svg'
import subtractImage from './assets/subtract_circle.svg'

const SelectCompanyTable = ({ displayedCompanies, quantities, handleQuantityChange, resetQuantity }) => {
  const formatAmount = (value) => value.toLocaleString();
  
  return (
  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
    <thead className="bg-gray-200">
      <tr>
        <th className="border px-4 py-2 text-left">コード</th>
        <th className="border px-4 py-2 text-left">銘柄名</th>
        <th className="border px-4 py-2 text-left">業種</th>
        <th className="border px-4 py-2 text-left">株価(円)</th>
        <th className="border px-4 py-2 text-left">口数</th>
        <th className="border px-4 py-2 text-left">金額</th>
        <th className="border px-4 py-2 text-left"></th>
      </tr>
    </thead>

    <tbody>
          {displayedCompanies
            .map((company) => (
              <tr key={company.code} className="text-center">
                <td className="p-3 border-b">{company.code}</td>
                <td className="p-3 border-b text-left">{company.name}</td>
                <td className="p-3 border-b text-left">{company.sector_name}</td>
                <td
                  className={`p-3 border-b text-lg font-semibold `
                }
                >
                  {formatAmount(company.latest_price)} 
                </td>
                <td className="p-3 border-b">
                  <input
                    id={company.code}
                    type="number"
                    placeholder="0"
                    value={quantities[company.code] || ""}
                    onChange={(e) => {
                      const newValue = Math.max(parseInt(e.target.value, 10) || 0, 0);
                      const current = quantities[company.code] || 0;
                      const diff = newValue - current;
                      handleQuantityChange(company.code, diff);
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
  );
};

export default SelectCompanyTable;