import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Expense from "./Expense";
import SelectCompany from "./SelectCompany";
import SimulationResult from "./SimulationResult";
import Home from "./Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/SelectCompany" element={<SelectCompany />} />
        <Route path="/simulation_result" element={<SimulationResult />} />
      </Routes>
    </Router>
  );
};

export default App;
