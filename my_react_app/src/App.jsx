import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectCompany from "./SelectCompany";
import SimulationResult from "./SimulationResult";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectCompany />} />
        <Route path="/simulation_result" element={<SimulationResult />} />
      </Routes>
    </Router>
  );
};

export default App;
