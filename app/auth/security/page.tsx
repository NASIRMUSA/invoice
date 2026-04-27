"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { Lock, ArrowLeft, Delete, Check, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecurityScreen() {
  const router = useRouter();
  const { securityPin, setSecurityPin, setLocked } = useAppStore();
  const { showToast } = useToastStore();
  const [pin, setPin] = useState<string[]>([]);
  const [confirmPin, setConfirmPin] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      setPin([...pin, num]);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handleComplete = () => {
    if (pin.length < 4) {
      showToast('Please enter a 4-digit PIN', 'error');
      return;
    }

    if (!isConfirming) {
      setConfirmPin(pin);
      setPin([]);
      setIsConfirming(true);
      showToast('Please confirm your PIN', 'info');
    } else {
      if (pin.join('') === confirmPin.join('')) {
        setSecurityPin(pin.join(''));
        setLocked(false);
        showToast('Security PIN set successfully!', 'success');
        router.push('/dashboard');
      } else {
        showToast('PINs do not match. Try again.', 'error');
        setPin([]);
        setConfirmPin([]);
        setIsConfirming(false);
      }
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      // Auto-submit or wait for checkmark?
      // Design shows a checkmark button, so we wait.
    }
  }, [pin]);

  const numPad = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'delete', '0', 'check'
  ];

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 transition-colors">
      <header className="px-6 pt-6 pb-4 flex items-center bg-white dark:bg-zinc-950">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors mr-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mx-auto pr-10">Security</span>
      </header>

      <main className="flex-1 flex flex-col items-center px-8 pt-6 pb-12">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-[28px] flex items-center justify-center mb-8 shadow-sm">
          <Lock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>

        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center">
          {isConfirming ? 'Confirm Security PIN' : 'Setup Security PIN'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-12 leading-relaxed max-w-[280px]">
          {isConfirming 
            ? 'Re-enter your 4-digit PIN to confirm and secure your account.'
            : 'Create a 4-digit PIN to secure your account and verify transactions.'}
        </p>

        {/* PIN Indicators */}
        <div className="flex gap-4 mb-16">
          {[0, 1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={false}
              animate={{ 
                scale: pin.length > i ? 1.2 : 1,
                backgroundColor: pin.length > i ? '#2563eb' : '#e2e8f0' 
              }}
              className={`w-3.5 h-3.5 rounded-full border border-slate-200 dark:border-zinc-800`}
            />
          ))}
        </div>

        {/* Number Pad Grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-[320px] mb-12">
          {numPad.map((item, i) => (
            <div key={i} className="flex items-center justify-center">
              {item === 'delete' ? (
                <button 
                  onClick={handleDelete}
                  className="w-full h-16 flex items-center justify-center text-gray-500 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-2xl transition-colors active:scale-95"
                >
                  <Delete size={24} />
                </button>
              ) : item === 'check' ? (
                <button 
                  onClick={handleComplete}
                  className="w-full h-16 flex items-center justify-center bg-brand-primary text-white rounded-2xl shadow-xl shadow-brand-primary/20 transition-all active:scale-95 hover:brightness-110"
                >
                  <Check size={28} strokeWidth={3} />
                </button>
              ) : (
                <button 
                  onClick={() => handleNumberClick(item)}
                  className="w-full h-16 flex items-center justify-center bg-white dark:bg-zinc-900 border border-slate-50 dark:border-zinc-800 rounded-2xl text-2xl font-bold text-gray-900 dark:text-white shadow-sm hover:border-brand-primary/20 transition-all active:scale-95"
                >
                  {item}
                </button>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={() => router.push('/dashboard')}
          className="text-brand-primary font-black text-[13px] uppercase tracking-widest mb-10 hover:underline"
        >
          Skip for now
        </button>

        <div className="mt-auto flex items-center gap-2 text-gray-400 dark:text-gray-500 font-bold text-[11px]">
          <ShieldCheck size={14} />
          <span>Bank-grade 256-bit encryption</span>
        </div>
      </main>
    </div>
  );
}
