import homeImage from "../assets/home.png";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import service4 from "../assets/service4.png";
import checkbox from "../assets/checkbox.png";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/Authcontext.jsx"

const LandingPage = ({setIsSignUp}) => {
  const {isLoggedIn} = useAuth();

  const steps = [
    {
      step: "STEP 1",
      title: "資金を把握",
      text: "家計簿機能で毎月の収支を整理し、投資資金を明確にしましょう。",
      img: step1
    },
    {
      step: "STEP 2",
      title: "銘柄を選ぶ",
      text: "興味のある銘柄を選び、実際の株価データを使ってシミュレーションを始めます。",
      img: step2
    },
    {
      step: "STEP 3",
      title: "結果を分析",
      text: "損益シミュレーション結果とAI分析を参考に、今後の投資戦略を考えましょう。",
      img: step3
    }
  ];

  const recommendations = [
    "投資を始めたいけど、知識がない",
    "将来のために資産運用を始めたい",
    "初心者でも手軽に投資のシミュレーションをしたい",
    "リスクを抑えた運用を学びたい",
    "家計を見直して余剰資金を作りたい",
    "長期的な資産形成に興味がある",
  ];

  const services = [
    {
      title: "資金の「見える化」",
      text: "収入と支出の全体像が把握でき、投資の余裕資金を把握できます。",
      img: service1
    },
    {
      title: "貯金計画",
      text: "家計簿から支出の詳細が分かるので、具体的な節約目標が設定可能です。",
      img: service2
    },
    {
      title: "リアルな投資体験",
      text: "実際の株価を利用しているため、リアルなシミュレーションが可能です。",
      img: service3
    },
    {
      title: "AI分析",
      text: "AIがシミュレーション結果を分析。将来を見据えた運用プランをサポートします。",
      img: service4
    }
  ];

  return (
    <>
      <div className="flex items-center justify-center mb-40">
        <motion.img 
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:2.5 }}
          src={homeImage} 
          alt="Home" 
          className="w-full" 
        />
        <div className="absolute text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            className="text-4xl font-serif tracking-wide leading-relaxed"
          >
            誰でもできるお金の管理<br />
            <span className="indent-40">投資で未来をもっと自由に</span>
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2 }}
            style={{originX: 0}}
            className="h-[1.5px] bg-gray-400 mt-2"
          />

          {!isLoggedIn && 
            <motion.button
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            onClick={() => setIsSignUp(true)}
            className="mt-10 bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-5 py-3"
          >
            さっそくはじめる
            </motion.button>
          }
        </div>
      </div>

      <div className="mb-40">
        <p className="text-3xl font-bold text-center mb-10">簡単3ステップ</p>
        <div className="flex justify-around">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "linear",
                delay: i * 0.3
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 text-center shadow p-8 max-w-[30%]"
            >
              <p className="text-3xl mb-4 text-blue-500">{s.step}</p>
              <p className="text-2xl font-bold mb-4">{s.title}</p>
              <p className="mb-8">{s.text}</p>
              <img src={s.img} alt={s.step} className="mx-auto w-52 object-contain" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-40">
        <h2 className="text-3xl font-bold text-center mb-10">こんな人におすすめです</h2>
        <ul className="grid grid-cols-2 gap-y-12 gap-x-10 max-w-[80%] mx-auto">
          {recommendations.map((text, i) => (
            <motion.li
              key={text}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: Math.floor(i / 2) * 0.2 }}
              className="flex items-center text-xl"
            >
              <img src={checkbox} alt="checkbox" className="w-8 mr-4" />
              {text}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mb-20">
        <p className="text-3xl font-bold text-center mb-10">本サービスで得られるもの</p>
        <div className="flex justify-around">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 200 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                ease: "linear",
                delay: i * 0.3
              }}
              viewport={{ once: true }}
              className="flex-1 text-center shadow p-8"
            >
              <p className="text-2xl font-bold mb-4">{s.title}</p>
              <p className="mb-4">{s.text}</p>
              <img src={s.img} alt={s.title} className="mx-auto w-52 object-contain" />
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="bg-green-700 text-white py-6">
        <div className="text-center">
          <p className="mb-2">© {new Date().getFullYear()} MoneyManegemtn. All rights reserved.</p>
          <a className="text-green-300 hover:text-green-100">Privacy Policy</a> | 
          <a className="text-green-300 hover:text-green-100 ml-2">Terms of Service</a>
        </div>
      </footer>
    </>
  );
}

export default LandingPage;
