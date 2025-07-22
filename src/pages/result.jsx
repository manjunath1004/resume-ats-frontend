import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Result = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('ats-result');
    if (!stored) return navigate('/upload');
    setData(JSON.parse(stored));
  }, []);

  if (!data) return <div className="p-10 text-center text-white">Loading your report...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 p-6 md:p-10 text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-blue-300 text-gray-800"
      >
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">📊 ATS Resume Report</h2>

        {/* Basic Info */}
        <div className="space-y-2">
          <p><strong>👤 Name:</strong> {data.name}</p>
          <p><strong>🎓 Education:</strong> {data.education}</p>
          <p><strong>💼 Experience:</strong> {data.experience}</p>
          <p><strong>🧠 Skills:</strong> {data.skills.length > 0 ? data.skills.join(', ') : 'None Detected'}</p>
        </div>

        {/* Score */}
        <div className="mt-6 bg-blue-100 p-4 rounded-xl text-center">
          <p className="text-xl font-semibold text-blue-800">
            ✅ ATS Score: <span className="text-3xl">{data.ats_score}%</span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Skills Match: {data.ats_score_breakdown.skill_score}% | Sections Covered: {data.ats_score_breakdown.section_score}%
          </p>
        </div>

        {/* Suggestions */}
        {data.suggestions?.length > 0 && (
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <h3 className="text-yellow-700 font-semibold mb-2">📌 Suggestions to Improve:</h3>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              {data.suggestions.map((sug, idx) => (
                <li key={idx}>{sug}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Resume Link */}
        <div className="mt-6 text-center">
          <a
            href={data.file_url}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
          >
            📄 View Uploaded Resume
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Result;
