const SimulationTypeSelector = ({ simulationType, setSimulationType }) => {
  const TYPES = [
    { value: "one_time", label: "一括" },
    { value: "accumulated", label: "積立" },
  ];

  return (
    <div className="shadow p-4 mb-6">
      <p className="text-xl font-bold border-b mb-4 pb-2">運用方法</p>
      <div className="flex gap-4">
        {TYPES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSimulationType(value)}
            className={`border flex-1 p-3 text-lg font-bold  ${
              simulationType === value
                ? "bg-green-300 text-green-800"
                : "bg-white text-black hover:bg-green-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimulationTypeSelector;
