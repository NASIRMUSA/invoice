"use client";
import { useRouter } from 'next/navigation';
import BottomNav from '../../../components/BottomNav';
import { 
  ArrowLeft, Ticket, Users, PlusCircle, 
  MinusCircle, FileText, Download, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function InvoiceGuideScreen() {
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
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
            <Ticket className="w-8 h-8 text-brand-primary" />
          </div>
          <h2 className="text-[28px] font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-2">Master Invoicing</h2>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium max-w-[280px] leading-relaxed">
            Follow this 4-step flow to create and send professional invoices in seconds.
          </p>
        </div>

        {/* Step 01: Select Customer */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-slate-100 dark:border-zinc-800 mb-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="bg-blue-50 dark:bg-blue-900/30 text-brand-primary text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase">Step 01</span>
            <Users className="w-5 h-5 text-brand-primary" />
          </div>
          <h3 className="text-[18px] font-black text-gray-900 dark:text-white tracking-tight mb-2">Select Customer</h3>
          <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6">
            Choose an existing client from your database or create a new profile instantly.
          </p>
          
          {/* Customer Mock Visual */}
          <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl p-3 flex items-center gap-3 border border-blue-100/50 dark:border-blue-800/30">
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-[13px]">JD</div>
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-24 bg-slate-200 dark:bg-zinc-700 rounded-full" />
              <div className="h-1.5 w-16 bg-slate-100 dark:bg-zinc-800 rounded-full" />
            </div>
            <CheckCircle2 size={16} className="text-brand-primary" />
          </div>
        </motion.div>

        {/* Grid for Step 02 & 03 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Step 02 */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col"
          >
            <span className="bg-blue-50 dark:bg-blue-900/30 text-brand-primary text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase w-fit mb-4">Step 02</span>
            <h3 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight mb-2">Add Items</h3>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed flex-1 mb-6">
              Tap the icon to add services.
            </p>
            <div className="flex justify-center">
              <PlusCircle className="w-10 h-10 text-brand-primary" />
            </div>
          </motion.div>

          {/* Step 03 */}
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col"
          >
            <span className="bg-blue-50 dark:bg-blue-900/30 text-brand-primary text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase w-fit mb-4">Step 03</span>
            <h3 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight mb-2">Quantities</h3>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed flex-1 mb-6">
              Fine-tune the volume for accurate billing.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-2.5 flex items-center justify-between">
              <MinusCircle size={18} className="text-brand-primary opacity-60" />
              <span className="text-[15px] font-black text-brand-primary">05</span>
              <PlusCircle size={18} className="text-brand-primary" />
            </div>
          </motion.div>
        </div>

        {/* Step 04: Generate PDF */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-primary rounded-[24px] p-7 text-white mb-8 relative overflow-hidden shadow-lg shadow-blue-500/20"
        >
          {/* Subtle background icon */}
          <FileText className="absolute top-4 right-4 w-12 h-12 text-white/10" strokeWidth={1} />
          
          <div className="relative z-10">
            <span className="bg-white/20 text-white text-[11px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase mb-4 inline-block">Step 04</span>
            <h3 className="text-[20px] font-black tracking-tight mb-2">Generate PDF</h3>
            <p className="text-[14px] text-blue-50 font-medium leading-relaxed mb-6 opacity-90">
              Review and finalize. One click creates a beautiful, professional PDF ready for your client.
            </p>
            
            <button className="w-full bg-white text-brand-primary py-3 rounded-[14px] font-black text-[15px] flex items-center justify-center gap-2.5 shadow-md shadow-blue-900/20">
              <Download size={18} />
              Save as PDF
            </button>
          </div>
        </motion.div>

      </main>

      <BottomNav />
    </div>
  );
}
