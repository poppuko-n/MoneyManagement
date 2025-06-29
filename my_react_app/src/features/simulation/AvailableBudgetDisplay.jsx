const AvailableBudgetDisplay = ({ availableBudget, totalAmount }) => {
  const remainingBudget = availableBudget - totalAmount;

  return (
    <div className="shadow p-6 flex justify-around mb-6">
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
  );
};

export default AvailableBudgetDisplay; 