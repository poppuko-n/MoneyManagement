import ReactMarkdown from 'react-markdown';

const SimulationInsight = ({ ai_analysis }) => {
  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">AIによる投資診断</h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        {ai_analysis ? (
          <div className="prose max-w-none text-gray-800">
            <ReactMarkdown>{ai_analysis}</ReactMarkdown>
          </div>
        ) : (
          <p>AI分析中...</p>
        )}
        <p className="italic text-sm text-gray-500">
          ※この診断はAIによるサンプルコメントです。実際の投資判断はご自身の責任でお願いします。
        </p>
      </div>
    </div>
  );
};

export default SimulationInsight;
