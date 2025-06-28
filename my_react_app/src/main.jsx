import { useState } from "react";
import { useAuth } from "./contexts/Authcontext.jsx"
import Header from "./layouts/Header.jsx";
import Navigation from "./layouts/Navigation.jsx";
import SignIn from "./auth/SignIn.jsx";
import SignUp from "./auth/SignUp.jsx";
import Modal from "./components/Modal.jsx";
import Home from "./pages/Home";

const AppContainer = () => {
  const { isLoggedIn } = useAuth();
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        setIsSignIn={setIsSignIn}
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
