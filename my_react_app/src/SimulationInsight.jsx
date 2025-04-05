import { useEffect, useState } from 'react';
import OpenAiApi from './lib/OpenAiApi';

const SimulationInsight = ({ simulation_results }) => {
  const [result, setResult] = useState('');

  const createPrompt = (simulation_results) => {
    const readable = simulation_results.map((item) => {
      return `銘柄: ${item.name}（${item.code}）
      現在価格: ${item.current_price}円 / 保有数量: ${item.quantity}
      【通常運用】
      ・3ヶ月後: ${item.simulation["3_months_ago"]}円
      ・6ヶ月後: ${item.simulation["6_months_ago"]}円
      ・9ヶ月後: ${item.simulation["9_months_ago"]}円
      ・1年後: ${item.simulation["1_year_ago"]}円
      【積立運用】
      ・3ヶ月後: ${item.accumulation_simulation["3_months_ago"]}円
      ・6ヶ月後: ${item.accumulation_simulation["6_months_ago"]}円
      ・9ヶ月後: ${item.accumulation_simulation["9_months_ago"]}円
      ・1年後: ${item.accumulation_simulation["1_year_ago"]}円`;
        }).join("\n-------------------------\n");

        return `
      あなたは初心者向けの投資アドバイザーです。以下のシミュレーション結果をもとに、

      ・業種毎の傾向分析
      ・今後の投資戦略に関するアドバイス  

      を投資未経験者にもわかるように、やさしく丁寧に説明してください。

      【シミュレーション結果】
      ${readable}
        `.trim();
    };

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const messages = [
      {
        role: 'user',
        content: createPrompt(simulation_results),
      },
    ];

    OpenAiApi.completion(messages, apiKey)
      .then((response) => {
        setResult(response);
      })
      .catch((error) => {
        console.error("AI診断エラー:", error);
        setResult("診断の取得に失敗しました。時間をおいて再度お試しください。");
      });
  }, []);

  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">AIによる投資診断</h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        <p>{result}</p>
        <p className="italic text-sm text-gray-500">
          ※この診断はAIによるサンプルコメントです。実際の投資判断はご自身の責任でお願いします。
        </p>
      </div>
    </div>
  );
};

export default SimulationInsight;
