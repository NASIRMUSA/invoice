"use client";
import { useRouter } from 'next/navigation';
import BottomNav from '../../../components/BottomNav';
import { 
  ArrowLeft, Users, UserPlus, Search, 
  Phone, Mail, History, MessageSquare,
  ChevronRight, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const customerFeatures = [
  {
    id: 'add-customer',
    icon: UserPlus,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    title: 'Add New Clients',
    content: 'Quickly add customers by entering their name, email, and phone number. You can also import from contacts.',
  },
  {
    id: 'search-filter',
    icon: Search,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    title: 'Fast Search',
    content: 'Find any client in seconds using the search bar. Filter by recent activity or alphabetical order.',
  },
  {
    id: 'customer-history',
    icon: History,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    title: 'Track Activity',
    content: 'View every invoice and payment associated with a customer to understand your business relationship.',
  },
  {
    id: 'quick-contact',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    title: 'Quick Contact',
    content: 'Call or email your clients directly from their profile with a single tap.',
  },
];

export default function CustomersGuideScreen() {
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
        
        {/* Hero Section */}
        <div className="mb-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-blue-500/20"
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-[28px] font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-2">Managing Customers</h2>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Everything you need to know about organizing your client database and tracking their activity.
          </p>
        </div>

        {/* Feature List */}
        <div className="space-y-4 mb-10">
          {customerFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-[24px] p-5 border border-slate-100 dark:border-zinc-800 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">{feature.title}</h3>
                    <p className="text-[14px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Action Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900 dark:bg-white rounded-[24px] p-6 text-white dark:text-zinc-900 shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="text-[12px] font-black uppercase tracking-widest opacity-80">Pro Tip</span>
            </div>
            <h3 className="text-[19px] font-black tracking-tight mb-3">Build Stronger Relationships</h3>
            <p className="text-[14px] opacity-90 font-medium leading-relaxed mb-6">
              Use the "Notes" section in each customer profile to remember important details like their preferred payment terms or business birthdays.
            </p>
            <div className="flex gap-3">
              <div className="flex-1 h-10 bg-white/10 dark:bg-zinc-100 rounded-xl flex items-center justify-center gap-2">
                <Phone size={16} />
                <span className="text-[13px] font-bold">Call</span>
              </div>
              <div className="flex-1 h-10 bg-white/10 dark:bg-zinc-100 rounded-xl flex items-center justify-center gap-2">
                <Mail size={16} />
                <span className="text-[13px] font-bold">Email</span>
              </div>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl" />
        </motion.div>

        {/* Navigation Button */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/customers')}
          className="w-full mt-10 bg-brand-primary py-4 rounded-[18px] text-white font-black text-[16px] flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 mb-4"
        >
          Go to Customers
          <ChevronRight size={20} />
        </motion.button>

      </main>

      <BottomNav />
    </div>
  );
}
