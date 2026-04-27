"use client";
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';
import { ArrowLeft, User, Shield, Eye, Database, Share2, Cookie, Bell, Trash2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const policySections = [
  {
    id: 'data-collection',
    icon: Database,
    title: 'Data Collection',
    description: 'We collect information you provide directly, such as your name, email address, phone number, and business details when you create an account or use our services.',
  },
  {
    id: 'data-usage',
    icon: Eye,
    title: 'How We Use Your Data',
    description: 'Your data is used to provide, maintain, and improve our services, process transactions, send notifications, and personalize your experience.',
  },
  {
    id: 'data-protection',
    icon: Shield,
    title: 'Data Protection',
    description: 'We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information.',
  },
  {
    id: 'data-sharing',
    icon: Share2,
    title: 'Data Sharing',
    description: 'We do not sell your personal data. Information may be shared with trusted partners only to provide services you&apos;ve requested, or when required by law.',
  },
  {
    id: 'cookies',
    icon: Cookie,
    title: 'Cookies & Tracking',
    description: 'We use cookies and similar technologies to enhance functionality, analyze usage patterns, and deliver a personalized experience across our platform.',
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Communications',
    description: 'You may receive service-related emails and notifications. You can manage your communication preferences in your account settings at any time.',
  },
  {
    id: 'data-deletion',
    icon: Trash2,
    title: 'Data Deletion',
    description: 'You can request deletion of your personal data at any time. Upon request, we will remove your data within 30 days, except where retention is required by law.',
  },
];

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-transparent sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Privacy Policy</h1>
        <div className="w-9 h-9 bg-blue-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-blue-100 dark:border-zinc-700 shadow-sm">
          <User className="w-5 h-5 text-brand-primary" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar pt-4">
        
        {/* Header Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-brand-primary rounded-[20px] p-5 mb-6 relative overflow-hidden shadow-md shadow-blue-500/20 dark:shadow-blue-900/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[17px] font-black text-white tracking-tight">Your Privacy Matters</h2>
            <p className="text-[13px] text-blue-100 font-medium mt-1 leading-relaxed">
              We are committed to protecting your personal information and being transparent about how we use it.
            </p>
            <p className="text-[11px] text-blue-200/80 font-semibold mt-3">Last updated: April 2026</p>
          </div>
        </motion.div>

        {/* Policy Sections */}
        <div className="flex flex-col gap-3 mb-8">
          {policySections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * (index + 1) }}
                className="bg-white dark:bg-zinc-900 rounded-[20px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <SectionIcon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight mb-1.5">{section.title}</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{section.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mb-6"
        >
          <div className="bg-slate-100/80 dark:bg-zinc-900/80 rounded-[24px] p-5 border border-slate-200/50 dark:border-zinc-800">
            <h3 className="text-[15px] font-black text-gray-900 dark:text-white tracking-tight mb-1">Questions about your privacy?</h3>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mb-4 leading-relaxed">
              If you have any questions or concerns about our privacy practices, reach out to us.
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3.5 flex items-center gap-3.5 shadow-sm border border-slate-100 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700/50 transition-colors"
            >
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-[14px] font-bold text-gray-900 dark:text-white">Contact Privacy Team</h4>
                <p className="text-[12px] text-brand-primary font-semibold mt-0.5">privacy@invoicely.ng</p>
              </div>
            </motion.button>
          </div>
        </motion.div>

      </main>

      <BottomNav />
    </div>
  );
}
