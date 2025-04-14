import playImage from './assets/play.svg'

const SelectCompanyHeader = ({ totalCost, onSubmit }) => {
  const formatAmount = (value) => value.toLocaleString();

  return (
    <>
    <div className="flex items-center justify-between mb-10">
      <h1 className="text-2xl border-b border-black pb-2 inline-block">銘柄選択</h1>
      <button
        onClick={onSubmit}
        disabled={totalCost() === 0}
        className={`${
          totalCost() === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "hover:bg-red-300 bg-red-400 text-white cursor-pointer"
        } rounded-full p-4 transition duration-700 flex items-center justify-center`}
      >
        <img src={playImage} alt="play" className="w-6 h-6" />
        シミュレーション
      </button>
    </div>
    <div className="bg-gray-100 shadow-md rounded p-4 mb-8">
      <h2 className="text-xl">金額: {formatAmount(totalCost())} 円</h2>
    </div>
    </>
  );
};

export default SelectCompanyHeader;