"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAppStore, useDashboardStats } from '@/lib/viewmodels/appStore';
import BottomNav from '../components/BottomNav';
import { Menu, User, TrendingUp, Package, Wallet, Plus, PlusCircle, CheckCircle2, AlertCircle, Clock, ChevronRight, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardScreen() {
  const { invoices, isDarkMode, toggleDarkMode, userProfile } = useAppStore();
  const stats = useDashboardStats();
  
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const recentInvoices = invoices.slice(0, 3);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `₦${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `₦${(amount / 1000).toFixed(0)}K`;
    return `₦${amount}`;
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-gray-900 dark:text-white tracking-tight">InvoicePro NG</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all hover:scale-110 active:scale-95 shadow-sm"
          >
            {mounted && isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="/settings" className="w-10 h-10 bg-indigo-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-indigo-100 dark:border-zinc-700 relative shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer">
            <User className="w-6 h-6 text-brand-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-brand-accent rounded-full border-2 border-white dark:border-zinc-900"></div>
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-4 pb-32 hide-scrollbar">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            Hi, {userProfile?.fullName.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-400 dark:text-gray-500 text-[13px] font-medium mt-1 uppercase tracking-wider">Here's your business overview</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 flex flex-col justify-between h-32 transition-colors">
            <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/20 text-brand-primary rounded-xl flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
               <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">Total Sales</p>
               <p className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{formatCurrency(stats.totalSales)}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 flex flex-col justify-between h-32 transition-colors">
            <div className="w-9 h-9 bg-green-50 dark:bg-green-900/20 text-brand-accent rounded-xl flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
               <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">Weekly Profit</p>
               <p className="text-xl font-black text-brand-accent tracking-tight">{formatCurrency(stats.weeklyProfit)}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 flex flex-col justify-between h-32 transition-colors">
            <div className="w-9 h-9 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl flex items-center justify-center mb-2">
              <Package className="w-5 h-5" />
            </div>
            <div>
               <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">Total Products</p>
               <p className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{stats.totalProducts}</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-zinc-800 flex flex-col justify-between h-32 transition-colors">
            <div className="w-9 h-9 bg-amber-50 dark:bg-amber-900/20 text-amber-500 rounded-xl flex items-center justify-center mb-2">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
               <p className="text-[11px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-tighter">Stock Value</p>
               <p className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{formatCurrency(stats.totalStockValue)}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-[13px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/create-invoice" className="bg-brand-primary text-white py-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold shadow-lg shadow-brand-primary/20 active:scale-[0.98] transition-all">
              <Plus className="w-5 h-5 text-white" />
              <span className="text-xs">Create Invoice</span>
            </Link>
            <Link href="/inventory" className="bg-white dark:bg-zinc-900 text-brand-primary py-4 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold shadow-sm border border-slate-100 dark:border-zinc-800 active:scale-[0.98] transition-all">
              <Package className="w-5 h-5 text-brand-primary" />
              <span className="text-xs">Add Product</span>
            </Link>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[15px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Recent Activity</h2>
            <Link href="/history" className="text-brand-primary text-[11px] font-black flex items-center">
              VIEW ALL <ChevronRight size={14} />
            </Link>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-[28px] shadow-sm border border-slate-50 dark:border-zinc-800 p-2 transition-colors">
            {recentInvoices.map((inv, idx) => (
              <div key={inv.id} className={`flex items-center justify-between p-3.5 ${idx !== recentInvoices.length - 1 ? 'border-b border-slate-50 dark:border-zinc-800' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                    inv.status === 'Paid' ? 'bg-green-50 dark:bg-green-900/20 text-green-500' :
                    inv.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-500' :
                    'bg-red-50 dark:bg-red-900/20 text-red-500'
                  }`}>
                    {inv.status === 'Paid' ? <CheckCircle2 className="w-5.5 h-5.5" /> : 
                     inv.status === 'Pending' ? <Clock className="w-5.5 h-5.5" /> :
                     <AlertCircle className="w-5.5 h-5.5" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">{inv.customerName}</p>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mt-0.5">Invoice {inv.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900 dark:text-white text-sm">₦{inv.totalAmount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
