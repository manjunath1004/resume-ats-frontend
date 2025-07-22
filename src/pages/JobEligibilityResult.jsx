import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobEligibilityResult = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('ats-result');
    if (!stored) return navigate('/upload');

    try {
      const parsed = JSON.parse(stored);
      setData(parsed);
    } catch (err) {
      console.error('Invalid JSON in ats-result');
      navigate('/upload');
    }
  }, []);

  if (!data) return <div className="p-10 text-center text-white">Loading...</div>;

  const skills = data.skills.map((skill) => skill.toLowerCase());

  const has = (skill) => skills.includes(skill);
  const hasAll = (...arr) => arr.every((s) => has(s));
  const hasSome = (...arr) => arr.some((s) => has(s));

  const suggestedRoles = [];

  // 💻 Full Stack Developer
  if (hasAll('html', 'css', 'javascript') && hasSome('flask', 'mongodb', 'python')) {
    suggestedRoles.push('Full Stack Developer');
  }

  // 🎯 Frontend Developer
  if (hasAll('html', 'css', 'javascript')) {
    suggestedRoles.push('Frontend Developer');
  }

  // 🧠 Backend Developer
  if (hasSome('python', 'flask') && has('mongodb')) {
    suggestedRoles.push('Backend Developer');
  }

  // 🎨 UI/UX Designer
  if (hasSome('figma', 'wireframing', 'ux', 'ui', 'visual design')) {
    suggestedRoles.push('UI/UX Designer');
  }

  // 📣 Digital Marketing Executive
  if (hasSome('digital marketing', 'social media', 'brand development', 'project management')) {
    suggestedRoles.push('Digital Marketing Executive');
  }

  // 🐣 If no strong matches
  if (suggestedRoles.length === 0) {
    suggestedRoles.push('Intern / Entry-level Trainee');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 text-white p-10">
      <div className="max-w-3xl mx-auto bg-white text-gray-800 p-8 rounded shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">💼 Job Eligibility Result</h2>

        <div className="mb-4">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>ATS Score:</strong> {data.ats_score}%</p>
          <p><strong>Skills Detected:</strong> {data.skills.join(', ') || 'None'}</p>
        </div>

        <hr className="my-4" />

        <h3 className="text-xl font-semibold mb-2 text-blue-700">✅ Suggested Job Roles:</h3>
        <ul className="list-disc list-inside space-y-1 text-blue-800 font-medium">
          {suggestedRoles.map((role, idx) => (
            <li key={idx}>{role}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobEligibilityResult;
