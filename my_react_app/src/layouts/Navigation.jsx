import { useState } from "react";
import Home from "../pages/Home";
import Expense from "../features/expense/Expense";
import Simulation from "../features/simulation/Simulation";
import SimulationResult from "../features/simulation/SimulationResult";
import Learning from "../pages/Learning";

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const navItems = [
    { label: "サービス", page: "home" },
    { label: "家計簿", page: "expense" },
    { label: "シミュレーション", page: "simulation" },
    { label: "学習コンテンツ", page: "learning" },
  ];

  return (
    <div>
      <nav className="bg-green-600 py-4">
        <div className="flex justify-around items-center">
          {navItems.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-5 py-2 rounded font-bold ${
                currentPage === page
                  ? "bg-white text-green-600"
                  : "text-white hover:bg-green-500 hover:bg-opacity-30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {currentPage === "home" && <Home />}
      {currentPage === "expense" && <Expense />}
      {currentPage === "simulation" && <Simulation />}
      {currentPage === "learning" && <Learning />}
    </div>
  );
};

export default Navigation;
