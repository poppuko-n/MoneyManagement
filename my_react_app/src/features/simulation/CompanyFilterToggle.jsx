import toggleOffImage from '../../assets/toggle_off.svg'
import toggleOnImage from '../../assets/toggle_on.svg'

const CompanyFilterToggle = ({ isFilteringSelectedCompanies, toggleFiltered }) => {
  return (
    <button className="flex items-center" onClick={toggleFiltered}>
      <img
        src={isFilteringSelectedCompanies ? toggleOnImage : toggleOffImage}
        alt={isFilteringSelectedCompanies ? "toggleon" : "toggleoff"}
        className="w-10 mr-2"
      />
      <span>{isFilteringSelectedCompanies ? "すべて表示" : "選択銘柄のみ表示"}</span>
    </button>
  );
};

export default CompanyFilterToggle;