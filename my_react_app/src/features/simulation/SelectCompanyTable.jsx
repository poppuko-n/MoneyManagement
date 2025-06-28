import addImage from '../../assets/add_circle.svg'
import subtractImage from '../../assets/subtract_circle.svg'

const SelectCompanyTable = ({ displayedCompanies, quantities, setQuantities }) => {
  const handleQuantityChange = (code, change) => 
  setQuantities(p => ({...p, [code]: Math.max(p[code] + change, 0)}));

  const resetQuantity = code => 
    setQuantities(c => ({...c, [code]: 0,}));
  
  return (
    <table className="w-full">
      <thead className="bg-gray-200 text-left">
        <tr>
          <th className="p-3">コード</th>
          <th className="p-3">銘柄名</th>
          <th className="p-3">業種</th>
          <th className="p-3">株価</th>
          <th className="p-3">口数</th>
          <th className="p-3">購入金額</th>
          <th className="p-3"></th>
        </tr>
      </thead>

      <tbody>
        {displayedCompanies
          .map((company) => (
            <tr key={company.code} className='border-b'>
              <td className="p-3">{company.code}</td>
              <td className="p-3">{company.name}</td>
              <td className="p-3">{company.sector_name}</td>
              <td className="p-3 text-lg">{company.latest_price.toLocaleString()}</td>
              <td className="p-3">
                <input
                  id={company.code}
                  type="number"
                  value={quantities[company.code]}
                  className="border w-16"
                  onChange={(e) => {
                    const newValue = Math.max(parseInt(e.target.value, 10) || 0, 0);
                    const current = quantities[company.code];
                    const diff = newValue - current;
                    handleQuantityChange(company.code, diff);
                  }}
                />
              </td>
              <td className="p-3">
                {(quantities[company.code] * company.latest_price).toLocaleString()} 
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-2">
                  <img 
                    src={addImage}
                    alt="add"
                    onClick={() => handleQuantityChange(company.code, 1)}
                    className="cursor-pointer"
                  />
                  <img
                    src={subtractImage} 
                    alt="subtract"
                    onClick={() => handleQuantityChange(company.code, -1)}
                    className="cursor-pointer"
                  />
                  <button
                    onClick={() => resetQuantity(company.code)}
                    className="p-1 bg-gray-400 text-white rounded hover:bg-gray-700"
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