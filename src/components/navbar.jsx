import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleLogout = async () => {
    setShowModal(true); // 👀 show logout modal
    setTimeout(async () => {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setShowModal(false);
    }, 2000); // ⏱️ 2 second delay
  };

  return (
    <>
      {/* Page Blur + Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-in-up">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">🔒 Logging you out...</h2>
            <p className="text-sm text-gray-500">Please wait a moment</p>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="w-full px-8 py-4 flex justify-between items-center bg-white shadow relative z-10">
        <h1 className="text-xl font-bold text-blue-600">Job Finder</h1>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="text-red-500 font-medium hover:underline"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
