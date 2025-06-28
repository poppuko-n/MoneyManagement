import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const SimulationInsight = ({ aiAnalysis }) => {
  return (
    <div className="bg-white rounded shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">AIによる投資診断</h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        {!aiAnalysis ? (
          <motion.p
            className="text-lg font-bold text-center py-20"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            AI分析中です…しばらくお待ちください
          </motion.p>
        ) : (
          <div className="prose max-w-none text-gray-800">
            <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
            <p className="italic text-sm text-gray-500">
              ※この診断はAIによるサンプルコメントです。実際の投資判断はご自身の責任でお願いします。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationInsight;
