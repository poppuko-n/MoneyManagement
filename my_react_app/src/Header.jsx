import logoImage from "./assets/logo.png";
import { useAuth } from "./contexts/Authcontext.jsx"

const Header = ({ setIsSignIn, setIsSignUp }) => {

  const { logout, isLoggedIn } = useAuth();
  
  return (
    <header>
      <div className="container mx-auto flex justify-between py-4 px-6">
        <div className="flex items-center">
          <img src={logoImage} alt="Logo" className="h-10 mr-2" />
          <a href="/" className="ml-2 text-2xl font-bold">
            <span>Money</span>
            <span className="text-green-600">Management</span>
          </a>
        </div>

        {isLoggedIn ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={logout}
          >
            ログアウト
          </button>
        ) : (
          <div className="flex items-center">
            <button
              className="bg-green-500 text-white px-4 py-2 mr-4 rounded hover:bg-green-600"
              onClick={() => setIsSignIn(true)}
            >
              ログイン
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setIsSignUp(true)}
            >
              会員登録
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
