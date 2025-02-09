import logoImage from "./assets/logo.png";

const Header = ({ setIsLogin, setIsSignUp }) => {
  return (
    <header className="bg-white mb-6">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <img src={logoImage} alt="Logo" className="h-10 mr-2" />
          <a href="/" className="ml-2 text-2xl font-bold text-gray-800 tracking-wide">
            <span >Money</span>
            <span className="text-green-600">Management</span>
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="text-gray-600 hover:text-green-500"
            onClick={() => {
              setIsLogin(true);
            }}
          >
            ログイン
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => {
              setIsSignUp(true);
            }}
          >
            新規会員登録
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
