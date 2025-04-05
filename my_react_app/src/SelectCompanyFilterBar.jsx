import toggleOfImage from './assets/toggle_off.svg'
import toggleOnImage from './assets/toggle_on.svg'

const SelectCompanyFilterBar = ({ filtername, setFilterName, isShowFiltered, toggleShowFiltered }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="銘柄コード、銘柄名で検索"
            value={filtername}
            onChange={(e) => setFilterName(e.target.value.trim())}
            className="border border-gray-300 p-2 rounded w-full pr-10"
          />
          {filtername && (
            <button
              onClick={() => setFilterName("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2 w-48">
          <div
            onClick={toggleShowFiltered}
            className="cursor-pointer transition duration-300 flex items-center justify-center"
          >
            <img
              src={isShowFiltered ? toggleOnImage : toggleOfImage}
              alt={isShowFiltered ? "toggleon" : "toggleoff"}
              className="w-10 h-10"
            />
          </div>
          <span className="text-gray-700 truncate">
            {isShowFiltered ? "すべて表示" : "選択銘柄のみ表示"}
          </span>
        </div>
      </div>
    </>
  );
};

export default SelectCompanyFilterBar;