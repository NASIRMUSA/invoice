"use client";
import { useRouter } from 'next/navigation';
import { 
  CalendarX, Lock, FileText, 
  Package, BarChart3, ArrowRight,
  Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExpiredContent() {
  const router = useRouter();

  const lockedFeatures = [
    {
      title: "Unlimited Invoices",
      description: "Create and send professional invoices without limits.",
      icon: <FileText className="text-blue-600" size={20} />,
    },
    {
      title: "Inventory Management",
      description: "Track stock levels and get low inventory alerts.",
      icon: <Package className="text-blue-600" size={20} />,
    },
    {
      title: "Financial Reports",
      description: "Deep dive into tax, profit, and revenue insights.",
      icon: <BarChart3 className="text-blue-600" size={20} />,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 transition-colors">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="w-6" />
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <FileText className="text-white w-5 h-5" />
           </div>
           <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white">InvoicePro</span>
        </div>
        <div className="w-6" />
      </header>

      <main className="flex-1 px-6 pb-12 pt-4 flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-8"
        >
          <CalendarX className="text-red-500 w-12 h-12" />
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-[32px] font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-4">
            Your Subscription Has Expired
          </h1>
          <p className="text-[16px] text-gray-500 dark:text-gray-400 font-medium px-4">
            Renew your plan to continue managing your business and generating invoices without interruption.
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 rounded-[32px] p-6 mb-10 relative overflow-hidden"
        >
          <div className="absolute top-4 right-6 opacity-10">
            <Lock size={80} />
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Lock className="text-brand-primary" size={20} />
            </div>
            <h2 className="text-[18px] font-black text-gray-900 dark:text-white">Locked Premium Features</h2>
          </div>

          <div className="space-y-4">
            {lockedFeatures.map((feature, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-slate-100 dark:border-zinc-800 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-black text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-md space-y-4"
        >
          <button 
            onClick={() => router.push('/auth/subscription')}
            className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-brand-primary/25 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
          >
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <ArrowRight size={14} className="text-white" />
            </div>
            Renew Now
          </button>
          
          <button 
            className="w-full py-4 text-gray-500 dark:text-gray-400 font-bold text-[15px] flex items-center justify-center gap-2 hover:text-brand-primary transition-colors"
          >
            <Headphones size={20} />
            Contact Support
          </button>
        </motion.div>
      </main>
    </div>
  );
}
