import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import HeroImage from '../assets/hero.svg';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Landing = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  // Check login session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // ✅ Secure navigation logic
  const handleProtectedNavigation = async (route) => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
      // ✅ Logged in: allow route
      navigate(route);
    } else {
      // ❌ Not logged in: trigger Google login
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Navbar />
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 mt-20 max-w-7xl mx-auto">
        {/* LEFT: Text Section */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Unlock Your <span className="text-blue-600">Career Potential</span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-md">
            Upload your resume to instantly view your ATS score and discover the jobs you're best suited for.
          </p>

          {/* ✅ GET STARTED BUTTON */}
          {!showOptions && (
            <button
              onClick={() => setShowOptions(true)}
              className="inline-block mt-6 bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition transform duration-200"
            >
              Get Started
            </button>
          )}

          {/* ✅ CONDITIONAL OPTIONS */}
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-4 mt-8 items-center justify-center md:justify-start"
            >
              <button
                onClick={() => handleProtectedNavigation('/upload')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Know your Resume ATS Score
              </button>

              <button
                onClick={() => handleProtectedNavigation('/job-eligibility-upload')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
              >
                Know what kind of job you're eligible for
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* RIGHT: Hero Image */}
        <motion.div
          className="mt-10 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={HeroImage}
            alt="ATS Illustration"
            className="w-[300px] md:w-[450px]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
