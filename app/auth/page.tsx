"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, EyeOff, Eye, Wallet } from 'lucide-react';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/viewmodels/authStore';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex flex-col flex-1 bg-white dark:bg-zinc-950 px-8 pt-16 pb-8 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
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
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
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
    </div>
  );
}
