import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const LoginButton = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return session ? (
    <button onClick={handleLogout} className="text-white bg-red-600 px-4 py-2 rounded">
      Logout
    </button>
  ) : (
    <button onClick={handleLogin} className="text-white bg-blue-600 px-4 py-2 rounded">
      Login
    </button>
  );
};

export default LoginButton;
