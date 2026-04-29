"use client";
import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 items-center justify-center">
      <motion.div 
        className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-[11px]"
      >
        Preparing your dashboard...
      </motion.p>
    </div>
  );
}
