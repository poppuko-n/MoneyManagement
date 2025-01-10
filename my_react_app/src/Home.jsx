import homeImage from "./assets/home.png";

const Home = () => {
  return (
    <div className="relative flex items-center justify-center">
      <img 
        src={homeImage} 
        alt="Home" 
        className="w-[67%] h-auto mt-1" 
      />
      <div className="absolute text-center px-5">
        <h1 className="text-black text-4xl font-serif tracking-wide leading-relaxed border-b border-gray-400 pb-2 inline-block">
          誰でもできるお金の管理、<br />
          <span className="indent-40 block">投資で未来をもっと自由に</span>
        </h1>
      </div>
    </div>
  );
}

export default Home;
