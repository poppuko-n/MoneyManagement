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

export default Navigation;