"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, Send, ShieldCheck, RotateCcw, CheckCircle2, EyeOff, Eye, ShieldAlert, Headphones } from 'lucide-react';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResetPasswordScreen() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(59);
  const router = useRouter();
  const { showToast } = useToastStore();

  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendCode = () => {
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }
    showToast('Verification code sent!', 'success');
    setStep(2);
  };

  const handleVerify = () => {
    if (code.some(c => !c)) {
      showToast('Please enter the full code', 'error');
      return;
    }
    showToast('Code verified successfully!', 'success');
    setStep(3);
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      showToast('Please fill all fields', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    showToast('Password reset successful!', 'success');
    router.push('/auth');
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors">
      <header className="px-6 pt-6 pb-4 flex items-center bg-white dark:bg-zinc-950 border-b border-slate-50 dark:border-zinc-900">
        <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors mr-2">
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
                Enter the email address associated with your account and we'll send you a 6-digit code to reset your password.
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
                onClick={handleSendCode}
                className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
              >
                Send Code <Send size={20} className="rotate-[-10deg]" />
              </button>

              <div className="mt-24 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">
                  Remember your password? <Link href="/auth" className="text-brand-primary font-black ml-1">Log in</Link>
                </p>
                <div className="mt-6 inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">Secure Verification</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-10 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-100/50 dark:bg-blue-800/30 blur-xl"></div>
                <ShieldCheck className="w-10 h-10 text-blue-600 dark:text-blue-400 relative z-10" />
              </div>
              
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center">Verification Code</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-10 leading-relaxed max-w-[300px]">
                Enter the code sent to your email <span className="text-gray-900 dark:text-white font-bold">{email || 'example@domain.com'}</span> to secure your account.
              </p>

              <div className="flex justify-between w-full gap-2 mb-10">
                {code.map((digit, i) => (
                  <input 
                    key={i}
                    id={`code-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    className="w-full h-14 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl text-center font-black text-xl text-gray-900 dark:text-white focus:border-brand-primary dark:focus:border-brand-primary outline-none shadow-sm transition-all"
                  />
                ))}
              </div>

              <div className="text-center mb-10">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mb-2">Haven't received the code?</p>
                <button className="text-brand-primary font-black text-sm uppercase tracking-wider">
                  Resend Code (0:{timer.toString().padStart(2, '0')})
                </button>
              </div>

              <button 
                onClick={handleVerify}
                className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-brand-primary/30 active:scale-[0.98] transition-all mb-8"
              >
                Verify
              </button>

              <div className="w-full bg-blue-50/50 dark:bg-zinc-900 border border-blue-100/50 dark:border-zinc-800 rounded-2xl p-5 flex gap-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest mb-1">Account Security</h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-bold leading-relaxed">
                    We use two-factor authentication to ensure your financial data remains protected at all times.
                  </p>
                </div>
              </div>

              <button className="mt-10 flex items-center gap-2 text-gray-500 dark:text-gray-400 font-bold text-sm">
                <Headphones size={18} /> Contact Support
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full flex flex-col items-center"
            >
              <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center self-start">Secure Your Account</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 leading-relaxed self-start">
                Enter a new password for your account. Make sure it's strong and unique.
              </p>

              <div className="w-full bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-900/30 flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-primary/20">
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-1">Security Tip</h4>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 font-black">Mix letters, numbers, and symbols.</p>
                </div>
              </div>

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
                className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-brand-primary/30 active:scale-[0.98] transition-all mb-10"
              >
                Reset Password
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

              <p className="mt-auto pt-10 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                © 2024 InvoicePro NG. Secure Access.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
