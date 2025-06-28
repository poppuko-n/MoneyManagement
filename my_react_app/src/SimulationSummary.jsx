const SimulationSummary = ({ resultsByType }) => {
  const investment = resultsByType.reduce((sum, d) => sum + d.deposit, 0);
  const evaluation = resultsByType.reduce((sum, d) => sum + d.value, 0);
  const profitLoss = evaluation - investment;
  const changeRate = (profitLoss / investment * 100).toFixed(2);
  const formatAmount = (amount) => amount.toLocaleString();
  const profitLossClass =
    profitLoss > 0 ? "text-red-500" : profitLoss < 0 ? "text-blue-500" : "text-gray-500";

  return (
    <div className="flex flex-wrap justify-between mb-6 p-4 bg-white rounded shadow">
      <div className="w-1/4 text-center">
        <h2 className="text-lg font-semibold mb-2">運用額</h2>
        <p className="text-2xl font-bold">{formatAmount(investment)} 円</p>
      </div>
      <div className="w-1/4 text-center">
        <h2 className="text-lg font-semibold mb-2">評価額</h2>
        <p className="text-2xl font-bold">{formatAmount(evaluation)} 円</p>
      </div>
      <div className="w-1/4 text-center">
        <h2 className="text-lg font-semibold mb-2">損益額 (増減率 %)</h2>
        <p className={`text-2xl font-bold ${profitLossClass}`}>
          {formatAmount(profitLoss)} 円 ({changeRate} %)
        </p>
      </div>
    </div>
  );
};

export default SimulationSummary;
