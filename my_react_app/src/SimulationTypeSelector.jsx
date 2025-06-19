import arrowImage from "./assets/arrow.svg";

const SimulationTypeSelector = ({ selectedSimulationType, setSelectedSimulationType, onBack}) => {
  const types = [
    { value: "one_time", label: "一括" },
    { value: "accumulated", label: "積立" },
  ];

  return (
    <>
      <div className="flex justify-between ">
          <h1 className="text-2xl border-b border-black pb-2 inline-block mb-6">シミュレーション結果</h1>
          <button
            onClick={onBack}
            className="flex items-center"
            >
              銘柄選択へ戻る
              <img src={arrowImage} alt="arrow" className='w-5 h-5 ml-2' />
          </button>
        </div>
      <div className="flex gap-4 mb-6 items-center">
        <p className="text-gray-800 font-bold tracking-wide px-4 py-2">運用方法</p>
        { types.map(({ value, label } ) => (
          <button
            key={ value }
            onClick={() => setSelectedSimulationType(value)}
            className={`px-4 py-2 rounded ${
              selectedSimulationType === value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            { label }
          </button>
        ))}
      </div>
    </>
  );
};

export default SimulationTypeSelector;
