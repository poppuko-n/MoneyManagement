import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SelectCompany = () => {
  // 銘柄情報のリストを管理するステート
  const [companies, setCompanies] = useState([]);
  
  // 銘柄ごとの口数を管理するステート（銘柄コードをキーにして値を格納）
  const [quantities, setQuantities] = useState({});
  
  // フィルターボタンの状態を管理（true: 選択した銘柄のみ表示, false: すべて表示）
  const [showFiltered, setShowFiltered] = useState(false);

  const navigate = useNavigate(); // useNavigateを初期化

  // コンポーネントが初めてレンダリングされたときにデータを取得
  useEffect(() => {
    axios.get("http://localhost:3000/companies/")
      .then((response) => {
        // APIから取得した銘柄情報をステートに保存
        setCompanies(response.data);
        
        // 各銘柄の初期口数を0に設定
        const initialQuantities = response.data.reduce((acc, company) => {
          acc[company.code] = 0;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      });
  }, []);

  // 口数を増減させる関数
  const handleQuantityChange = (code, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [code]: Math.max(prevQuantities[code] + change, 0), // 最小値は0
    }));
  };

  // 特定の銘柄の口数をリセットする関数
  const resetQuantity = (code) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [code]: 0, // 特定の銘柄の口数を0にリセット
    }));
  };

  // 合計購入金額を計算する関数
  const calculateTotalCost = () => {
    return companies.reduce((total, company) => {
      const quantity = quantities[company.code]; 
      return total + company.latest_price * quantity; 
    }, 0);
  };

  // フィルターボタンの状態を切り替える関数
  const toggleShowFiltered = () => {
    setShowFiltered((prev) => !prev);
  };


  // Railsサーバーにデータを送信する関数
  const sendQuantitiesToServer = () => {
    const selectedCompanies = companies
      .filter((company) => quantities[company.code] > 0)
      .map((company) => ({
        code: company.code,
        name: company.name,
        price: company.latest_price,
        quantity: quantities[company.code],
      }));
  
    axios.post("http://localhost:3000/simulations", { data: selectedCompanies })
      .then((response) => {
        navigate("/simulation_result", { state: { results: response.data.results } }); 

      })
      .catch((error) => {
        console.error("データ送信エラー:", error);
        alert("データの送信または受信に失敗しました。");
      });
  };
  

  // 表示する銘柄をフィルタリングする
  const filteredCompanies = showFiltered
    ? companies.filter((company) => quantities[company.code] > 0) 
    : companies;

  const [filtername, setFilterName] = useState("");

  return (
    <div>
      <h1>銘柄選択</h1>
      <h2>合計購入金額: {calculateTotalCost()} 円</h2>

      {/* 銘柄検索 */}
      <div>
        <label htmlFor="123">銘柄検索</label>
        <input 
        placeholder="銘柄コード、名前で検索"
        type="text" 
        id="123"
        value={filtername}
        onChange={ (e) => {setFilterName(e.target.value.trim())} } />
      </div>

      {/* フィルターボタン */}
      <button onClick={toggleShowFiltered}>
        {showFiltered ? "すべての銘柄を表示" : "選択した銘柄のみ表示"}
      </button>
      
      {/* JSON送信ボタン */}
      <button onClick={sendQuantitiesToServer}>シミュレーション</button>

      <table>
        <thead>
          <tr>
            <th>銘柄コード</th>
            <th>銘柄名</th>
            <th>業種</th>
            <th>株価</th>
            <th>口数</th>
            <th>合計金額</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
  {filteredCompanies
    .filter((company) => {
      const normalizedFilter = filtername.toLowerCase();
      const isNameMatch = company.name.toLowerCase().includes(normalizedFilter);
      const isCodeMatch = company.code.toString().includes(normalizedFilter);
      return isNameMatch || isCodeMatch;
    })
    .map((company) => (
      <tr key={company.code}>
        {/* 銘柄情報 */}
        <td>{company.code}</td>
        <td>{company.name}</td>
        <td>{company.sector_name}</td>
        <td>{company.latest_price} 円</td>
        
        {/* 銘柄の口数とその合計金額 */}
        <td>
  {/* 直接入力できるフィールド */}
  <input
    type="number"
    placeholder="0"
    value={quantities[company.code] || ""} // 入力値が0でも空文字を扱えるようにする
    onChange={(e) => {
      const value = e.target.value; // 入力値を取得
      if (value === "") {
        // 入力が空文字の場合はステートを0に設定
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [company.code]: 0,
        }));
      } else {
        const numericValue = Math.max(parseInt(value, 10) || 0, 0); // 数値に変換し、0未満を防ぐ
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [company.code]: numericValue,
        }));
      }
    }}
    style={{ width: "60px", textAlign: "right" }} // 見た目を調整
  />
</td>

        <td>
          <button onClick={() => handleQuantityChange(company.code, 1)}>+</button>
          <button onClick={() => handleQuantityChange(company.code, -1)}>-</button>
          <button onClick={() => resetQuantity(company.code)}>リセット</button>
        </td>
        <td>{quantities[company.code] * company.latest_price} 円</td>
        
        {/* 口数の増減およびリセットボタン */}
      </tr>
    ))}
</tbody>

      </table>
    </div>
  );
};

export default SelectCompany;