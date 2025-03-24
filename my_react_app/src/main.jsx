import { StrictMode } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/Authcontext.jsx"
import "./index.css";
import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Modal from "./Modal.jsx";

const AppContainer = () => {

  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <AuthProvider>
      <StrictMode>
        <div className="flex flex-col min-h-screen">
          <Header
            setIsSignIN={setIsSignIn}
            setIsSignUp={setIsSignUp}
          />

          {isSignIn && (
            <Modal onClose={() => setIsSignIn(false)}>
              <SignIn 
                onBack = { () => setIsSignIn(false)}
              />
            </Modal>
          )}
          {isSignUp && (
            <Modal onClose={() => setIsSignUp(false)}>
              <SignUp 
                onBack = { ()=> setIsSignUp(false)}
              />
            </Modal>
          )}

          <Navigation />

        </div>
      </StrictMode>
    </AuthProvider>
  );
};

createRoot(document.getElementById("root")).render(<AppContainer />);
