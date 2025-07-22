import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ✅ Page Components
import Landing from './pages/landing';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Upload from './pages/upload';
import Result from './pages/result';
import JobEligibilityUpload from './pages/JobEligibilityUpload';
import JobEligibilityResult from './pages/JobEligibilityResult';  // Make sure the file name and casing match exactly

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/result" element={<Result />} />
        <Route path="/job-eligibility-upload" element={<JobEligibilityUpload />} />
        <Route path="/job-eligibility-result" element={<JobEligibilityResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
