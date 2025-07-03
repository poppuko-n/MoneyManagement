import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/Authcontext.jsx"
import AppContainer from "./main.jsx";
import "./index.css";

const AppRoot = () => {
  return(
  <AuthProvider>
    <AppContainer />
  </AuthProvider>
  );
};

createRoot(document.getElementById("root")).render(<AppRoot />);