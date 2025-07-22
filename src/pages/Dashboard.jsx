import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Job Finder</h1>
      <p className="text-gray-600 mb-8">Choose what you'd like to do:</p>
      <div className="flex flex-col space-y-4">
        <Link
          to="/upload"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 text-center"
        >
          Know Your ATS Score
        </Link>
        <Link
          to="/upload"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 text-center"
        >
          Find Jobs Based on Resume
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
