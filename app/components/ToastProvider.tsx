"use client";
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ToastProvider() {
  const { toasts, removeToast } = useToastStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex flex-col items-center gap-3 pointer-events-none px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-100/50 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-[20px] px-5 py-3.5 min-w-[320px] max-w-sm animate-in slide-in-from-top-4 fade-in duration-300"
        >
          {toast.type === 'success' && (
            <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4.5 h-4.5 text-green-500" strokeWidth={2.5} />
            </div>
          )}
          {toast.type === 'error' && (
            <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4.5 h-4.5 text-red-500" strokeWidth={2.5} />
            </div>
          )}
          {toast.type === 'info' && (
            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-4.5 h-4.5 text-brand-primary" strokeWidth={2.5} />
            </div>
          )}
          
          <p className="flex-1 text-[14px] font-bold text-gray-800 dark:text-gray-100 leading-snug tracking-tight">
            {toast.message}
          </p>
          
          <button 
            onClick={() => removeToast(toast.id)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 dark:bg-zinc-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      ))}
    </div>
  );
}
