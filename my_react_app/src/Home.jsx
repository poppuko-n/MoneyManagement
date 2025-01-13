import homeImage from "./assets/home.png";
import step1 from "./assets/step1.png";
import step2 from "./assets/step2.png";
import step3 from "./assets/step3.png";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative flex items-center justify-center">
        <img 
          src={homeImage} 
          alt="Home" 
          className="w-[90%] h-auto mt-1" 
        />
        <div className="absolute text-center px-5">
          <h1 className="text-black text-4xl font-serif tracking-wide leading-relaxed border-b border-gray-400 pb-2 inline-block">
            誰でもできるお金の管理、<br />
            <span className="indent-40 block">投資で未来をもっと自由に</span>
          </h1>
        </div>
      </div>

      <div className="mt-10 px-10 mb-12">
      <h2 className="text-3xl font-bold text-center mb-3">簡単3ステップ</h2>
      <div className="w-40 h-[2px] bg-red-400 mx-auto mb-4"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          <div className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h3 className="text-3xl font-extrabold mb-4 text-blue-600">STEP 1</h3>
            <h4 className="text-2xl font-semibold mb-4">家計簿</h4>
            <p className="text-gray-700 text-base mb-8">
              毎月の収支額を把握するために、家計簿機能を提供。自分の資金を把握しましょう。
            </p>
            <img src={step1} alt="STEP 1" className="mx-auto w-52 h-52 object-contain" />
          </div>

          <div className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h3 className="text-3xl font-extrabold mb-4 text-blue-600">STEP 2</h3>
            <h4 className="text-2xl font-semibold mb-4">銘柄選択</h4>
            <p className="text-gray-700 text-base mb-8">
              実際の銘柄を活用してシミュレーション。自分の余裕資金内で銘柄を選択してみましょう。
            </p>
            <img src={step2} alt="STEP 2" className="mx-auto w-52 h-52 object-contain" />
          </div>

          <div className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h3 className="text-3xl font-extrabold mb-4 text-blue-600">STEP 3</h3>
            <h4 className="text-2xl font-semibold mb-4">シミュレーション</h4>
            <p className="text-gray-700 text-base mb-8">
              運用期間、積立期間に応じた損益額が表示。今後の投資戦略を練りましょう。
            </p>
            <img src={step3} alt="STEP 3" className="mx-auto w-52 h-52  object-contain" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
