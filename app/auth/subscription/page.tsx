"use client";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import the subscription content with SSR disabled
// This prevents "window is not defined" errors from react-paystack during server rendering
const SubscriptionContent = dynamic(
  () => import('./SubscriptionContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 items-center justify-center">
        <motion.div 
          className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }
);

export default function SubscriptionPage() {
  return <SubscriptionContent />;
}
