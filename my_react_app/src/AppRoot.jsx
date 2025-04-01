import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { AuthProvider } from "./contexts/Authcontext.jsx"
import AppContainer from "./main.jsx";
import "./index.css";

const AppRoot = () => {
  return(
  <AuthProvider>
    <StrictMode>
      <AppContainer />
    </StrictMode>
  </AuthProvider>
  );
};

createRoot(document.getElementById("root")).render(<AppRoot />);