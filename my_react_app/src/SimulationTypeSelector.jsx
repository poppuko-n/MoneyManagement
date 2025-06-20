import arrowImage from "./assets/arrow.svg";

const SimulationTypeSelector = ({ selectedSimulationType, setSelectedSimulationType, onBack }) => {
  const types = [
    { value: "one_time", label: "一括" },
    { value: "accumulated", label: "積立" },
  ];

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl border-b border-black pb-2 inline-block mb-6">シミュレーション結果</h1>
        <button onClick={onBack} className="flex items-center">
          銘柄選択へ戻る
          <img src={arrowImage} alt="arrow" className="w-5 h-5 ml-2" />
        </button>
      </div>

      <div className="bg-white rounded shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2">運用方法</h2>
        <div className="flex gap-4">
          {types.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setSelectedSimulationType(value)}
              className={`border-gray-400 border flex-1 px-4 py-3 rounded text-lg font-semibold transition ${
                selectedSimulationType === value
                  ? "bg-green-300 text-green-800"
                  : "bg-white text-black hover:bg-green-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SimulationTypeSelector;
