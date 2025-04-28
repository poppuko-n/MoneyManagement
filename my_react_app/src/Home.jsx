import homeImage from "./assets/home.png";
import step1 from "./assets/step1.png";
import step2 from "./assets/step2.png";
import step3 from "./assets/step3.png";
import service1 from "./assets/service1.png";
import service2 from "./assets/service2.png";
import service3 from "./assets/service3.png";
import service4 from "./assets/service4.png";
import checkbox from "./assets/checkbox.png";
import { motion } from "framer-motion";
import { useAuth } from "./contexts/Authcontext.jsx"

const Home = ({setIsSignUp}) => {
  const {isLoggedIn} = useAuth();
  return (
    <>
      <div className="relative flex items-center justify-center mb-40">
        <motion.img 
          initial={{ opacity:0.4 }}
          animate={{ opacity:1 }}
          transition={{ duration:2.5 }}
          src={homeImage} 
          alt="Home" 
          className="w-[90%] h-auto mt-1" 
        />
        <div className="absolute text-center px-5">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
            className="text-black text-4xl font-serif tracking-wide leading-relaxed pb-2 inline-block"
          >
            誰でもできるお金の管理、<br />
            <span className="indent-40 block">投資で未来をもっと自由に</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2 }}
            style={{originX: 0}}
            className="h-[1.5px] bg-gray-400 mx-auto mt-2"
          />

        {!isLoggedIn && 
        <motion.button
        onClick={() => setIsSignUp(true)}
        animate={{ y: [0, -30, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
          delay: 0.2,
        }}
        className="mt-20 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        さっそくはじめる
      </motion.button>
      
        }
        </div>

      </div>

      {/* セクション１ */}
      <div className="mt-4 px-10 mb-40">

        <h2 className="text-3xl font-bold text-center mb-3">簡単3ステップ</h2>
        <div className="w-40 h-[2px] bg-red-400 mx-auto mb-4"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-16">

          <motion.div 
            initial={{ opacity:0, y: 200 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease: "linear" }}
            viewport={{ once:true, amount: 0.2 }}
            className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h3 className="text-3xl font-extrabold mb-4 text-blue-600">STEP 1</h3>
            <h4 className="text-2xl font-semibold mb-4">資金を把握</h4>
            <p className="text-gray-700 text-base mb-8">
              家計簿機能で毎月の収支を整理し、投資資金を明確にしましょう。
            </p>
            <img src={step1} alt="STEP 1" className="mx-auto w-52 h-52 object-contain" />
          </motion.div>

          <motion.div 
            initial={{ opacity:0, y: 200 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease: "linear", delay:0.3 }}
            viewport={{ once:true, amount: 0.2 }}
            className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h3 className="text-3xl font-extrabold mb-4 text-blue-600">STEP 2</h3>
            <h4 className="text-2xl font-semibold mb-4">銘柄を選ぶ</h4>
            <p className="text-gray-700 text-base mb-8">
              興味のある銘柄を選び、実際の株価データを使ってシミュレーションを始めます。
            </p>
            <img src={step2} alt="STEP 2" className="mx-auto w-52 h-52 object-contain" />
          </motion.div>

          <motion.div 
            initial={{ opacity:0, y: 200 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease: "linear", delay:0.6 }}
            viewport={{ once:true, amount: 0.2 }}
            className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h3 className="text-3xl font-extrabold mb-4 text-blue-600">STEP 3</h3>
            <h4 className="text-2xl font-semibold mb-4">結果を分析</h4>
            <p className="text-gray-700 text-base mb-8">
              損益シミュレーション結果とAI分析を参考に、今後の投資戦略を考えましょう。
            </p>
            <img src={step3} alt="STEP 3" className="mx-auto w-52 h-52  object-contain" />
          </motion.div>

        </div>
      </div>

      {/* セクション２ */}
      <div className="mt-4 px-10 mb-40">

        <h2 className="text-3xl font-bold text-center mb-3">こんな人におすすめです</h2>
        <div className="w-40 h-[2px] bg-red-400 mx-auto mb-10"></div>

        <ul className="grid grid-cols-2 md:grid-cols-2 gap-y-12 gap-x-10 max-w-[80%] mx-auto">
          <motion.li
            initial={{ opacity:0, x:-100 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once: true }}
            transition={{ duration:1 }}
            className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            投資を始めたいけど、知識がない
          </motion.li>
          <motion.li
            initial={{ opacity:0, x:100 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once: true }}
            transition={{ duration:1}}
            className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            将来のために資産運用を始めたい
          </motion.li>
          <motion.li
            initial={{ opacity:0, x:-100 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once: true }}
            transition={{ duration:1, delay:0.4}}
            className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            初心者でも手軽に投資のシミュレーションをしたい
          </motion.li>
          <motion.li
            initial={{ opacity:0, x:100 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once: true }}
            transition={{ duration:1, delay:0.4 }}
            className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            リスクを抑えた運用を学びたい
          </motion.li>
          <motion.li
            initial={{ opacity:0, x:-100 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once: true }}
            transition={{ duration:1, delay:0.8}}
            className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            家計を見直して余剰資金を作りたい
          </motion.li>
          <motion.li
            initial={{ opacity:0, x:100 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once: true }}
            transition={{ duration:1, delay:0.8 }} 
            className="flex items-center text-xl font-medium">
            <img src={checkbox} alt="checkbox" className="w-8 h-8 mr-4" />
            長期的な資産形成に興味がある
          </motion.li>
        </ul>
      </div>

      {/* セクション３ */}
      <div className="mt-4 px-10 mb-40">

        <h2 className="text-3xl font-bold text-center mb-3">本サービスで得られるもの</h2>
        <div className="w-40 h-[2px] bg-red-400 mx-auto mb-10"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2">

          <motion.div 
            initial={{ opacity:0, y: 200 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease: "linear" }}
            viewport={{ once:true }}
            className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h4 className="text-2xl font-semibold mb-6">資金の「見える化」</h4>
            <p className="text-gray-700 text-base mb-6">
              収入と支出の全体像が把握でき、投資の余裕資金を把握できます。
            </p>
            <img src={service1} alt="資金の見える化" className="mx-auto w-52 h-52 object-contain" />
          </motion.div>

          <motion.div 
            initial={{ opacity:0, y: 200 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease: "linear", delay:0.3 }}
            viewport={{ once:true }}
            className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h4 className="text-2xl font-semibold mb-6">貯金計画</h4>
            <p className="text-gray-700 text-base mb-6">
              家計簿から支出の詳細が分かるので、具体的な節約目標が設定可能です。
            </p>
            <img src={service2} alt="貯金計画" className="mx-auto w-52 h-52 object-contain" />
          </motion.div>

          <motion.div 
            initial={{ opacity:0, y: 200 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease: "linear", delay:0.6 }}
            viewport={{ once:true }}
            className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h4 className="text-2xl font-semibold mb-6">リアルな投資体験</h4>
            <p className="text-gray-700 text-base mb-6">
              実際の株価を利用しているため、リアルなシミュレーションが可能です。
            </p>
            <img src={service3} alt="リアルなシミュレーション" className="mx-auto w-52 h-52 object-contain" />
          </motion.div>

          <motion.div 
            initial={{ opacity:0, y: 200 }}
            whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.5, ease: "linear", delay:0.9 }}
            viewport={{ once:true }}
            className="text-center bg-white shadow-lg rounded-xl p-8 flex-1 max-w-[30%] min-h-[450px]">
            <h4 className="text-2xl font-semibold mb-6"> AI分析</h4>
            <p className="text-gray-700 text-base mb-6">
              AIがシミュレーション結果を分析。
              将来を見据えた運用プランをサポートします。
            </p>
            <img src={service4} alt="損益額の確認" className="mx-auto w-52 h-52 object-contain" />
          </motion.div>
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
