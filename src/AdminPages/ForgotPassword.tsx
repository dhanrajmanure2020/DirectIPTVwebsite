import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (resetError) throw resetError;

      setSuccess(true);
      toast.success('Password reset email sent!');
    } catch (err: any) {
      setError(err.message || 'An error occurred while sending the reset email');
      toast.error('Failed to send reset email');
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
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Reset Password</h1>
            <p className="text-slate-400 font-medium text-sm">Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          {success ? (
            <div className="text-center space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm font-medium">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
              </div>
              <button 
                onClick={() => navigate('/admin')}
                className="w-full py-4 rounded-xl text-base font-bold text-white bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@yourdomain.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 focus:outline-none focus:border-primary transition-all text-slate-200"
                    disabled={isSubmitting}
                  />
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
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
                    Sending link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              <div className="text-center mt-6">
                <button 
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="text-xs font-bold text-slate-400 hover:text-white transition-colors tracking-widest uppercase flex items-center justify-center gap-2 mx-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
