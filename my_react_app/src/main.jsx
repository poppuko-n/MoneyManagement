import { StrictMode } from "react";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";
import LoginForm from "./LoginForm.jsx";
import SignUp from "./SignUp.jsx";
import Modal from "./Modal.jsx";

const AppContainer = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <StrictMode>
      <div className="flex flex-col min-h-screen">
        <Header
          setIsLogin={setIsLogin}
          setIsSignUp={setIsSignUp}
        />

        {isLogin && (
          <Modal onClose={() => setIsLogin(false)}>
            <LoginForm />
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
  );
};

createRoot(document.getElementById("root")).render(<AppContainer />);
