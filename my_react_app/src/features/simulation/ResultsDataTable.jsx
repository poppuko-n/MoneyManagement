const ResultsDataTable = ({ resultsByType }) => {
  const results = resultsByType.map(r => ({
    ...r,
    profitLoss: r.value - r.deposit,
    changeRate: (((r.value - r.deposit) / r.deposit) * 100).toFixed(2),
    profitLossClass: r.value - r.deposit > 0 ? "text-red-500" : "text-blue-500"
  }));

  return (
    <table className="w-full text-center">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">銘柄名</th>
          <th className="p-2">運用額</th>
          <th className="p-2">評価額</th>
          <th className="p-2">損益額 (増減率 %)</th>
        </tr>
      </thead>

      <tbody>
        {results.map(({ name, deposit, value, profitLoss, changeRate, profitLossClass }) => (
          <tr key={name} className="border-b">
            <td className="p-2">{name}</td>
            <td className="p-2">{deposit.toLocaleString()} 円</td>
            <td className="p-2">{value.toLocaleString()} 円</td>
            <td className={`p-2 ${profitLossClass}`}>
              {profitLoss.toLocaleString()} 円 ({changeRate} %)
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsDataTable;
