"use client";
import { useRouter } from 'next/navigation';
import BottomNav from '../../../components/BottomNav';
import { 
  ArrowLeft, Shield, Lock, Fingerprint, 
  RefreshCw, Key, ShieldCheck, User,
  ChevronRight, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const securitySteps = [
  {
    id: 'setup-pin',
    icon: Lock,
    title: 'Setting up your PIN',
    content: 'Protect your financial data by enabling a 4-digit PIN. Go to Settings > Privacy > Security PIN to set it up.',
  },
  {
    id: 'biometrics',
    icon: Fingerprint,
    title: 'Biometric Access',
    content: 'For faster access, you can enable Fingerprint or Face ID once your PIN is set up.',
  },
  {
    id: 'change-pin',
    icon: RefreshCw,
    title: 'Changing your PIN',
    content: 'We recommend changing your PIN every 90 days. You can do this in the Security PIN settings.',
  },
  {
    id: 'reset-pin',
    icon: Key,
    title: 'Forgot your PIN?',
    content: 'If you forget your PIN, you can reset it using your account email verification.',
  },
];

const faqs = [
  {
    question: 'Is my data encrypted?',
    answer: 'Yes, all your business data and PIN are encrypted using industry-standard AES-256 encryption.',
  },
  {
    question: 'Can I use a 6-digit PIN?',
    answer: 'Currently, we support 4-digit PINs for the best balance of security and speed.',
  },
];

export default function SecurityGuideScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-transparent sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Security & PIN Guide</h1>
        <div className="w-9 h-9 bg-blue-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-blue-100 dark:border-zinc-700 shadow-sm">
          <User className="w-5 h-5 text-brand-primary" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar pt-4">
        
        {/* Featured Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-brand-primary rounded-[24px] p-6 mb-8 relative overflow-hidden shadow-lg shadow-blue-500/20 dark:shadow-blue-900/30"
        >
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-[20px] font-black text-white tracking-tight leading-tight mb-2">Secure your Business</h2>
            <p className="text-[14px] text-blue-100 font-medium leading-relaxed opacity-90">
              Your security is our top priority. Learn how to keep your business data safe and accessible only to you.
            </p>
          </div>
        </motion.div>

        {/* Security Steps */}
        <div className="mb-8">
          <h3 className="text-[15px] font-black text-gray-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
            Essential Steps
            <span className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
          </h3>
          <div className="flex flex-col gap-4">
            {securitySteps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                  className="bg-white dark:bg-zinc-900 rounded-[22px] p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] border border-slate-100 dark:border-zinc-800"
                >
                  <div className="flex gap-4">
                    <div className="w-11 h-11 bg-blue-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <StepIcon className="w-5 h-5 text-brand-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">{step.title}</h4>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{step.content}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pro Tips */}
        <div className="mb-8 bg-zinc-900 dark:bg-white rounded-[24px] p-6 text-white dark:text-zinc-900 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <ShieldCheck size={80} />
          </div>
          <h3 className="text-[16px] font-black tracking-tight mb-4 relative z-10">Pro Tips for a Strong PIN</h3>
          <ul className="space-y-3 relative z-10">
            <li className="flex items-start gap-3 text-[13px] font-medium opacity-90">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0" />
              Avoid easy combinations like "1234" or "0000".
            </li>
            <li className="flex items-start gap-3 text-[13px] font-medium opacity-90">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0" />
              Don't use your birth year or current year.
            </li>
            <li className="flex items-start gap-3 text-[13px] font-medium opacity-90">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full mt-1.5 flex-shrink-0" />
              Change your PIN if you suspect someone else knows it.
            </li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h3 className="text-[15px] font-black text-gray-900 dark:text-white tracking-tight mb-4">Frequently Asked Questions</h3>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                className="bg-slate-50 dark:bg-zinc-900/50 rounded-2xl p-4 border border-slate-100 dark:border-zinc-800"
              >
                <h4 className="text-[14px] font-bold text-gray-900 dark:text-white mb-1.5">{faq.question}</h4>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-emerald-50 dark:bg-emerald-950/20 rounded-[24px] p-5 border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-[14px] font-bold text-gray-900 dark:text-white tracking-tight">Security Status</h4>
              <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">Your account is protected</p>
            </div>
          </div>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/settings/privacy')}
            className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm border border-emerald-100 dark:border-zinc-700"
          >
            <ChevronRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </motion.button>
        </motion.div>

        {/* Warning Box */}
        <div className="mt-6 px-4 py-3 bg-red-50/50 dark:bg-red-950/10 rounded-2xl border border-red-100/50 dark:border-red-900/20 flex gap-3 items-start">
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-red-600 dark:text-red-400 font-medium leading-relaxed">
            Never share your PIN or account credentials with anyone, including InvoicePro support staff. We will never ask for your PIN.
          </p>
        </div>

      </main>

      <BottomNav />
    </div>
  );
}
