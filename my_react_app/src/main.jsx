import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />
      <main className="flex-grow">
        <App />
      </main>
    </div>
  </StrictMode>
);
