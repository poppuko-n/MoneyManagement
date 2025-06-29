

const InvestmentBudgetModal = ({ budgetData, onClose }) => {
  const { income, spending, balance, availableForInvestment } = budgetData;

  return (
    <>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold mb-3">収支状況</h2>
        <p className="text-sm">直近3ヶ月の平均収支から投資可能額を算出しました</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between p-4 border-b">
          <span>月収入</span>
          <span className="text-blue-600 font-bold">¥{income.toLocaleString()}</span>
        </div>

        <div className="flex justify-between p-4 border-b">
          <span>月支出</span>
          <span className="text-red-600 font-bold">¥{spending.toLocaleString()}</span>
        </div>

        <div className="flex justify-between p-4 border-b">
          <span className="font-bold">収支</span>
          <span className="font-bold">¥{balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg p-6 mb-6">
        <div className="text-center">
          <p className="mb-3">投資可能額</p>
          <p className="text-3xl font-bold">¥{availableForInvestment.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onClose}
          type="button"
          className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
        >
          閉じる
        </button>
      </div>
    </>
  );
};

export default InvestmentBudgetModal; 