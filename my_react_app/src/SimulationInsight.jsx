import { useEffect, useState } from 'react';
import OpenAiApi from './lib/OpenAiApi';
import ReactMarkdown from 'react-markdown';

const SimulationInsight = ({ simulation_results }) => {
  const [result, setResult] = useState('');
  const [isLoading, setIsloading] = useState(false);

  const createPrompt = (simulation_results) => {
    const readable = simulation_results.map((item) => {
      return `銘柄: ${item.name}（${item.code}）
      現在価格: ${item.current_price}円 / 保有数量: ${item.quantity}
      【通常運用】
      ・3ヶ月後: ${item.simulation["3_months_ago"]}円
      ・6ヶ月後: ${item.simulation["6_months_ago"]}円
      ・9ヶ月後: ${item.simulation["9_months_ago"]}円
      ・1年後: ${item.simulation["1_year_ago"]}円
      【積立運用】（毎月の購入額: ${item.current_price * item.quantity}円）
      ・3ヶ月後: ${item.accumulation_simulation["3_months_ago"]}円（総購入額: ${item.current_price * item.quantity * 3}円）
      ・6ヶ月後: ${item.accumulation_simulation["6_months_ago"]}円（総購入額: ${item.current_price * item.quantity * 6}円）
      ・9ヶ月後: ${item.accumulation_simulation["9_months_ago"]}円（総購入額: ${item.current_price * item.quantity * 9}円）
      ・1年後: ${item.accumulation_simulation["1_year_ago"]}円（総購入額: ${item.current_price * item.quantity * 12}円）`;
        }).join("\n-------------------------\n");

        return `
        あなたは投資初心者向けのアドバイザーです。
        以下のシミュレーション結果を読み取り、初心者でも理解できるように、簡潔にアドバイスしてください。
        出力は Markdown 形式で記述してください。

        ### 指示内容
        - 各業種の傾向を簡潔に分析してください。
        - 初心者向けに、今後の投資方針をわかりやすく提案してください。
        - 出力は「###」による見出しや箇条書きを活用し、視認性の高い構成にしてください。
        - 積立運用では「現在価格 × 保有数量」を毎月購入したと仮定し、月ごとの平均株価の成長率を反映した評価額となっています。
          したがって、「現在価格 × 保有数量 × 月数」とシミュレーション結果の金額との差が損益額です。
          この点も踏まえた上で、適切な解説を行ってください。

        ### シミュレーションデータ
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

    setIsloading(true);
    OpenAiApi.completion(messages, apiKey)
      .then((response) => {
        setResult(response);
        setIsloading(false);
      })
      .catch((error) => {
        console.error("AI診断エラー:", error);
        setResult("診断の取得に失敗しました。時間をおいて再度お試しください。");
        setIsloading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">AIによる投資診断</h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        {isLoading ? (
          <p>AI分析中...</p>
        ) : (
          <div className="prose max-w-none text-gray-800">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
        <p className="italic text-sm text-gray-500">
          ※この診断はAIによるサンプルコメントです。実際の投資判断はご自身の責任でお願いします。
        </p>
      </div>
    </div>
  );
};

export default SimulationInsight;
