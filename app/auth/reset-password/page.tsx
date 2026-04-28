"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, Send, ShieldCheck, RotateCcw, CheckCircle2, EyeOff, Eye, ShieldAlert, Headphones, Loader2 } from 'lucide-react';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function ResetPasswordScreen() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();
  const { showToast } = useToastStore();
  const supabase = createClient();

  // Detect recovery state from URL
  useEffect(() => {
    // Listen for auth state changes (e.g. when the hash is parsed)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setStep(3);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSendLink = async () => {
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      showToast('Reset link sent to your email!', 'success');
      setStep(2);
    } catch (error: any) {
      showToast(error.message || 'Failed to send reset link', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      showToast('Please fill all fields', 'error');
      return;
    }
    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      showToast('Password updated successfully!', 'success');
      router.push('/auth');
    } catch (error: any) {
      showToast(error.message || 'Failed to update password', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors">
      <header className="px-6 pt-6 pb-4 flex items-center bg-white dark:bg-zinc-950 border-b border-slate-50 dark:border-zinc-900">
        <button onClick={() => step > 1 ? setStep(1) : router.back()} className="w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Reset Password</span>
      </header>

      <main className="flex-1 overflow-y-auto px-8 pt-10 pb-10 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-[32px] flex items-center justify-center mb-10 shadow-sm">
                <RotateCcw className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center">Forgot password?</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-10 leading-relaxed max-w-[300px]">
                Enter your email address and we'll send you a secure link to reset your password.
              </p>

              <div className="w-full mb-8">
                <label className="text-[12px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input 
                    type="email" 
                    placeholder="e.g. adekunle@business.ng" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-4.5 pl-12 pr-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <button 
                onClick={handleSendLink}
                disabled={isSubmitting}
                className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : <>Send Reset Link <Send size={20} className="rotate-[-10deg]" /></>}
              </button>

              <div className="mt-24 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">
                  Remember your password? <Link href="/auth" className="text-brand-primary font-black ml-1">Log in</Link>
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-10 shadow-sm relative overflow-hidden">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 relative z-10" />
              </div>
              
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center tracking-tighter">Check Your Email</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-10 leading-relaxed max-w-[300px]">
                We've sent a secure password reset link to <span className="text-gray-900 dark:text-white font-bold">{email}</span>.
              </p>

              <div className="w-full bg-blue-50/50 dark:bg-zinc-900 border border-blue-100/50 dark:border-zinc-800 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mb-4">Didn't receive the link?</p>
                <button 
                  onClick={handleSendLink}
                  className="text-brand-primary font-black text-sm uppercase tracking-wider underline underline-offset-4"
                >
                  Resend Link
                </button>
              </div>

              <button className="mt-12 flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-sm">
                <Headphones size={18} /> Contact Support
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex flex-col items-center"
            >
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center self-start">New Password</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 leading-relaxed self-start">
                Create a strong, unique password for your account to keep your business data safe.
              </p>

              <div className="w-full flex flex-col gap-6 mb-10">
                <div>
                  <label className="text-[11px] font-black text-gray-900 dark:text-white uppercase mb-2 block tracking-widest ml-1">New Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-5 px-5 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white pr-14"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-black text-gray-900 dark:text-white uppercase mb-2 block tracking-widest ml-1">Confirm New Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-5 px-5 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white pr-14"
                    />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600">
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleResetPassword}
                disabled={isSubmitting}
                className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-brand-primary/30 active:scale-[0.98] transition-all mb-10 disabled:opacity-70 flex items-center justify-center"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Update Password'}
              </button>

              <div className="w-full bg-gradient-to-br from-blue-600 to-emerald-500 rounded-[24px] p-6 text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/30">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-black mb-1 tracking-tight">Bank-Grade Encryption</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Your security is our priority. Every transaction is encrypted with the highest standards.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
