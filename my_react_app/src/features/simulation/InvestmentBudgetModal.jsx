

const InvestmentBudgetModal = ({ budgetData, onClose }) => {
  const { income, spending, balance, availableForInvestment } = budgetData;

  return (
    <>
      <div className="mb-6">
        <p className="font-bold mb-2">収支状況</p>
        <p>直近3ヶ月の平均収支から投資可能額を算出しました</p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between p-3 border-b">
          <span>月収入</span>
          <span className="text-blue-600 font-bold">¥{income.toLocaleString()}</span>
        </div>

        <div className="flex justify-between p-3 border-b">
          <span>月支出</span>
          <span className="text-red-600 font-bold">¥{spending.toLocaleString()}</span>
        </div>

        <div className="flex justify-between p-3 border-b">
          <span>収支</span>
          <span>¥{balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-4">
        <p className="mb-2">あなたの投資可能額は</p>
        <p className="text-2xl font-bold">¥{availableForInvestment.toLocaleString()}</p>
        <p>です</p>
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