import { useState, useEffect } from "react";
import SimulationResult from "./SimulationResult.jsx"
import SelectCompanyHeader from "./SelectCompanyHeader.jsx";
import SelectCompanyFilterBar from "./SelectCompanyFilterBar.jsx";
import SelectCompanyTable from "./SelectCompanyTable.jsx";
import Modal from "./Modal.jsx";
import CompanyApi from './lib/CompanyApi.js'
import { motion } from "framer-motion";

// NOTE: 投資シミュレーション画面のメインコンポーネント。
// ユーザーは企業を選び、数量を指定して投資結果のシミュレーションを行える。
// AI分析結果とともにシミュレーション結果を表示する。
const Simulation = () => {
  const [companies, setCompanies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [filtername, setFilterName] = useState("");
  const [simulationData, setSimulationData] = useState(null);
  const [isFilteringSelectedCompanies, setIsFilteringSelectedCompanies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingSimulationResult , setIsShowingSimulationResult] = useState(false);

   // NOTE: 初回マウント時に企業データをAPIから取得し、数量をすべて0で初期化
  // 画面初期表示時に全企業の「投資予定数量(quantities)」を明示的に0でセットすることで、
  // 未選択状態を定義し、以降の加減操作やフィルタ処理の前提を明確にしている。
  useEffect(() => {
    CompanyApi.getCompanies().then((response) => {
      const initialQuantities = response.data.reduce((acc, company) => {
        acc[company.code] = 0;
        return acc;
      }, {});
      setCompanies(response.data);
      setQuantities(initialQuantities);
    });
  }, []);

  // NOTE: 投資予定数量(quantities)を増減する関数。0未満にはならないようにする
  const handleQuantityChange = (code, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [code]: Math.max(prevQuantities[code] + change, 0),
    }));
  };

  // NOTE: 指定された企業の投資予定数量(quantities)をリセットする関数
  const resetQuantity = (code) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [code]: 0,
    }));
  };

  // NOTE: 合計投資金額を計算する関数
  // 各企業の「最新株価（latest_price）」に、ユーザーが指定した「投資予定数量（quantities）」を掛けて合計する。
  const calculateTotalAmount = () =>
    companies.reduce(
      (total, company) => total + company.latest_price * (quantities[company.code] || 0), 0
    );

  // NOTE: 選択された企業と数量をAPIに送信して、シミュレーションを実行
  // データ受信後は state に格納し、シミュレーション結果画面に切り替える。
  // API処理中は isLoading を true にしてローディングUIを表示、完了後に false に戻す。
  const sendQuantitiesToServer = () => {
    const selectedCompanies = companies
      .filter((company) => quantities[company.code] > 0)
      .map((company) => ({
        code: company.code,
        quantity: quantities[company.code],
      }));

    setIsLoading(true);

    CompanyApi.getSimulations({data: selectedCompanies})
      .then((response)=>{
        setSimulationData({
          results: response.data.results,
          ai_analysis: response.data.ai_analysis
        });
        setIsShowingSimulationResult(true)
      })
      .finally(()=>setIsLoading(false))
  };

  // NOTE: 表示対象の企業リスト（全体 or 選択済みのみ）を決定
  const displayedCompanies = isFilteringSelectedCompanies
    ? companies.filter((company) => quantities[company.code] > 0)
    : companies;

  // NOTE: シミュレーション結果画面を表示している場合はこちらを表示
  if (isShowingSimulationResult ){
    return(
      <SimulationResult
        results={simulationData.results}
        ai_analysis={simulationData.ai_analysis}
        onBack={()=>setIsShowingSimulationResult(false)}
      />
    );
  }

  // NOTE: 通常時の企業選択画面（ヘッダー、フィルター、テーブル、ローディング表示）
  return (
    <motion.div
      initial={{ opacity: 0, y:100 }}
      animate={{ opacity:1, y: 0 }}
      transition={{ duration: 1 }}
      className="container mx-auto p-4">

      {isLoading && (
        <Modal>
          <div className="text-center p-6">
          <motion.p
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.0 }}
            className="text-xl font-semibold mb-2"
          >
            AI分析中です…
          </motion.p>
            <p className="text-sm text-gray-500">しばらくお待ちください</p>
          </div>
        </Modal>
      )}

      <SelectCompanyHeader
        totalAmount = {calculateTotalAmount}
        onSubmit = {sendQuantitiesToServer}
      />

      <SelectCompanyFilterBar 
        filtername = {filtername}
        setFilterName = {setFilterName}
        isFilteringSelectedCompanies={isFilteringSelectedCompanies}
        toggleFiltered={()=>setIsFilteringSelectedCompanies(!isFilteringSelectedCompanies)}
      />

      <SelectCompanyTable 
        displayedCompanies = {displayedCompanies}
        filtername = {filtername}
        quantities = {quantities}
        handleQuantityChange = {handleQuantityChange}
        resetQuantity = {resetQuantity}
      />
    </motion.div>
  );
};

export default Simulation;
