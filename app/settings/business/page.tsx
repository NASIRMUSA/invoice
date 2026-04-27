"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { 
  ArrowLeft, Pencil, ShieldCheck, Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function BusinessInfoScreen() {
  const router = useRouter();
  const { businessProfile, updateBusinessProfile } = useAppStore();
  const { showToast } = useToastStore();
  
  const [formData, setFormData] = useState({
    businessName: businessProfile.name || '',
    address: businessProfile.address || '',
    phone: businessProfile.phone || '',
    website: businessProfile.website || '',
    tin: businessProfile.tin || ''
  });

  const handleSave = () => {
    updateBusinessProfile({
      name: formData.businessName,
      address: formData.address,
      phone: formData.phone,
      website: formData.website,
      tin: formData.tin
    });
    showToast('Business information updated!', 'success');
    router.back();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex justify-between items-center bg-transparent sticky top-0 z-20">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Business Information</h1>
        <button 
          onClick={handleSave}
          className="text-[15px] font-bold text-brand-primary active:scale-95 transition-transform"
        >
          Save
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-28 hide-scrollbar pt-2">
        
        {/* Logo Upload */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center justify-center mb-10 mt-2"
        >
          <div className="relative mb-3">
            <div className="w-[104px] h-[104px] rounded-[24px] bg-slate-900 dark:bg-zinc-800 shadow-md overflow-hidden flex items-center justify-center">
               <ImageIcon className="w-10 h-10 text-slate-700 dark:text-slate-600" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-[34px] h-[34px] bg-brand-primary border-[3px] border-slate-50 dark:border-zinc-950 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform">
               <Pencil className="w-[14px] h-[14px] text-white" strokeWidth={2.5} />
            </button>
          </div>
          <h2 className="text-[20px] font-black text-[#0B1B42] dark:text-white mt-1">Business Logo</h2>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 font-medium mt-1 tracking-tight">Recommended: 512×512px PNG or JPG</p>
        </motion.div>

        {/* Form */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-5 mb-8"
        >
          {/* Business Name */}
          <div>
            <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest ml-1">Registered Business Name</label>
            <input 
              type="text" 
              placeholder="e.g. Olu & Sons Ventures"
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white transition-colors"
            />
          </div>

          {/* Business Address */}
          <div>
            <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest ml-1">Business Address</label>
            <textarea 
              placeholder="Street address, City, State"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows={3}
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white transition-colors resize-none"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest ml-1">Contact Number</label>
            <div className="flex gap-2">
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 px-4 font-medium text-gray-900 dark:text-white shadow-sm shrink-0">
                +234
              </div>
              <input 
                type="tel" 
                placeholder="803 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="flex-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white transition-colors"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest ml-1">Website (Optional)</label>
            <input 
              type="url" 
              placeholder="www.yourbusiness.com"
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white transition-colors"
            />
          </div>
        </motion.div>

        {/* Tax Compliance */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-[#F4F7FF] dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-3xl p-5 mb-8"
        >
          <div className="flex items-start gap-3 mb-4">
            <ShieldCheck className="w-5 h-5 text-brand-primary mt-0.5 shrink-0" strokeWidth={2.5} />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-[15px] tracking-tight">Tax Compliance</h3>
              <p className="text-[13px] text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                Your Tax Identification Number (TIN) is required for official Nigerian invoices.
              </p>
            </div>
          </div>
          
          <div>
            <label className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase mb-2 block tracking-widest">Tax Identification Number (TIN)</label>
            <input 
              type="text" 
              placeholder="12345678-0001"
              value={formData.tin}
              onChange={(e) => setFormData({...formData, tin: e.target.value})}
              className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-3.5 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white transition-colors"
            />
          </div>
        </motion.div>
      </main>

      {/* Pinned Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent dark:from-zinc-950 dark:via-zinc-950 pb-8 z-10 pointer-events-none">
        <button 
          onClick={handleSave}
          className="w-full pointer-events-auto bg-[#0D47A1] text-white py-4 rounded-[16px] font-bold text-[15px] shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all"
        >
          Update Business Info
        </button>
      </div>
    </div>
  );
}
