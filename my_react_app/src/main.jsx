import { useState } from "react";
import { useAuth } from "./contexts/Authcontext.jsx"
import AppHeader from "./layouts/AppHeader.jsx";
import MainNavigation from "./layouts/MainNavigation.jsx";
import LoginForm from "./auth/LoginForm.jsx";
import RegisterForm from "./auth/RegisterForm.jsx";
import Modal from "./components/Modal.jsx";
import LandingPage from "./pages/LandingPage";

const AppContainer = () => {
  const { isLoggedIn } = useAuth();
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader
        setIsSignIn={setIsSignIn}
        setIsSignUp={setIsSignUp}
      />

      {isSignIn && (
        <Modal>
          <LoginForm onBack = { () => setIsSignIn(false)}/>
        </Modal>
      )}
      {isSignUp && (
        <Modal>
          <RegisterForm onBack = { ()=> setIsSignUp(false)}/>
        </Modal>
      )}
      {isLoggedIn ? (
        <MainNavigation />
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
          <LandingPage setIsSignUp={setIsSignUp} />
        </>
      )}
    </div>
  );
};

export default AppContainer;
