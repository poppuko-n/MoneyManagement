import homeImage from "./assets/home.png";
import step1 from "./assets/step1.png";
import step2 from "./assets/step2.png";
import step3 from "./assets/step3.png";
import service1 from "./assets/service1.png";
import service2 from "./assets/service2.png";
import service3 from "./assets/service3.png";
import service4 from "./assets/service4.png";
import checkbox from "./assets/checkbox.png";

const Home = () => {
  return (
    <>
      <div className="relative flex items-center justify-center mb-20">
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

      {/* セクション１ */}
      <div className="mt-4 px-10 mb-40">

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

      {/* セクション２ */}
      <div className="mt-4 px-10 mb-40">

        <h2 className="text-3xl font-bold text-center mb-3">こんな人におすすめです</h2>
        <div className="w-40 h-[2px] bg-red-400 mx-auto mb-10"></div>

        <ul className="grid grid-cols-2 md:grid-cols-2 gap-y-12 gap-x-10 max-w-[80%] mx-auto">
          <li className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            投資を始めたいけど、知識がない
          </li>
          <li className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            将来のために資産運用を始めたい
          </li>
          <li className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            初心者でも手軽に投資のシミュレーションをしたい
          </li>
          <li className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            リスクを抑えた運用を学びたい
          </li>
          <li className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            家計を見直して余剰資金を作りたい
          </li>
          <li className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            長期的な資産形成に興味がある
          </li>
        </ul>
      </div>

      {/* セクション３ */}
      <div className="mt-4 px-10 mb-40">

        <h2 className="text-3xl font-bold text-center mb-3">本サービスで得られるもの</h2>
        <div className="w-40 h-[2px] bg-red-400 mx-auto mb-10"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2">

          <div className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h4 className="text-2xl font-semibold mb-6">資金の「見える化」</h4>
            <p className="text-gray-700 text-base mb-6">
              収入と支出の全体像が把握でき、投資の余裕資金を把握できます。
            </p>
            <img src={service1} alt="資金の見える化" className="mx-auto w-52 h-52 object-contain" />
          </div>

          <div className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h4 className="text-2xl font-semibold mb-6">貯金計画</h4>
            <p className="text-gray-700 text-base mb-6">
              家計簿から支出の詳細が分かるので、具体的な節約目標が設定可能です。
            </p>
            <img src={service2} alt="貯金計画" className="mx-auto w-52 h-52 object-contain" />
          </div>

          <div className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h4 className="text-2xl font-semibold mb-6">リアルな投資</h4>
            <p className="text-gray-700 text-base mb-6">
              実際の株価を利用しているため、支出状況に応じたリアルなシミュレーションが可能です。
            </p>
            <img src={service3} alt="リアルなシミュレーション" className="mx-auto w-52 h-52 object-contain" />
          </div>

          <div className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h4 className="text-2xl font-semibold mb-6">リスク管理</h4>
            <p className="text-gray-700 text-base mb-6">
              シミュレーションは柔軟な設定が可能で、「長期」「積立」「分散」の効果を確認できます。
            </p>
            <img src={service4} alt="損益額の確認" className="mx-auto w-52 h-52 object-contain" />
          </div>
        </div>
      </div>

      <footer className="bg-green-700 text-white py-6">
        <div className="max-w-[80%] mx-auto text-center">
          <p className="text-sm mb-2">
            © {new Date().getFullYear()} MoneyManegemtn. All rights reserved.
          </p>
          <p className="text-sm">
            <a href="/privacy" className="text-green-300 hover:text-green-100 hover:underline">Privacy Policy</a> | 
            <a href="/terms" className="text-green-300 hover:text-green-100 hover:underline ml-2">Terms of Service</a>
          </p>
        </div>
      </footer>

    </>
  );
}

export default Home;
