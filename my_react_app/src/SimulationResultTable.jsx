const SimulationResultTable = ({ results, selectedType, selectedPeriod, calculateInitialInvestment }) => {
  const formatAmount = (value) => value.toLocaleString();

  return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-3 border-b">コード</th>
          <th className="p-3 border-b">銘柄名</th>
          <th className="p-3 border-b">現在価格 (円)</th>
          <th className="p-3 border-b">保有数量</th>
          <th className="p-3 border-b">運用額 (円)</th>
          <th className="p-3 border-b">評価額 (円)</th>
          <th className="p-3 border-b">損益額 (増減率 %)</th>
        </tr>
      </thead>
      <tbody>
        {results.map((item) => {
          const initial = calculateInitialInvestment(item, selectedPeriod);
          const evalValue = item[selectedType][`${selectedPeriod}_ago`];
          const profitLoss = evalValue - initial;
          const changeRate = ((profitLoss / initial) * 100).toFixed(2);
          const color =
            profitLoss > 0 ? "text-red-500" : profitLoss < 0 ? "text-blue-500" : "text-gray-500";

          return (
            <tr key={item.code} className="text-center">
              <td className="p-3 border-b">{item.code}</td>
              <td className="p-3 border-b">{item.name}</td>
              <td className="p-3 border-b">{formatAmount(item.current_price)}</td>
              <td className="p-3 border-b">{formatAmount(item.quantity)}</td>
              <td className="p-3 border-b">{formatAmount(initial)} 円</td>
              <td className="p-3 border-b">{formatAmount(evalValue)} 円</td>
              <td className={`p-3 border-b ${color}`}>
                {formatAmount(profitLoss)} 円 ({changeRate} %)
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default SimulationResultTable;
