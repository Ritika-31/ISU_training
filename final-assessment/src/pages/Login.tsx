import { Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      // Dummy login, bypasses authentication and directly navigates
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-idbi-green/20 blur-[100px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-idbi-orange/20 blur-[120px]" />
      </div>

      <div className="glass max-w-md w-full rounded-3xl p-8 relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg mb-6 border border-slate-200 dark:border-slate-700">
          <Shield className="w-8 h-8 text-idbi-green" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Merchant Portal</h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-8">Sign in to IDBI Merchant Dashboard to manage your business.</p>

        <form onSubmit={handleLogin} className="w-full space-y-4 flex flex-col items-center">
          <div className="w-full">
            <input
              type="text"
              placeholder="Username or Email"
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-idbi-green w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-idbi-green w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-idbi-green hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-idbi-green/30 mt-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
