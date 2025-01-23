import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
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

const Navigation = () => {
  return (
    <div className="bg-green-600 py-4">
      <div className="container mx-auto flex justify-around items-center">
        <a href="/" className="text-white hover:text-green-100 px-6">サービス</a>
        <a href="/expense" className="text-white hover:text-green-100 px-6">家計簿</a>
        <a href="/SelectCompany" className="text-white hover:text-green-100 px-6">シミュレーション</a>
        <a href="#about" className="text-white hover:text-green-100 px-6">ユーザー情報</a>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />
      <main className="flex-grow">
        <App />
      </main>
    </div>
  </StrictMode>
);
