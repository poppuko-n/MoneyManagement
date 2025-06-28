import toggleOfImage from './assets/toggle_off.svg'
import toggleOnImage from './assets/toggle_on.svg'

const FilterToggleBar = ({ isFilteringSelectedCompanies, toggleFiltered }) => {
  return (
    <button className="flex items-center mb-4" onClick={toggleFiltered}>
      <img
        src={isFilteringSelectedCompanies ? toggleOnImage : toggleOfImage}
        alt={isFilteringSelectedCompanies ? "toggleon" : "toggleoff"}
        className="w-10 mr-2"
      />
      <span>{isFilteringSelectedCompanies ? "すべて表示" : "選択銘柄のみ表示"}</span>
    </button>
  );
};

export default FilterToggleBar;