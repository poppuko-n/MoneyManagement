import playImage from '../../assets/play.svg'

const RunSimulationButton = ({ totalAmount, sendQuantitiesToServer }) => {

  return (
    <button
      onClick={sendQuantitiesToServer}
      disabled={totalAmount === 0}
      className={`${
        totalAmount === 0
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "hover:bg-red-300 bg-red-400 text-white"
      } rounded-full p-4 flex items-center justify-center`}
    >
      <img src={playImage} alt="play" className="w-6" />
      シミュレーション
    </button>
  );
};

export default RunSimulationButton;