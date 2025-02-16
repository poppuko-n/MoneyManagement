import { HashRouter, Route, Routes, Link } from 'react-router-dom';
import Expense from "./Expense";
import SelectCompany from "./SelectCompany";
import SimulationResult from "./SimulationResult";
import Home from "./Home";

const Navigation = () => {
  return (
    <HashRouter>
      <div className="bg-green-600 py-4">
        <div className="container mx-auto flex justify-around items-center">
          <Link to="/" className="text-white hover:text-green-100 px-6">サービス</Link>
          <Link to="/expense" className="text-white hover:text-green-100 px-6">家計簿</Link>
          <Link to="/selectcompany" className="text-white hover:text-green-100 px-6">シミュレーション</Link>
          <Link to="/about" className="text-white hover:text-green-100 px-6">ユーザー情報</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/expense" element={<Expense />} />
        <Route path="/selectcompany" element={<SelectCompany />} />
        <Route path="/about" element={<SimulationResult />} />
      </Routes>
    </HashRouter>
  );
};

export default Navigation;