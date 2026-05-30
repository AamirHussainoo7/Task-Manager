import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckSquare, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ email: '', password: '' });

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true); setErrors({});
    try { await login(form); navigate('/', { replace: true }); }
    catch (err) { setErrors({ general: err.response?.data?.detail || 'Invalid credentials.' }); }
    finally { setLoading(false); }
  };

  const update = (f, v) => { setForm((p) => ({ ...p, [f]: v })); if (errors[f]) setErrors((p) => ({ ...p, [f]: undefined })); };

  const inputCls = 'w-full h-11 rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder-slate-500';

  return (
    <div className="flex min-h-screen">
      {/* Left branding */}
      <div className="hidden lg:flex lg:w-[46%] items-center justify-center bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(59,130,246,0.15),_transparent_60%)]" />
        <div className="relative z-10 max-w-sm text-center px-12">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white mb-8 shadow-lg shadow-blue-600/25">
            <CheckSquare className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Task Manager</h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Organize your work with a clean, intuitive Kanban board. Stay focused, move fast.
          </p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white dark:bg-slate-950">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <CheckSquare className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Task Manager</span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-8">Sign in to your account to continue</p>

          {errors.general && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input id="login-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} autoComplete="email" className={inputCls} />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="login-pw" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input id="login-pw" type={showPw ? 'text' : 'password'} placeholder="Enter your password" value={form.password} onChange={(e) => update('password', e.target.value)} autoComplete="current-password" className={`${inputCls} pr-11`} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer" tabIndex={-1}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
            </div>
            <Button type="submit" loading={loading} className="w-full h-11 text-sm">Sign in</Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">Create one</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
