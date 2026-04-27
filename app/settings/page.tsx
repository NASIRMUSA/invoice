"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { useAuthStore } from '@/lib/viewmodels/authStore';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import BottomNav from '../components/BottomNav';
import { 
  Menu, User, Briefcase, Bell, Banknote, Moon, HelpCircle, 
  Scale, FileText, LogOut, ChevronRight, CheckCircle2, ChevronLeft, Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SettingsScreen() {
  const router = useRouter();
  const { isDarkMode, toggleDarkMode, userProfile } = useAppStore();
  const { showToast } = useToastStore();
  const { logout } = useAuthStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'success');
    router.push('/auth');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-transparent sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-brand-primary dark:text-blue-500">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-[17px] font-black text-brand-primary dark:text-blue-500 tracking-tight">Settings</h1>
        <div className="w-9 h-9 bg-blue-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-blue-100 dark:border-zinc-700 shadow-sm">
          <User className="w-5 h-5 text-brand-primary" />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar pt-4">
        
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-zinc-900 rounded-[24px] p-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 mb-8 flex items-center gap-4 transition-colors"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border-2 border-white dark:border-zinc-900 shadow-sm">
              <User className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-900 rounded-full p-[2px]">
              <div className="bg-[#0052FF] text-white rounded-full w-5 h-5 flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3" strokeWidth={3} />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[19px] font-black text-gray-900 dark:text-white tracking-tight">{userProfile?.fullName || 'User'}</h2>
            <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">{userProfile?.email || 'email@example.com'}</p>
          </div>
        </motion.div>

        {/* Account Settings */}
        <div className="mb-8">
          <h3 className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 ml-2">Account Settings</h3>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-zinc-900 rounded-[24px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 overflow-hidden"
          >
            <Link href="/settings/profile" className="w-full px-5 py-4 flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <User className="w-5 h-5 text-brand-primary" />
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Edit Profile</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            </Link>
            <Link href="/auth/security" className="w-full px-5 py-4 flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <Lock className="w-5 h-5 text-brand-primary" />
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Security PIN</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            </Link>
            <Link href="/settings/business" className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <Briefcase className="w-5 h-5 text-brand-primary" />
                <div className="text-left">
                  <p className="text-[15px] font-bold text-gray-900 dark:text-white">Business Information</p>
                  <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Address, Phone, Logo</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            </Link>
          </motion.div>
        </div>

        {/* App Preferences */}
        <div className="mb-8">
          <h3 className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 ml-2">App Preferences</h3>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-zinc-900 rounded-[24px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 overflow-hidden"
          >
            <div className="w-full px-5 py-4 flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/50">
              <div className="flex items-center gap-4">
                <Bell className="w-5 h-5 text-brand-primary" />
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Notifications</span>
              </div>
              <button 
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notificationsEnabled ? 'bg-brand-primary' : 'bg-slate-200 dark:bg-zinc-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 shadow-sm ${notificationsEnabled ? 'left-[26px]' : 'left-[2px]'}`}></div>
              </button>
            </div>
            <button className="w-full px-5 py-4 flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <Banknote className="w-5 h-5 text-brand-primary" />
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Currency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-black text-brand-primary">NGN</span>
                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
              </div>
            </button>
            <button onClick={toggleDarkMode} className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <Moon className="w-5 h-5 text-brand-primary" />
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Theme</span>
              </div>
              <span className="text-[13px] font-black text-gray-600 dark:text-gray-300">{isDarkMode ? 'Dark' : 'Light'}</span>
            </button>
          </motion.div>
        </div>

        {/* Support */}
        <div className="mb-8">
          <h3 className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 ml-2">Support</h3>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-zinc-900 rounded-[24px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-zinc-800 overflow-hidden"
          >
            <button className="w-full px-5 py-4 flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <HelpCircle className="w-5 h-5 text-brand-primary" />
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Help Center</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            </button>
            <button className="w-full px-5 py-4 flex items-center justify-between border-b border-slate-50 dark:border-zinc-800/50 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <Scale className="w-5 h-5 text-brand-primary" />
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Privacy Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            </button>
            <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <FileText className="w-5 h-5 text-brand-primary" />
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">Terms of Service</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            </button>
          </motion.div>
        </div>

        {/* Logout */}
        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          onClick={handleLogout}
          className="w-full bg-[#FFF5F5] dark:bg-red-900/10 border border-[#FFE1E1] dark:border-red-900/30 text-[#D92D20] dark:text-red-500 py-4 rounded-[16px] font-bold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <LogOut size={18} strokeWidth={2.5} /> Logout
        </motion.button>
      </main>

      <BottomNav />
    </div>
  );
}
