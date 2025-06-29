const AvailableBudgetDisplay = ({ availableBudget, totalAmount }) => {
  const remainingBudget = availableBudget - totalAmount;
  const usagePercentage = availableBudget > 0 ? (totalAmount / availableBudget) * 100 : 0;

  return (
    <div className="shadow p-6 mb-6">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
          <p className="text-xs text-blue-600 font-medium mb-1">投資可能額</p>
          <p className="text-lg font-bold text-blue-700">¥{availableBudget.toLocaleString()}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-1">選択金額</p>
          <p className="text-lg font-bold text-gray-800">¥{totalAmount.toLocaleString()}</p>
        </div>

        <div className={`rounded-lg p-4 text-center border ${
          remainingBudget < 0 
            ? 'bg-red-50 border-red-200' 
            : 'bg-green-50 border-green-200'
        }`}>
          <p className={`text-xs font-medium mb-1 ${
            remainingBudget < 0 ? 'text-red-600' : 'text-green-600'
          }`}>残予算</p>
          <p className={`text-lg font-bold ${
            remainingBudget < 0 ? 'text-red-700' : 'text-green-700'
          }`}>
            ¥{remainingBudget.toLocaleString()}
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