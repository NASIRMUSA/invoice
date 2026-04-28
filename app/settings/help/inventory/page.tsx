"use client";
import { useRouter } from 'next/navigation';
import BottomNav from '../../../components/BottomNav';
import { 
  ArrowLeft, Package, Search, BarChart3, 
  PlusCircle, CheckCircle2, Info, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function InventoryGuideScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-white dark:bg-zinc-900 sticky top-0 z-30 border-b border-slate-100 dark:border-zinc-800">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight">User Guide</h1>
        <button className="text-brand-primary font-bold text-[15px]">Next</button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-32 hide-scrollbar pt-6">
        
        {/* Title Section */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-[24px] font-black text-gray-900 dark:text-white leading-tight tracking-tight">Managing Inventory</h2>
            <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium mt-1">
              Master your stock tracking and product catalog.
            </p>
          </div>
        </div>

        {/* Step 01: Search */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-5 border border-slate-100 dark:border-zinc-800 mb-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <Search className="w-6 h-6 text-brand-primary" />
            <span className="bg-blue-50 dark:bg-blue-900/30 text-brand-primary text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase">Step 01</span>
          </div>
          <h3 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight mb-2">Search Products</h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-4">
            Quickly locate items by SKU, name, or category using the persistent search bar at the top of your inventory dashboard.
          </p>
          <div className="flex items-center gap-2 text-brand-primary">
            <Info size={16} />
            <span className="text-[13px] font-bold">Supports partial text matching</span>
          </div>
        </motion.div>

        {/* Step 02: Stock Monitoring */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-5 border border-slate-100 dark:border-zinc-800 mb-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <BarChart3 className="w-6 h-6 text-emerald-500" />
            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase">Step 02</span>
          </div>
          <h3 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight mb-2">Stock Monitoring</h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-4">
            Identify low stock instantly. Color-coded badges indicate healthy (Green), low (Yellow), or out-of-stock (Red) levels.
          </p>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </div>
        </motion.div>

        {/* Quick Entry Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-primary rounded-[24px] p-6 text-white mb-8 relative overflow-hidden shadow-lg shadow-blue-500/20"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <PlusCircle className="w-7 h-7 text-white" />
              <h3 className="text-[20px] font-black tracking-tight">Quick Entry with FAB</h3>
            </div>
            <p className="text-[14px] text-blue-50 font-medium leading-relaxed mb-6">
              The Floating Action Button (FAB) is your primary tool for growth. Tap the "+" icon at the bottom right of any inventory screen to add new products or restock existing ones in seconds.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-white/80" />
                <span className="text-[14px] font-bold">Upload product photos</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-white/80" />
                <span className="text-[14px] font-bold">Set initial stock & prices</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/inventory')}
          className="w-full bg-brand-primary py-4 rounded-[16px] text-white font-black text-[16px] shadow-lg shadow-blue-500/20 mb-8"
        >
          Go to Inventory
        </motion.button>

      </main>

      <BottomNav />
    </div>
  );
}
