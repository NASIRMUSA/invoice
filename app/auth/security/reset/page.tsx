"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { ShieldCheck, Mail, Smartphone, Send, ArrowLeft, Delete, Check, ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResetPinScreen() {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<'email' | 'sms'>('email');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [newPin, setNewPin] = useState<string[]>([]);
  const [confirmPin, setConfirmPin] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();
  const { userProfile, setSecurityPin, setLocked } = useAppStore();
  const { showToast } = useToastStore();

  const maskEmail = (email: string) => {
    if (!email) return "j.***@example.com";
    const [name, domain] = email.split('@');
    return `${name[0]}.***@${domain}`;
  };

  const maskPhone = (phone: string) => {
    if (!phone) return "+234 *** *** 8901";
    return `${phone.substring(0, 4)} *** *** ${phone.slice(-4)}`;
  };

  const handleSendCode = () => {
    showToast('Verification code sent!', 'success');
    setStep(2);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    if (code.some(c => !c)) {
      showToast('Please enter the full code', 'error');
      return;
    }
    showToast('Identity verified!', 'success');
    setStep(3);
  };

  const handleNumberClick = (num: string) => {
    if (newPin.length < 4) {
      setNewPin([...newPin, num]);
    }
  };

  const handleDelete = () => {
    setNewPin(newPin.slice(0, -1));
  };

  const handleContinue = () => {
    if (newPin.length < 4) {
      showToast('Please enter a 4-digit PIN', 'error');
      return;
    }

    if (!isConfirming) {
      setConfirmPin(newPin);
      setNewPin([]);
      setIsConfirming(true);
      showToast('Please confirm your new PIN', 'info');
    } else {
      if (newPin.join('') === confirmPin.join('')) {
        setSecurityPin(newPin.join(''));
        setLocked(false);
        showToast('Security PIN reset successful!', 'success');
        router.push('/dashboard');
      } else {
        showToast('PINs do not match. Try again.', 'error');
        setNewPin([]);
        setConfirmPin([]);
        setIsConfirming(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors">
      <header className="px-6 pt-6 pb-4 flex items-center bg-white dark:bg-zinc-950 border-b border-slate-50 dark:border-zinc-900">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Security Settings</span>
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
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[28px] flex items-center justify-center mb-8 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              
              <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center">Verify Identity</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-10 leading-relaxed max-w-[300px]">
                Choose a method to receive your verification code for the PIN reset process.
              </p>

              <div className="w-full flex flex-col gap-4 mb-10">
                <button 
                  onClick={() => setMethod('email')}
                  className={`w-full p-5 rounded-3xl border-2 flex items-center gap-4 transition-all ${method === 'email' ? 'border-brand-primary bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${method === 'email' ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-zinc-800 text-gray-400'}`}>
                    <Mail size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Verify via Email</p>
                    <p className="text-base font-black text-gray-900 dark:text-white tracking-tight">{maskEmail(userProfile?.email || '')}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'email' ? 'border-brand-primary bg-brand-primary' : 'border-slate-200 dark:border-zinc-700'}`}>
                    {method === 'email' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>

                <button 
                  onClick={() => setMethod('sms')}
                  className={`w-full p-5 rounded-3xl border-2 flex items-center gap-4 transition-all ${method === 'sms' ? 'border-brand-primary bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${method === 'sms' ? 'bg-brand-primary text-white' : 'bg-slate-100 dark:bg-zinc-800 text-gray-400'}`}>
                    <Smartphone size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Verify via SMS</p>
                    <p className="text-base font-black text-gray-900 dark:text-white tracking-tight">{maskPhone(userProfile?.phone || '')}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${method === 'sms' ? 'border-brand-primary bg-brand-primary' : 'border-slate-200 dark:border-zinc-700'}`}>
                    {method === 'sms' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              </div>

              <button 
                onClick={handleSendCode}
                className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all mb-8"
              >
                Send Verification Code <Send size={20} className="rotate-[-10deg]" />
              </button>

              <button className="text-brand-primary font-black text-sm hover:underline">
                Having trouble? <span className="font-bold">Contact Support</span>
              </button>

              <div className="mt-12 w-full max-w-[280px] aspect-[4/3] rounded-[32px] overflow-hidden relative shadow-2xl shadow-blue-500/10 border border-slate-100 dark:border-zinc-800">
                <img src="/lock_illustration.png" alt="Lock illustration" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
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
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-8">
                <ShieldCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center">Verify Identity</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-10 leading-relaxed max-w-[300px]">
                Enter the code sent to your {method === 'email' ? 'email' : 'phone'} to secure your account.
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

              <button 
                onClick={handleVerify}
                className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-brand-primary/30 active:scale-[0.98] transition-all mb-8"
              >
                Verify Code
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
              <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center">Set New PIN</h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-10 leading-relaxed max-w-[280px]">
                {isConfirming ? 'Re-enter your new 4-digit PIN to confirm.' : 'Create a new 4-digit PIN to secure your transactions.'}
              </p>

              {/* PIN Indicators */}
              <div className="flex gap-4 mb-12">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    initial={false}
                    animate={{ 
                      scale: newPin.length > i ? 1.2 : 1,
                      backgroundColor: newPin.length > i ? '#2563eb' : '#e2e8f0' 
                    }}
                    className={`w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-zinc-800`}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6 w-full max-w-[320px] mb-12">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'X', '0', 'back'].map((item, i) => (
                  <div key={i} className="flex items-center justify-center">
                    {item === 'back' ? (
                      <button onClick={handleDelete} className="w-full h-16 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                        <Delete size={28} />
                      </button>
                    ) : item === 'X' ? (
                      <button onClick={() => setNewPin([])} className="w-full h-16 flex items-center justify-center text-red-400 hover:text-red-600 transition-colors">
                        <X size={28} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleNumberClick(item)}
                        className="w-full h-16 flex items-center justify-center bg-white dark:bg-zinc-900 border border-slate-50 dark:border-zinc-800 rounded-2xl text-2xl font-bold text-gray-900 dark:text-white shadow-sm transition-all active:scale-95"
                      >
                        {item}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button 
                onClick={handleContinue}
                className="w-full bg-brand-primary text-white py-5 rounded-[20px] font-black text-xl shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all mb-8"
              >
                Continue <Check size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
