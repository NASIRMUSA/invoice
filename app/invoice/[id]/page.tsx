"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/viewmodels/appStore';
import BottomNav from '../../components/BottomNav';
import { 
  ArrowLeft, User, MapPin, Phone, ReceiptText, 
  CheckCircle2, Armchair, Mouse, Share2, FileText 
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function InvoiceDetailsScreen() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { invoices } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const invoice = invoices.find(inv => inv.id === id) || invoices[0];

  if (!mounted) return null;

  const subtotal = invoice.items.length > 0 
    ? invoice.items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
    : 102500; // Mock subtotal for fallback
  
  const vat = subtotal * 0.075;
  const total = subtotal + vat;

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      <header className="px-6 pt-6 pb-4 flex justify-between items-center bg-transparent sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-brand-primary dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Invoice Details</h1>
        <Link href="/settings" className="w-9 h-9 bg-slate-800 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer">
          <User className="w-5 h-5 text-slate-300" />
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar">
        {/* Main Invoice Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 mb-4 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-[22px] font-black text-gray-900 dark:text-white tracking-tight">#{invoice.id}</h2>
              <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mt-1">Issued on {invoice.date}</p>
            </div>
            <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-black tracking-widest uppercase ${
              invoice.status === 'Paid' ? 'bg-[#7EFCB3]/30 text-[#0E9F52]' :
              invoice.status === 'Pending' ? 'bg-amber-100 text-amber-600' :
              'bg-red-100 text-red-600'
            }`}>
              {invoice.status === 'Paid' && <CheckCircle2 size={12} strokeWidth={3} />}
              {invoice.status}
            </div>
          </div>
        </motion.div>

        {/* Customer Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 mb-4 transition-colors"
        >
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-brand-primary" strokeWidth={2.5} />
            <h3 className="text-[15px] font-black text-brand-primary tracking-tight">Customer</h3>
          </div>
          <h4 className="text-[15px] font-bold text-gray-900 dark:text-white mb-3">{invoice.customerName}</h4>
          
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug">
                12 Admiralty Way, Lekki Phase 1, Lagos
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug">
                +234 803 123 4567
              </span>
            </div>
          </div>
        </motion.div>

        {/* Line Items Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 mb-4 overflow-hidden transition-colors"
        >
          <div className="bg-[#F4F7FF] dark:bg-zinc-800/50 p-4 flex items-center gap-2 border-b border-slate-100 dark:border-zinc-800">
            <ReceiptText className="w-5 h-5 text-[#1E3A8A] dark:text-blue-400" strokeWidth={2.5} />
            <h3 className="text-[15px] font-black text-[#0B1B42] dark:text-white tracking-tight">Line Items</h3>
          </div>
          
          <div className="flex flex-col">
            {invoice.items.length > 0 ? invoice.items.map((item, idx) => (
              <div key={idx} className={`p-4 flex items-center gap-4 ${idx !== invoice.items.length - 1 ? 'border-b border-slate-100 dark:border-zinc-800' : ''}`}>
                <div className="w-12 h-12 bg-[#EEF2FF] dark:bg-zinc-800 rounded-[14px] flex items-center justify-center flex-shrink-0 text-[#2563EB] dark:text-blue-400">
                  {item.product.name.includes('Chair') ? <Armchair size={20} /> : <Mouse size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-bold text-gray-900 dark:text-white truncate">{item.product.name}</h4>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{item.quantity} x ₦{item.product.price.toLocaleString()}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[16px] font-black text-gray-900 dark:text-white">₦{(item.quantity * item.product.price).toLocaleString()}</p>
                </div>
              </div>
            )) : (
              // Mock items to match design if empty
              <>
                <div className="p-4 flex items-center gap-4 border-b border-slate-100 dark:border-zinc-800">
                  <div className="w-12 h-12 bg-[#EEF2FF] dark:bg-zinc-800 rounded-[14px] flex items-center justify-center flex-shrink-0 text-[#2563EB] dark:text-blue-400">
                    <Armchair size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-gray-900 dark:text-white truncate">Modern Office Chair</h4>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">2 x ₦45,000</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[16px] font-black text-gray-900 dark:text-white">₦90,000</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#EEF2FF] dark:bg-zinc-800 rounded-[14px] flex items-center justify-center flex-shrink-0 text-[#2563EB] dark:text-blue-400">
                    <Mouse size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-gray-900 dark:text-white truncate">Ergonomic Mouse</h4>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">1 x ₦12,500</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[16px] font-black text-gray-900 dark:text-white">₦12,500</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Total Blue Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-[#2563EB] rounded-[24px] p-5 text-white mb-6 shadow-lg shadow-blue-600/20 relative overflow-hidden"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] text-blue-100">Subtotal</span>
            <span className="text-[15px] font-bold">₦{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-[13px] text-blue-100">VAT (7.5%)</span>
            <span className="text-[15px] font-bold">₦{vat.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
          
          <div className="h-px bg-blue-400/50 mb-4 w-full"></div>
          
          <div className="flex justify-between items-center">
            <span className="text-[17px] font-black tracking-tight">Total Amount</span>
            <span className="text-[24px] font-black tracking-tight">₦{total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col gap-3"
        >
          <button className="w-full bg-[#0D47A1] text-white py-4 rounded-[16px] font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <Share2 size={18} strokeWidth={2.5} /> Share Invoice
          </button>
          <button className="w-full bg-transparent border-2 border-[#0D47A1] text-[#0D47A1] dark:border-blue-500 dark:text-blue-500 py-4 rounded-[16px] font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <FileText size={18} strokeWidth={2.5} /> Download PDF
          </button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
