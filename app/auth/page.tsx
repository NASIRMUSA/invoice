"use client";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, EyeOff, Eye, Wallet, ShieldCheck, AlertCircle } from 'lucide-react';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/lib/viewmodels/authStore';
import { createClient } from '@/lib/supabase/client';

function AppLoader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 800;
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.06),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.1),transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center">
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const router = useRouter();
  const { showToast } = useToastStore();
  const { setUser } = useAuthStore();
  const supabase = createClient();

  // Password Strength Logic
  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  }, [password]);

  const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColor = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-emerald-500'];

  const isFormComplete = useMemo(() => {
    if (isLogin) {
      return email.length > 0 && password.length > 0;
    }
    return email.length > 0 && password.length > 0 && fullName.length > 0;
  }, [isLogin, email, password, fullName]);

  const validateForm = () => {
    if (!email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }

    if (!isLogin) {
      if (fullName.trim().length < 3) {
        showToast('Full name must be at least 3 characters', 'error');
        return false;
      }
      if (password.length < 8) {
        showToast('Password must be at least 8 characters long', 'error');
        return false;
      }
      if (!/[A-Z]/.test(password)) {
        showToast('Password must contain at least one uppercase letter', 'error');
        return false;
      }
      if (!/[0-9]/.test(password)) {
        showToast('Password must contain at least one number', 'error');
        return false;
      }
    }
    return true;
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email || !password || (!isLogin && !fullName)) {
      showToast('Please fill in all fields', 'error');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        setUser({
          id: data.user.id,
          email: data.user.email!,
          fullName: data.user.user_metadata?.full_name,
        });

        showToast('Successfully signed in!', 'success');
        router.push('/dashboard');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          setUser({
            id: data.user.id,
            email: data.user.email!,
            fullName: fullName,
          });
          
          showToast('Account created successfully!', 'success');
          router.push('/dashboard');
        }
      }
    } catch (error: any) {
      showToast(error.message || 'Authentication failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <AppLoader onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        className="flex flex-col flex-1 bg-white dark:bg-zinc-950 px-8 pt-16 pb-8 transition-colors min-h-screen"
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
          onSubmit={handleAuth}
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white"
              />
            </div>
          )}
          
          <div>
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            {/* Password Strength Indicator */}
            {!isLogin && password.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3"
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Strength: {strengthLabel[passwordStrength]}</span>
                  {passwordStrength >= 3 && <ShieldCheck size={12} className="text-emerald-500" />}
                </div>
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`flex-1 rounded-full transition-all duration-500 ${step <= passwordStrength ? strengthColor[passwordStrength] : 'bg-slate-100 dark:bg-zinc-800'}`}
                    />
                  ))}
                </div>
                {passwordStrength < 3 && (
                  <div className="flex items-start gap-1.5 mt-2">
                    <AlertCircle size={10} className="text-amber-500 mt-0.5" />
                    <p className="text-[9px] text-gray-400 font-bold leading-tight">Use 8+ characters, one uppercase, and one number for a secure account.</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !isFormComplete}
            className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-xl shadow-2xl shadow-brand-primary/30 mt-4 active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <motion.div 
                className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </motion.form>

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
