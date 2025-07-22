import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const target = new URLSearchParams(location.search).get('target'); // ?target=ats or job

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
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/api/parse-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.status === 200) {
        localStorage.setItem('ats-result', JSON.stringify(res.data));
        if (target === 'job') {
          navigate('/job-eligibility-result');
        } else {
          navigate('/result');
        }
      } else {
        setError('Failed to analyze resume. Please try again.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Server error. Please make sure your backend is running.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Upload Your Resume (PDF)</h1>

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-500 bg-gray-50 p-6 text-center rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">Drag and drop your resume here, or click to upload</p>
          {file && <p className="text-green-600 font-semibold mt-3">{file.name}</p>}
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="bg-blue-600 text-white px-6 py-2 rounded mt-6 w-full hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          {loading ? 'Uploading...' : 'Upload and Analyze'}
        </button>
      </div>
    </div>
  );
};

export default Upload;
