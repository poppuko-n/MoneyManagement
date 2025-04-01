import { useState } from "react";
import { useAuth } from "./contexts/Authcontext.jsx"
import Header from "./Header.jsx";
import Navigation from "./Navigation.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import Modal from "./Modal.jsx";
import Home from "./Home";

const AppContainer = () => {
  const { isLoggedIn } = useAuth();
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
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
      { isLoggedIn ? ( <Navigation /> ) : ( <Home /> )}
    </div>
  );
};

export default AppContainer;
