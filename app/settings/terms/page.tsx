"use client";
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';
import { ArrowLeft, User, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const termsSections = [
  {
    number: 1,
    title: 'Introduction & Acceptance',
    content: 'By accessing or using InvoicePro NG, you agree to be bound by these Terms of Service. These terms govern your use of our invoicing and payment tracking software designed for the Nigerian market. If you do not agree, please discontinue use immediately.',
    color: 'bg-brand-primary',
  },
  {
    number: 2,
    title: 'Account Registration',
    content: 'To use our services, you must register and provide valid and accurate business information. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.',
    color: 'bg-emerald-500',
  },
  {
    number: 3,
    title: 'Fees, Payments, and Invoicing',
    content: 'InvoicePro NG charges subscription fees for premium features. All fees are quoted in Nigerian Naira (NGN) unless stated otherwise. We use secure third-party payment processors to handle transactions. Refunds are subject to our refund policy.',
    color: 'bg-violet-500',
  },
  {
    number: 4,
    title: 'Prohibited Activities',
    content: 'Users may not use InvoicePro NG for fraudulent activity, money laundering, or unauthorized access to other accounts. We reserve the right to report suspicious activities to the relevant Nigerian authorities.',
    color: 'bg-red-500',
  },
  {
    number: 5,
    title: 'Intellectual Property',
    content: 'The software, logos, and branding of InvoicePro NG are the property of InvoicePro NG and its owners. Users are not allowed to copy, modify, or distribute content as they see fit, but given a license to host and process that data to provide the service.',
    color: 'bg-amber-500',
  },
  {
    number: 6,
    title: 'Termination',
    content: 'You may close your account at any time. We reserve the right to suspend or terminate accounts that violate these terms or fail to pay subscription fees for an extended period.',
    color: 'bg-teal-500',
  },
  {
    number: 7,
    title: 'Limitation of Liability',
    content: 'To the maximum extent permitted by Nigerian law, InvoicePro NG shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the platform.',
    color: 'bg-pink-500',
  },
  {
    number: 8,
    title: 'Governing Law',
    content: 'These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Nigeria.',
    color: 'bg-indigo-500',
  },
];

export default function TermsOfServiceScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-transparent sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Terms of Service</h1>
        <div className="w-9 h-9 bg-blue-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-blue-100 dark:border-zinc-700 shadow-sm">
          <User className="w-5 h-5 text-brand-primary" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar pt-4">
        
        {/* Legal Agreement Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <span className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Legal Agreement</span>
          <h2 className="text-[24px] font-black text-gray-900 dark:text-white tracking-tight mt-1 leading-tight">InvoicePro NG Terms</h2>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mt-1">Last Updated: April 25, 2026</p>
        </motion.div>

        {/* Terms Sections */}
        <div className="flex flex-col gap-4 mb-6">
          {termsSections.slice(0, 3).map((section, index) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * (index + 1) }}
              className="bg-white dark:bg-zinc-900 rounded-[20px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 ${section.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className="text-[13px] font-black text-white">{section.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight mb-1.5">{section.title}</h3>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Trust Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-brand-primary rounded-[20px] p-5 relative overflow-hidden shadow-md shadow-blue-500/20 dark:shadow-blue-900/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-[17px] font-black text-white tracking-tight mb-1">Trust is our foundation.</h3>
              <p className="text-[13px] text-blue-100 font-medium leading-relaxed">
                Building digital tools that empower Nigerian businesses and entrepreneurs with transparency.
              </p>
            </div>
          </motion.div>

          {termsSections.slice(3).map((section, index) => (
            <motion.div
              key={section.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + 0.05 * (index + 1) }}
              className="bg-white dark:bg-zinc-900 rounded-[20px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 ${section.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className="text-[13px] font-black text-white">{section.number}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight mb-1.5">{section.title}</h3>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-[12px] text-gray-400 dark:text-gray-500 font-medium text-center leading-relaxed mb-5 px-2"
        >
          By using InvoicePro NG, you acknowledge that you have read and understood these terms.
        </motion.p>

        {/* Accept Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.55 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-brand-primary text-white py-4 rounded-2xl font-bold text-[15px] shadow-md shadow-blue-500/20 active:opacity-90 transition-all mb-3"
        >
          Accept Terms &amp; Continue
        </motion.button>

        {/* Download PDF */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 text-brand-primary font-bold text-[14px] py-3 mb-2 active:opacity-70 transition-opacity"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </motion.button>

      </main>

      <BottomNav />
    </div>
  );
}
