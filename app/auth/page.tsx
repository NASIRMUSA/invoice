"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, EyeOff, Eye, Wallet } from 'lucide-react';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/viewmodels/authStore';

function AppLoader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2400;
    const interval = 30;
    const step = (interval / duration) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + Math.random() * 1.2;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 300);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Subtle radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.1),transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with pulse ring */}
        <div className="relative mb-8">
          <motion.div
            className="absolute inset-0 rounded-[24px] bg-brand-primary/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-20 h-20 bg-brand-primary rounded-[24px] flex items-center justify-center shadow-2xl shadow-brand-primary/30 relative"
            initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Wallet className="w-10 h-10 text-white" />
          </motion.div>
        </div>

        {/* App Name */}
        <motion.h1
          className="text-[28px] font-black text-gray-900 dark:text-white tracking-tight mb-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          InvoicePro
          <span className="text-brand-primary"> NG</span>
        </motion.h1>

        <motion.p
          className="text-[13px] text-gray-400 dark:text-gray-500 font-semibold tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Smart invoicing for Nigeria
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className="mt-10 w-48 h-[3px] bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden"
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-brand-primary to-blue-400 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Loading dots */}
        <motion.div
          className="flex items-center gap-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-[5px] h-[5px] bg-brand-primary/50 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { showToast } = useToastStore();
  const { login } = useAuthStore();

  const handleAuth = () => {
    login();
    if (isLogin) {
      showToast('Successfully signed in!', 'success');
    } else {
      showToast('Account created successfully!', 'success');
    }
    router.push('/dashboard');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <AppLoader onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        className="flex flex-col flex-1 bg-white dark:bg-zinc-950 px-8 pt-16 pb-8 transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 10 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <div className="w-16 h-16 bg-brand-primary rounded-[20px] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-brand-primary/20">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            {isLogin ? 'Welcome Back' : 'Join InvoicePro'}
          </h1>
          <p className="text-gray-400 dark:text-gray-500 font-bold text-sm mt-2">
            {isLogin ? 'Sign in to manage your sales' : 'Create an account for your business'}
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 10 : 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col gap-5"
        >
          {!isLogin && (
            <div>
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. John Doe"
                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white"
              />
            </div>
          )}
          
          <div>
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Email Address</label>
            <input 
              type="email" 
              placeholder="name@business.com"
              className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase block tracking-widest">Password</label>
              {isLogin && <Link href="/auth/reset-password"><button type="button" className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Forgot?</button></Link>}
            </div>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 dark:text-zinc-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleAuth}
            className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-brand-primary/30 mt-4 active:scale-[0.98] transition-all"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </motion.form>

        {/* <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-slate-100"></div>
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Or continue with</span>
          <div className="flex-1 h-px bg-slate-100"></div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-3 border border-slate-100 py-3.5 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98]">
             <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
             <span className="font-black text-gray-700 text-sm">Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-3 border border-slate-100 py-3.5 rounded-2xl hover:bg-slate-50 transition-all active:scale-[0.98]">
             <Lock size={20} className="text-gray-400" />
             <span className="font-black text-gray-700 text-sm">Biometric</span>
          </button>
        </div> */}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-auto pt-10 flex justify-center"
        >
          <p className="text-[13px] text-gray-500 dark:text-gray-400 font-bold">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand-primary font-black"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}
