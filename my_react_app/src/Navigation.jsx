import { HashRouter, Route, Routes, NavLink } from 'react-router-dom';
import Home from "./Home";
import Expense from "./Expense";
import SelectCompany from "./SelectCompany";
import SimulationResult from "./SimulationResult";
import Learning from "./Learning";

const Navigation = () => {

  return (
    <HashRouter>
      <div className="bg-green-600 py-4">
        <div className="container mx-auto flex justify-around items-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-5 py-2 rounded-md font-semibold transition duration-200 ${
                isActive
                  ? 'bg-white text-green-600 shadow-md'
                  : 'text-white hover:bg-green-500 hover:bg-opacity-30'
              }`
            }
          >
            サービス
          </NavLink>
          <NavLink
            to="/expense"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md font-semibold transition duration-200 ${
                isActive
                  ? 'bg-white text-green-600 shadow-md'
                  : 'text-white hover:bg-green-500 hover:bg-opacity-30'
              }`
            }
          >
            家計簿
          </NavLink>
          <NavLink
            to="/selectcompany"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md font-semibold transition duration-200 ${
                isActive
                  ? 'bg-white text-green-600 shadow-md'
                  : 'text-white hover:bg-green-500 hover:bg-opacity-30'
              }`
            }
          >
            シミュレーション
          </NavLink>
          <NavLink
            to="/learning"
            className={({ isActive }) =>
              `px-5 py-2 rounded-md font-semibold transition duration-200 ${
                isActive
                  ? 'bg-white text-green-600 shadow-md'
                  : 'text-white hover:bg-green-500 hover:bg-opacity-30'
              }`
            }
          >
            学習コンテンツ
          </NavLink>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/selectcompany" element={<SelectCompany />} />
        <Route path="/simulation_result" element={<SimulationResult />} />
        <Route path="/learning" element={<Learning />} />
      </Routes>
    </HashRouter>
  );
};

export default Navigation;
