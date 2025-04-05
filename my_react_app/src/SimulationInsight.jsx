const SimulationInsight = () => {
  return (
    <div className="bg-white rounded shadow p-6 mb-6">

      <h2 className="text-xl font-semibold mb-4 border-b pb-2">AIによる投資診断</h2>

      <div className="text-gray-700 leading-relaxed space-y-4">
        <p>
          現在のシミュレーション結果に基づくと、リスクとリターンのバランスはおおむね良好です。
          ただし、一部の銘柄に偏りがあるため、分散投資を検討することをおすすめします。
        </p>
        <p>
          積立シミュレーションでは、時間をかけて着実に評価額が上昇しており、長期的な視点での運用に適しています。
        </p>
        <p className="italic text-sm text-gray-500">
          ※この診断はAIによるサンプルコメントです。実際の投資判断はご自身の責任でお願いします。
        </p>
      </div>
    </div>
  );
};

export default SimulationInsight;
