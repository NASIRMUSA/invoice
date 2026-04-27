"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { Lock, Delete, Check, ShieldCheck, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LockOverlay() {
  const router = useRouter();
  const { securityPin, isLocked, setLocked } = useAppStore();
  const { showToast } = useToastStore();
  const [pin, setPin] = useState<string[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);

  // Auto-lock on fresh load if pin is set
  useEffect(() => {
    if (securityPin && !isLocked) {
      // We don't want to lock immediately if we just came from setting the pin
      // But usually, fresh load means it should be locked.
      // Let's just rely on the store's isLocked state which we'll trigger in layout.
    }
    setIsInitializing(false);
  }, []);

  // Auto-verify when 4 digits are reached
  useEffect(() => {
    if (pin.length === 4) {
      const verifyPin = async () => {
        // Small delay to let the UI show the 4th dot
        await new Promise(resolve => setTimeout(resolve, 200));
        
        if (pin.join('') === securityPin) {
          setLocked(false);
          setPin([]);
          showToast('Welcome back!', 'success');
        } else {
          showToast('Incorrect PIN. Please try again.', 'error');
          setPin([]);
        }
      };
      verifyPin();
    }
  }, [pin, securityPin, setLocked, showToast]);

  if (!isLocked || !securityPin || isInitializing) return null;

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      setPin([...pin, num]);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const numPad = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    'biometric', '0', 'delete'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-white dark:bg-zinc-950 flex flex-col items-center px-8 pt-10 pb-8 overflow-y-auto hide-scrollbar"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-[24px] flex items-center justify-center mb-6 shadow-sm">
          <Lock className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>

        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight text-center">
          Enter Security PIN
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium text-center mb-8 leading-relaxed max-w-[280px]">
          Your account is secured. Please enter your 4-digit PIN to continue.
        </p>

        {/* PIN Indicators */}
        <div className="flex gap-6 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <motion.div 
              key={i}
              initial={false}
              animate={{ 
                scale: pin.length > i ? 1.4 : 1,
                backgroundColor: pin.length > i ? '#2563eb' : 'rgba(0,0,0,0.05)',
                borderColor: pin.length > i ? '#2563eb' : 'rgba(0,0,0,0.1)'
              }}
              className={`w-4 h-4 rounded-full border dark:bg-zinc-800/50 dark:border-zinc-700 transition-colors`}
            />
          ))}
        </div>

        {/* Number Pad Grid */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-[320px] mb-12">
          {numPad.map((item, i) => (
            <div key={i} className="flex items-center justify-center">
              {item === 'delete' ? (
                <button 
                  onClick={handleDelete}
                  className="w-16 h-16 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors active:scale-90"
                >
                  <Delete size={28} />
                </button>
              ) : item === 'biometric' ? (
                <button 
                  className="w-16 h-16 flex items-center justify-center text-brand-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-all active:scale-90"
                  onClick={() => showToast('Biometric unlock not available in browser demo.', 'info')}
                >
                  <Fingerprint size={32} />
                </button>
              ) : (
                <button 
                  onClick={() => handleNumberClick(item)}
                  className="w-20 h-20 flex items-center justify-center bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-full text-3xl font-black text-gray-900 dark:text-white shadow-sm hover:border-brand-primary/40 hover:bg-white dark:hover:bg-zinc-800 transition-all active:scale-90"
                >
                  {item}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full px-12 mb-8">
          <button 
            onClick={() => {
              setLocked(false);
              router.push('/auth');
            }}
            className="text-brand-primary font-black text-[13px] uppercase tracking-widest hover:underline"
          >
            Sign in with password
          </button>
          <button 
            onClick={() => router.push('/auth/security/reset')}
            className="text-gray-400 dark:text-gray-500 font-bold text-[13px] uppercase tracking-widest hover:underline"
          >
            Forgot PIN?
          </button>
        </div>

        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 font-bold text-[11px]">
          <ShieldCheck size={14} />
          <span>Bank-grade 256-bit encryption</span>
        </div>
      </div>
    </motion.div>
  );
}
