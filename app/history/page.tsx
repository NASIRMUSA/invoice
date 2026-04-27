"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAppStore, useDashboardStats } from '@/lib/viewmodels/appStore';
import BottomNav from '../components/BottomNav';
import { Wallet, User, Search, Filter, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HistoryScreen() {
  const { invoices } = useAppStore();
  const stats = useDashboardStats();
  const [searchQuery, setSearchQuery] = useState('');

  const pendingCount = invoices.filter(i => i.status === 'Pending').length;
  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;

  const filteredInvoices = invoices.filter(inv => 
    inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-20 shadow-sm shadow-slate-100 dark:shadow-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-gray-900 dark:text-white tracking-tight">InvoicePro NG</span>
        </div>
        <Link href="/settings" className="w-10 h-10 bg-indigo-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-indigo-100 dark:border-zinc-700 shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer">
           <User className="w-6 h-6 text-brand-primary" />
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-4 pb-32 hide-scrollbar">
        
        {/* Summary Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] shadow-sm border border-slate-100 dark:border-zinc-800 mb-8 transition-colors"
        >
           <div className="mb-4">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black mb-1 uppercase tracking-widest">Total Collected</p>
              <h2 className="text-3xl font-black text-brand-primary tracking-tighter">₦{stats.totalSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
              <p className="text-[11px] text-green-500 font-bold flex items-center gap-1 mt-1">
                <TrendingUp size={14} /> +12% from last month
              </p>
           </div>
           
           <div className="h-px bg-slate-50 dark:bg-zinc-800 my-5"></div>
           
           <div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black mb-1 uppercase tracking-widest">Pending Invoices</p>
              <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">{pendingCount} Invoices</h3>
              <div className="text-[11px] text-red-500 font-bold mt-1 flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> {overdueCount} Overdue recently
              </div>
           </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-[15px] font-black text-gray-900 dark:text-white uppercase tracking-widest mb-4"
        >
          Recent History
        </motion.h1>
        
        {/* Search & Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
            <input 
              type="text" 
              placeholder="Search customer or ID" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-3 pl-10 pr-4 text-[13px] outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white"
            />
          </div>
          <button className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl px-4 flex items-center gap-2 text-gray-600 dark:text-gray-400 text-[13px] font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-800 active:scale-95 transition-all">
             <Filter size={16} /> Filter
          </button>
        </motion.div>

        {/* Invoice List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          {filteredInvoices.map((inv) => (
            <Link key={inv.id} href={`/invoice/${inv.id}`} className="block active:scale-[0.98] transition-all">
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-50 dark:border-zinc-800 shadow-sm flex flex-col gap-3 hover:border-brand-primary/20 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                   <div className="flex items-center gap-2.5">
                     <div className={`w-2.5 h-2.5 rounded-full ${
                        inv.status === 'Paid' ? 'bg-green-500' :
                        inv.status === 'Pending' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}></div>
                     <span className="text-[11px] font-black text-gray-400 dark:text-gray-500 tracking-wider uppercase">{inv.id}</span>
                   </div>
                   <span className="text-base font-black text-gray-900 dark:text-white tracking-tight">₦{inv.totalAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white text-[15px] tracking-tight">{inv.customerName}</h3>
                    <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-tighter">{inv.date}</p>
                  </div>
                  <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    inv.status === 'Paid' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 border-green-100 dark:border-green-900/40' :
                    inv.status === 'Pending' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-100 dark:border-amber-900/40' :
                    'bg-red-50 dark:bg-red-900/20 text-red-600 border-red-100 dark:border-red-900/40'
                  }`}>
                    {inv.status}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filteredInvoices.length === 0 && (
            <div className="text-center py-12 opacity-30 flex flex-col items-center text-gray-400 dark:text-gray-500">
              <Wallet size={48} className="mb-2" />
              <p className="font-black">No history found</p>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-8 flex flex-col items-center pb-8"
        >
           <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold mb-3 tracking-widest">Showing {filteredInvoices.length} of 128 past invoices</p>
           <button className="bg-blue-50 dark:bg-zinc-800 text-brand-primary px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-blue-100 dark:hover:bg-zinc-700 transition-colors flex items-center gap-2">
             VIEW ALL HISTORY <ChevronRight size={14} />
           </button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
