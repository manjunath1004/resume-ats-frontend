import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const JobEligibilityUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setError('');
      setFile(acceptedFiles[0]);
    },
  });

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a PDF resume before uploading.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/api/parse-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.status === 200) {
        localStorage.setItem('ats-result', JSON.stringify(res.data));
        navigate('/job-eligibility-result');
      } else {
        setError('Failed to analyze resume.');
      }
    } catch (err) {
      console.error(err);
      setError('Backend not responding. Try again later.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Upload Resume for Job Eligibility</h1>
        <div {...getRootProps()} className="border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer bg-gray-50">
          <input {...getInputProps()} />
          <p className="text-gray-600">Click or drag your resume PDF here</p>
          {file && <p className="mt-2 text-green-600 font-semibold">{file.name}</p>}
        </div>
        {error && <p className="text-red-600 mt-3">{error}</p>}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </div>
    </div>
  );
};

export default JobEligibilityUpload;
