import { useState } from "react";
import Home from "./Home";
import Expense from "./Expense";
import Simulation from "./Simulation";
import SimulationResult from "./SimulationResult";
import Learning from "./Learning";

const Navigation = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const navItems = [
    { label: "サービス", page: "home" },
    { label: "家計簿", page: "expense" },
    { label: "シミュレーション", page: "select" },
    { label: "学習コンテンツ", page: "learning" },
  ];

  return (
    <div>
      {/* ナビゲーションバー */}
      <nav className="bg-green-600 py-4">
        <div className="container mx-auto flex justify-around items-center">
          {navItems.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-5 py-2 rounded-md font-semibold transition duration-200 ${
                currentPage === page
                  ? "bg-white text-green-600 shadow-md"
                  : "text-white hover:bg-green-500 hover:bg-opacity-30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      {/* 各ページ表示 */}
      {currentPage === "home" && <Home />}
      {currentPage === "expense" && <Expense />}
      {currentPage === "select" && (
        <Simulation setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "result" && (
        <SimulationResult onBack={() => setCurrentPage("select")} />
      )}
      {currentPage === "learning" && <Learning />}
    </div>
  );
};

export default Navigation;
