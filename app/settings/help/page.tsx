"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../../components/BottomNav';
import { 
  ArrowLeft, Search, Rocket, Shield, Package, 
  FileText, CreditCard, Users, BarChart3,
  MessageCircle, Mail, Phone, ChevronRight, User
} from 'lucide-react';
import { motion } from 'framer-motion';

const topQuestions = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    subtitle: 'Set up your business in 5 minutes',
    icon: Rocket,
    featured: true,
  },
  {
    id: 'security',
    title: 'Security & PIN',
    subtitle: 'Protect your account',
    icon: Shield,
    featured: false,
  },
  {
    id: 'inventory',
    title: 'Managing Inventory',
    subtitle: 'Track your stock',
    icon: Package,
    featured: false,
  },
];

const categories = [
  { id: 'invoices', label: 'Creating Invoices', icon: FileText },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
];

const contactOptions = [
  {
    id: 'chat',
    title: 'Chat with us',
    subtitle: 'Response time: ~2 mins',
    icon: MessageCircle,
    iconBg: 'bg-brand-primary',
  },
  {
    id: 'email',
    title: 'Send an Email',
    subtitle: 'support@invoicely.ng',
    icon: Mail,
    iconBg: 'bg-emerald-500',
  },
  {
    id: 'call',
    title: 'Call Support',
    subtitle: 'Mon-Fri, 8am - 6pm',
    icon: Phone,
    iconBg: 'bg-violet-500',
  },
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-transparent sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Help Center</h1>
        <div className="w-9 h-9 bg-blue-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-blue-100 dark:border-zinc-700 shadow-sm">
          <User className="w-5 h-5 text-brand-primary" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar pt-4">
        
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="How can we help you today?"
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors text-[14px]"
            />
          </div>
        </motion.div>

        {/* Top Questions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-[15px] font-black text-gray-900 dark:text-white tracking-tight mb-3">Top Questions</h3>
          <div className="flex flex-col gap-3">
            {topQuestions.map((item) => {
              const IconComponent = item.icon;
              
              if (item.featured) {
                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-primary rounded-[20px] p-5 text-left shadow-md shadow-blue-500/20 dark:shadow-blue-900/30 relative overflow-hidden"
                  >
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3 backdrop-blur-sm">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-[15px] font-black text-white tracking-tight">{item.title}</h4>
                      <p className="text-[13px] text-blue-100 font-medium mt-0.5">{item.subtitle}</p>
                    </div>
                  </motion.button>
                );
              }
              
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (item.id === 'security') router.push('/settings/help/security');
                    if (item.id === 'inventory') router.push('/settings/help/inventory');
                  }}
                  className="w-full bg-white dark:bg-zinc-900 rounded-[20px] px-5 py-4 flex items-center gap-4 text-left shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 transition-colors hover:bg-slate-50 dark:hover:bg-zinc-800/50"
                >
                  <div className="w-10 h-10 bg-blue-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 dark:text-white tracking-tight">{item.title}</h4>
                    <p className="text-[12px] text-gray-500 dark:text-gray-400 font-medium mt-0.5">{item.subtitle}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Browse Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-[15px] font-black text-gray-900 dark:text-white tracking-tight mb-3">Browse Categories</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    if (cat.id === 'invoices') router.push('/settings/help/invoices');
                    if (cat.id === 'clients') router.push('/settings/help/customers');
                    if (cat.id === 'reports') router.push('/settings/help/reports');
                  }}
                  className="bg-white dark:bg-zinc-900 rounded-[20px] p-5 flex flex-col items-center justify-center gap-2.5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors aspect-square"
                >
                  <div className="w-11 h-11 bg-blue-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center">
                    <CatIcon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-900 dark:text-white text-center leading-tight">{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Need More Help */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mb-6"
        >
          <div className="bg-slate-100/80 dark:bg-zinc-900/80 rounded-[24px] p-5 border border-slate-200/50 dark:border-zinc-800">
            <h3 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight mb-1">Need more help?</h3>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mb-5 leading-relaxed">
              Our support team is available 24/7 to help you grow your business.
            </p>

            <div className="flex flex-col gap-3">
              {contactOptions.map((option) => {
                const ContactIcon = option.icon;
                return (
                  <motion.button
                    key={option.id}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white dark:bg-zinc-800 rounded-2xl px-4 py-3.5 flex items-center justify-between shadow-sm border border-slate-100 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 ${option.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <ContactIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-[14px] font-bold text-gray-900 dark:text-white">{option.title}</h4>
                        <p className="text-[12px] text-brand-primary font-semibold mt-0.5">{option.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

      </main>

      <BottomNav />
    </div>
  );
}
