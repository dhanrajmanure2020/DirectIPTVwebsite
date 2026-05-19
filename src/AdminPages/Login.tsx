import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      if (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'https://dummy.supabase.co') {
        // Mock login
        if (email === 'admin@admin.com' && password === 'admin') {
          localStorage.setItem('directiptv_admin_logged_in', 'true');
          navigate('/admin/dashboard');
          return;
        } else {
          throw new Error('Invalid mock credentials (use admin@admin.com / admin)');
        }
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      if (data.user) {
        localStorage.setItem('directiptv_admin_logged_in', 'true');
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background-dark flex items-center justify-center">
      <div className="max-w-md w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02]"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Admin Login</h1>
            <p className="text-slate-400 font-medium text-sm">Please sign in to access the dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yourdomain.com"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 focus:outline-none focus:border-primary transition-all text-slate-200"
                />
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 focus:outline-none focus:border-primary transition-all text-slate-200"
                />
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest text-center">{error}</p>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl text-base font-bold text-white btn-gradient flex items-center justify-center gap-2 active:scale-[0.98] transition-all shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Dashboard
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/5">
              <Link 
                to="/admin/forgot-password" 
                className="text-xs font-bold text-slate-400 hover:text-primary transition-colors tracking-widest uppercase"
              >
                Forgot Password?
              </Link>
              <Link 
                to="/admin/register" 
                className="text-xs font-bold text-slate-400 hover:text-primary transition-colors tracking-widest uppercase"
              >
                Create New Account
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
