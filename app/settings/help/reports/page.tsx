"use client";
import { useRouter } from 'next/navigation';
import BottomNav from '../../../components/BottomNav';
import { 
  ArrowLeft, BarChart3, TrendingUp, Wallet, 
  Filter, MessageCircle, ChevronRight, BarChart
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReportsGuideScreen() {
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

      <main className="flex-1 overflow-y-auto px-6 pb-32 hide-scrollbar pt-8">
        
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-[28px] font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-3">Reports & Overview</h2>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Master your financial data. Learn how to track every Naira that flows through your business with our intuitive reporting dashboard.
          </p>
        </div>

        {/* Feature Overview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-slate-100 dark:border-zinc-800 mb-6 shadow-sm relative overflow-hidden"
        >
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <BarChart className="w-4 h-4 text-brand-primary" />
              <span className="text-[11px] font-black text-brand-primary uppercase tracking-widest">Feature Overview</span>
            </div>
            <h3 className="text-[20px] font-black text-gray-900 dark:text-white tracking-tight mb-3">Real-time Analytics</h3>
            <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
              Your dashboard updates instantly as invoices are sent, paid, or marked as overdue, giving you a 360-degree view of your liquidity.
            </p>
          </div>
        </motion.div>

        {/* Total Sales Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-slate-100 dark:border-zinc-800 mb-4 shadow-sm"
        >
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
            <BarChart3 className="w-5 h-5 text-brand-primary" />
          </div>
          <h3 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight mb-2">Total Sales</h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6">
            The sum of all invoices issued within your selected timeframe, excluding taxes and discounts.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-4 border border-blue-100/50 dark:border-blue-800/30">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Example Metric</span>
            <span className="text-[22px] font-black text-gray-900 dark:text-white leading-none">₦ 2,450,000</span>
          </div>
        </motion.div>

        {/* Profit Tracking Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-slate-100 dark:border-zinc-800 mb-6 shadow-sm"
        >
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4">
            <Wallet className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight mb-2">Profit Tracking</h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6">
            Your actual earnings after deducting operational costs and taxes. It’s the true health of your growth.
          </p>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[12px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <TrendingUp size={14} />
              +12.5% GROWTH
            </div>
            <span className="text-[12px] text-gray-400 font-medium">vs last month</span>
          </div>
        </motion.div>

        {/* Pro-Tip: Data Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-primary rounded-[24px] p-7 text-white mb-10 relative overflow-hidden shadow-lg shadow-blue-500/20"
        >
          {/* Subtle background element */}
          <Filter className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" strokeWidth={1.5} />
          
          <div className="relative z-10">
            <h3 className="text-[20px] font-black tracking-tight mb-3">Pro-Tip: Data Filters</h3>
            <p className="text-[14px] text-blue-50 font-medium leading-relaxed mb-6 opacity-90">
              Use the date range picker to compare seasonal sales trends or monitor month-on-month performance.
            </p>
            <button className="bg-white text-brand-primary px-6 py-3 rounded-[14px] font-black text-[14px] shadow-sm active:scale-95 transition-transform">
              Try Filters Now
            </button>
          </div>
        </motion.div>

        {/* Start Tracking Button */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/dashboard')}
          className="w-full bg-brand-primary py-4 rounded-[18px] text-white font-black text-[16px] shadow-lg shadow-blue-500/20 mb-6"
        >
          Start Tracking
        </motion.button>

        {/* Contact Footer */}
        <div className="text-center pb-8">
          <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium">
            Need more help? <button onClick={() => router.push('/settings/help')} className="text-brand-primary font-bold">Contact Support</button>
          </p>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}
