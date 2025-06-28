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
        <Modal>
          <SignIn onBack = { () => setIsSignIn(false)}/>
        </Modal>
      )}
      {isSignUp && (
        <Modal>
          <SignUp onBack = { ()=> setIsSignUp(false)}/>
        </Modal>
      )}
      {isLoggedIn ? (
        <Navigation />
      ) : (
        <>
          <div className="bg-green-100 text-green-900 text-center p-4 mb-4 shadow">
            家計管理と投資体験を、今ここから。
            <button
              onClick={() => setIsSignIn(true)}
              className="font-bold underline text-green-800 hover:text-green-600 mx-1"
            >
              ログイン
            </button>
            または
            <button
              onClick={() => setIsSignUp(true)}
              className="font-bold underline text-green-800 hover:text-green-600 mx-1"
            >
              登録
            </button>
            して始めましょう。
          </div>
          <Home setIsSignUp={setIsSignUp} />
        </>
      )}
    </div>
  );
};

export default AppContainer;
