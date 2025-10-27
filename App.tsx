
import React, { useState, useCallback } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleLogin = useCallback((token: string) => {
    setAccessToken(token);
  }, []);

  const handleLogout = useCallback(() => {
    setAccessToken(null);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-primary to-brand-secondary p-4 font-sans">
      <div className="w-full max-w-5xl">
        {accessToken ? (
          <Dashboard token={accessToken} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default App;
