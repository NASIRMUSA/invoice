"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAppStore, useDashboardStats } from '@/lib/viewmodels/appStore';
import BottomNav from '../components/BottomNav';
import { 
  Wallet, User, Search, Filter, ArrowUpRight, ArrowDownLeft, 
  CreditCard, Banknote, Calendar, ChevronRight 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentsScreen() {
  const { invoices } = useAppStore();
  const stats = useDashboardStats();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock payments based on paid invoices
  const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
  
  const filteredPayments = paidInvoices.filter(inv => 
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
        
        {/* Payments Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-brand-primary text-white p-6 rounded-[32px] shadow-2xl shadow-brand-primary/20 mb-8 relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 opacity-10">
            <CreditCard className="w-32 h-32 rotate-12" />
          </div>
          
          <div className="relative z-10">
            <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1">Total Revenue</p>
            <h2 className="text-4xl font-black tracking-tight mb-6">₦{stats.totalSales.toLocaleString()}</h2>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-blue-100 text-[9px] font-black uppercase tracking-widest mb-1">Inflow</p>
                <div className="flex items-center gap-1.5 text-green-300">
                  <ArrowDownLeft size={16} strokeWidth={3} />
                  <span className="font-bold text-[15px]">₦{stats.totalSales.toLocaleString()}</span>
                </div>
              </div>
              <div>
                <p className="text-blue-100 text-[9px] font-black uppercase tracking-widest mb-1">Outflow</p>
                <div className="flex items-center gap-1.5 text-blue-200">
                  <ArrowUpRight size={16} strokeWidth={3} />
                  <span className="font-bold text-[15px]">₦0.00</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[15px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Recent Payments</h2>
          <button className="bg-white dark:bg-zinc-900 p-2 rounded-xl border border-slate-100 dark:border-zinc-800 shadow-sm text-gray-400">
            <Filter size={18} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search payments..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-3.5 pl-11 pr-4 text-[13px] outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white"
          />
        </div>

        {/* Payments List */}
        <div className="flex flex-col gap-4">
          {filteredPayments.length > 0 ? filteredPayments.map((pay) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={pay.id} 
              className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-50 dark:border-zinc-800 shadow-sm flex items-center gap-4 hover:border-brand-primary/10 transition-all"
            >
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Banknote size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-gray-900 dark:text-white text-[15px] truncate tracking-tight">{pay.customerName}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">INV-{pay.id}</span>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-zinc-700"></div>
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">{pay.date}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-emerald-600 dark:text-emerald-400 text-base tracking-tight">+₦{pay.totalAmount.toLocaleString()}</p>
                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Success</span>
              </div>
            </motion.div>
          )) : (
            <div className="text-center py-20 opacity-30 flex flex-col items-center text-gray-400 dark:text-gray-500">
              <Banknote size={48} className="mb-2" />
              <p className="font-black tracking-widest uppercase text-xs">No payments found</p>
            </div>
          )}
        </div>

        {/* Quick Insights */}
        <div className="mt-10 mb-6">
          <h3 className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Payment Methods</h3>
          <div className="flex gap-4">
             <div className="flex-1 bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <CreditCard size={18} />
                </div>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Cards</p>
                <p className="text-[15px] font-black text-gray-900 dark:text-white">65%</p>
             </div>
             <div className="flex-1 bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                <div className="w-9 h-9 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-xl flex items-center justify-center mb-3">
                  <Banknote size={18} />
                </div>
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Transfers</p>
                <p className="text-[15px] font-black text-gray-900 dark:text-white">35%</p>
             </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
