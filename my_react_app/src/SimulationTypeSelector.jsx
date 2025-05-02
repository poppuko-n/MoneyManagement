const SimulationTypeSelector = ({ selectedType, onChange }) => {
  const types = [
    { value: "simulation", label: "一括" },
    { value: "accumulation_simulation", label: "積立" },
  ];

  return (
    <div className="flex gap-4 mb-6 items-center">
      <p className="text-gray-800 font-bold tracking-wide px-4 py-2">運用方法</p>
      {types.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 py-2 rounded ${
            selectedType === value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default SimulationTypeSelector;
