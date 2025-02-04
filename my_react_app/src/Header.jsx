import logoImage from "./assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <img src={logoImage}  alt="Logo" className="h-10" />
          <a href="/"className="ml-2 text-xl font-bold text-gray-800">MoneyManagement</a>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#about" className="text-gray-600 hover:text-green-500">ログイン</a>
          <a href="#about" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">新規会員登録</a>
        </div>
      </div>
    </header>
  );
};

export default Header;