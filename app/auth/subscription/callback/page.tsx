"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { useToastStore } from '@/lib/viewmodels/toastStore';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const { showToast } = useToastStore();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      console.log('Callback reference found:', reference);
      if (!reference) {
        setStatus('error');
        setMessage('No payment reference found. Please contact support if you were charged.');
        return;
      }

      try {
        const response = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Payment verified successfully! Welcome to the premium club.');
          showToast('Subscription activated!', 'success');
          
          // Redirect after a short delay
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Payment verification failed.');
          showToast(data.message || 'Verification failed', 'error');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred while verifying your payment.');
        showToast('Verification error', 'error');
      }
    };

    verifyPayment();
  }, [reference, router, showToast]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-[32px] p-10 shadow-xl border border-slate-100 dark:border-zinc-800 text-center"
      >
        <div className="mb-8 flex justify-center">
          {status === 'loading' && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-brand-primary"
            >
              <Loader2 size={64} />
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-emerald-500"
            >
              <CheckCircle2 size={64} />
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-rose-500"
            >
              <XCircle size={64} />
            </motion.div>
          )}
        </div>

        <h2 className="text-[24px] font-black text-gray-900 dark:text-white mb-4 tracking-tight">
          {status === 'loading' ? 'Just a moment' : status === 'success' ? 'Payment Confirmed' : 'Verification Failed'}
        </h2>
        
        <p className="text-[16px] text-gray-500 dark:text-gray-400 font-medium mb-8">
          {message}
        </p>

        {status === 'success' && (
          <button 
            onClick={() => router.push('/dashboard')}
            className="w-full py-4 bg-brand-primary text-white rounded-2xl font-black text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            Go to Dashboard <ArrowRight size={18} />
          </button>
        )}

        {status === 'error' && (
          <button 
            onClick={() => router.push('/auth/subscription')}
            className="w-full py-4 bg-slate-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-2xl font-black text-[15px] active:scale-95 transition-all"
          >
            Try Again
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary" size={48} />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
