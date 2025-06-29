const AvailableBudgetDisplay = ({ availableBudget, totalAmount }) => {
  const remainingBudget = availableBudget - totalAmount;
  const usagePercentage = availableBudget > 0 ? (totalAmount / availableBudget) * 100 : 0;

  return (
    <div className="shadow p-6 mb-6">
      <div className="flex justify-around mb-4">
        <div>
          <p className="mb-1">投資可能額</p>
          <p className="font-bold">¥{availableBudget.toLocaleString()}</p>
        </div>

        <div>
          <p className="mb-1">選択中の投資額</p>
          <p className="font-bold">¥{totalAmount.toLocaleString()}</p>
        </div>

        <div>
          <p className="mb-1">残り予算</p>
          <p className={`font-bold ${remainingBudget < 0 ? 'text-red-600' : ''}`}>
            ¥{Math.abs(remainingBudget).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-200">
        <div
                      className={`h-3 duration-1000 ${
              usagePercentage > 100 ? 'bg-red-500' : 
              usagePercentage > 70 ? 'bg-orange-500' : 'bg-blue-500'
            }`}
          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AvailableBudgetDisplay; 