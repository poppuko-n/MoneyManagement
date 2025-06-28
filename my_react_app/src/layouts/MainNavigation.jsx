import { useState } from "react";
import LandingPage from "../pages/LandingPage";
import ExpenseManagementPage from "../features/expense/ExpenseManagementPage";
import InvestmentSimulationPage from "../features/simulation/InvestmentSimulationPage";
import LearningContentPage from "../features/learning/LearningContentPage";

const MainNavigation = () => {
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

      {currentPage === "home" && <LandingPage />}
      {currentPage === "expense" && <ExpenseManagementPage />}
      {currentPage === "simulation" && <InvestmentSimulationPage />}
      {currentPage === "learning" && <LearningContentPage />}
    </div>
  );
};

export default MainNavigation;
