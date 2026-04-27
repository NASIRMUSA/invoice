"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { useAppStore } from '@/lib/viewmodels/appStore';
import BottomNav from '../../components/BottomNav';
import { 
  ArrowLeft, Camera, User, Mail, Phone, ChevronDown, Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function EditProfileScreen() {
  const router = useRouter();
  const { userProfile, updateUserProfile } = useAppStore();
  const { showToast } = useToastStore();
  
  const [formData, setFormData] = useState({
    fullName: userProfile.fullName || '',
    email: userProfile.email || '',
    phone: userProfile.phone || '',
    sector: 'Professional Services'
  });

  const handleSave = () => {
    updateUserProfile({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone
    });
    showToast('Profile updated successfully!', 'success');
    router.back();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex justify-between items-center bg-transparent sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Settings</h1>
        <button 
          onClick={handleSave}
          className="text-[15px] font-bold text-brand-primary active:scale-95 transition-transform"
        >
          Save
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24 hide-scrollbar pt-2">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-[26px] font-black text-[#0B1B42] dark:text-white tracking-tight leading-tight">Edit Profile</h2>
          <p className="text-[14px] text-gray-600 dark:text-gray-400 font-medium mt-1">Keep your business information up to date.</p>
        </motion.div>

        {/* Photo Upload */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center justify-center mb-8"
        >
          <div className="relative mb-3">
            <div className="w-[104px] h-[104px] rounded-full bg-slate-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 shadow-md overflow-hidden flex items-center justify-center">
               <User className="w-12 h-12 text-slate-400 dark:text-slate-500" />
            </div>
            <button className="absolute bottom-0 right-0 w-[34px] h-[34px] bg-brand-primary border-[3px] border-white dark:border-zinc-900 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform">
               <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <button className="text-[13px] font-bold text-brand-primary uppercase tracking-widest active:opacity-70 transition-opacity">
            CHANGE PHOTO
          </button>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-5 mb-8"
        >
          {/* Full Name */}
          <div>
            <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-4 pr-11 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white transition-colors"
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-zinc-600 pointer-events-none" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-4 pr-11 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white transition-colors"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-zinc-600 pointer-events-none" />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest ml-1">Phone Number</label>
            <div className="relative">
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-4 pr-11 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white transition-colors"
              />
              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-zinc-600 pointer-events-none" />
            </div>
          </div>

          {/* Business Sector */}
          <div>
            <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest ml-1">Business Sector</label>
            <div className="relative cursor-pointer">
              <select 
                value={formData.sector}
                onChange={(e) => setFormData({...formData, sector: e.target.value})}
                className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 pl-4 pr-11 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white appearance-none cursor-pointer transition-colors"
              >
                <option value="Professional Services">Professional Services</option>
                <option value="Retail">Retail</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Other">Other</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-zinc-500 pointer-events-none" />
            </div>
          </div>
        </motion.div>

        <div className="h-px w-full bg-slate-200 dark:bg-zinc-800 mb-6"></div>

        {/* Deactivate Account */}
        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex items-center gap-3 text-[#D92D20] dark:text-red-500 font-bold text-[14px] px-2 active:opacity-70 transition-opacity"
        >
          <Trash2 className="w-5 h-5" /> Deactivate Account
        </motion.button>
      </main>

      <BottomNav />
    </div>
  );
}
