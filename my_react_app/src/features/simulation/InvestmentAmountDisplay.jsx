const InvestmentAmountDisplay = ({ totalAmount }) => {
  return (
    <div className="shadow p-4 mb-4">
      <h2 className="text-xl">合計金額: {totalAmount.toLocaleString()} 円</h2>
    </div>
  );
};

export default InvestmentAmountDisplay;