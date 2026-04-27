"use client";
import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import BottomNav from '../../components/BottomNav';
import { ArrowLeft, MoreVertical, Mail, Phone, MapPin, TrendingUp, AlertCircle, Edit3, Plus, Receipt, Trash2, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomerProfileScreen() {
  const params = useParams();
  const router = useRouter();
  const { customers, deleteCustomer, updateCustomer } = useAppStore();
  const { showToast } = useToastStore();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLocation, setEditLocation] = useState('');
  
  const customerId = params.id as string;
  const customer = customers.find(c => c.id === customerId);
  
  const handleOpenEdit = () => {
    setEditName(customer?.name || '');
    setEditEmail(customer?.email || '');
    setEditPhone(customer?.phone || '');
    setEditLocation(customer?.location || '');
    setIsEditModalOpen(true);
  };

  const handleSaveCustomer = () => {
    if (!editName.trim()) {
      showToast('Customer name is required', 'error');
      return;
    }
    
    updateCustomer(customerId, {
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      location: editLocation.trim() || 'N/A',
    });
    
    showToast(`${editName} updated!`, 'success');
    setIsEditModalOpen(false);
  };

  const handleDeleteCustomer = () => {
    deleteCustomer(customerId);
    showToast(`${customer?.name} deleted!`, 'success');
    router.push('/customers');
  };

  if (!customer) {
    return (
      <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 items-center justify-center p-6 text-center">
         <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Customer Not Found</h2>
         <button onClick={() => router.back()} className="text-brand-primary font-medium hover:underline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      <header className="px-6 pt-6 pb-4 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-20 shadow-sm shadow-slate-100 dark:shadow-zinc-800">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors -ml-2">
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Customer Profile</span>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors -mr-2">
             <MoreVertical className="w-6 h-6" />
          </button>
          
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)}></div>
              <div className="absolute top-12 right-0 w-48 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-zinc-900/50 border border-slate-100 dark:border-zinc-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                 <button 
                   onClick={() => {
                     setIsMenuOpen(false);
                     setIsDeleteModalOpen(true);
                   }}
                   className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-medium text-left"
                 >
                    <Trash2 className="w-4 h-4" />
                    Delete Customer
                 </button>
              </div>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-24 hide-scrollbar">
        {/* Profile Info */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center text-center mb-8"
        >
           <div className="relative mb-4">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden border-4 border-white dark:border-zinc-900 shadow-md ${!customer.avatar && customer.color}`}>
                 {customer.avatar ? (
                   <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover bg-rose-400" />
                 ) : (
                   <span className="text-4xl font-bold">{customer.initials}</span>
                 )}
              </div>
              <div className="absolute bottom-0 right-1 w-8 h-8 bg-emerald-400 border-[3px] border-white dark:border-zinc-900 rounded-full flex items-center justify-center shadow-sm">
                 <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                 </svg>
              </div>
           </div>
           
           <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-2">{customer.name}</h1>
           <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4 gap-2">
              <Mail className="w-4 h-4" />
              <span className="text-[15px] font-medium">{customer.email || 'No email provided'}</span>
           </div>
           
           <div className="flex items-center justify-center gap-3 w-full flex-wrap">
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-brand-primary dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-blue-100 dark:border-blue-900/30">
                 <Phone className="w-4 h-4" />
                 {customer.phone || 'N/A'}
              </div>
              <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-brand-primary dark:text-blue-400 px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-blue-100 dark:border-blue-900/30">
                 <MapPin className="w-4 h-4" />
                 {customer.location}
              </div>
           </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-5 rounded-[24px] shadow-sm flex flex-col justify-between h-32 hover:border-brand-primary/20 transition-colors">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Total Revenue</p>
            <p className="text-[22px] font-black text-gray-900 dark:text-white mb-2 tracking-tight">₦1,450,000</p>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
               <TrendingUp className="w-3.5 h-3.5" strokeWidth={3} />
               <span className="text-[10px] font-bold">12% increase</span>
            </div>
          </div>
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-5 rounded-[24px] shadow-sm flex flex-col justify-between h-32 hover:border-red-200 transition-colors">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Outstanding</p>
            <p className="text-[22px] font-black text-red-600 dark:text-red-500 mb-2 tracking-tight">₦{customer.amount.toLocaleString()}</p>
            <div className="flex items-center gap-1 text-red-600 dark:text-red-500">
               <AlertCircle className="w-3.5 h-3.5" strokeWidth={3} />
               <span className="text-[10px] font-bold">2 Overdue</span>
            </div>
          </div>
        </motion.div>

        {/* Invoice History */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4 px-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Invoice History</h2>
            <button className="text-brand-primary font-bold text-xs uppercase tracking-wider hover:underline">
              View All
            </button>
          </div>
          
          <div className="flex flex-col gap-4 mb-8">
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-[24px] border border-slate-100 dark:border-zinc-800 shadow-sm flex items-center gap-4 cursor-pointer hover:border-brand-primary/20 transition-all">
               <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-[16px] flex items-center justify-center flex-shrink-0">
                  <Receipt className="w-6 h-6 text-brand-primary" />
               </div>
               <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">#INV-001</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">Oct 24, 2023</p>
               </div>
               <div className="text-right flex flex-col items-end justify-center">
                  <p className="font-black text-gray-900 dark:text-white text-[15px] tracking-tight mb-1">₦110,187.50</p>
                  <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded uppercase tracking-widest">Paid</span>
               </div>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-5 rounded-[24px] border border-slate-100 dark:border-zinc-800 shadow-sm flex items-center gap-4 cursor-pointer hover:border-brand-primary/20 transition-all">
               <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-[16px] flex items-center justify-center flex-shrink-0">
                  <Receipt className="w-6 h-6 text-red-500" />
               </div>
               <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base">#INV-005</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">Nov 12, 2023</p>
               </div>
               <div className="text-right flex flex-col items-end justify-center">
                  <p className="font-black text-gray-900 dark:text-white text-[15px] tracking-tight mb-1">₦245,000.00</p>
                  <span className="text-[9px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded uppercase tracking-widest">Outstanding</span>
               </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-5 rounded-[24px] border border-slate-100 dark:border-zinc-800 shadow-sm flex items-center gap-4 cursor-pointer hover:border-brand-primary/20 transition-all opacity-80 hover:opacity-100">
               <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-[16px] flex items-center justify-center flex-shrink-0">
                  <Receipt className="w-6 h-6 text-brand-primary opacity-60" />
               </div>
               <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-500 dark:text-gray-400 text-base">#INV-003</h3>
                  <p className="text-sm text-gray-400 dark:text-gray-500 font-medium mt-0.5">Sep 15, 2023</p>
               </div>
               <div className="text-right flex flex-col items-end justify-center">
                  <p className="font-black text-gray-500 dark:text-gray-400 text-[15px] tracking-tight mb-1">₦85,000.00</p>
                  <span className="text-[9px] font-bold text-emerald-700/60 dark:text-emerald-300/60 bg-emerald-100/50 dark:bg-emerald-900/20 px-2 py-0.5 rounded uppercase tracking-widest">Paid</span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex gap-4"
        >
          <button onClick={handleOpenEdit} className="flex-1 flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary dark:border-brand-primary dark:text-brand-primary py-4 rounded-[20px] font-bold active:scale-[0.98] transition-all hover:bg-blue-50 dark:hover:bg-brand-primary/10">
            <Edit3 className="w-5 h-5" />
            Edit Profile
          </button>
          <button 
            onClick={() => router.push(`/create-invoice?name=${encodeURIComponent(customer.name)}`)}
            className="flex-1 flex items-center justify-center gap-2 bg-brand-primary text-white py-4 rounded-[20px] font-bold shadow-xl shadow-brand-primary/20 active:scale-[0.98] transition-all hover:brightness-110"
          >
            <Plus className="w-5 h-5" strokeWidth={3} />
            New Invoice
          </button>
        </motion.div>
      </main>

      {/* Edit Customer Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4 transition-all">
           <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 border border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Edit Customer</h2>
                 <button onClick={() => setIsEditModalOpen(false)} className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="flex flex-col gap-5">
                 <div>
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="e.g. John Doe" 
                      className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Email (Optional)</label>
                    <input 
                      type="email" 
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="john@example.com" 
                      className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Phone</label>
                       <input 
                         type="tel" 
                         value={editPhone}
                         onChange={(e) => setEditPhone(e.target.value)}
                         placeholder="+234..." 
                         className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Location</label>
                       <input 
                         type="text" 
                         value={editLocation}
                         onChange={(e) => setEditLocation(e.target.value)}
                         placeholder="Lagos, NG" 
                         className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                       />
                    </div>
                 </div>
                 
                 <button 
                   onClick={handleSaveCustomer}
                   className="w-full bg-brand-primary text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-brand-primary/20 mt-4 active:scale-[0.98] transition-all hover:brightness-110"
                 >
                    Update Customer
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4 transition-all">
           <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-zinc-800 text-center">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Delete Customer?</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
                 Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">{customer.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                 <button 
                   onClick={() => setIsDeleteModalOpen(false)}
                   className="flex-1 bg-slate-100 dark:bg-zinc-800 text-gray-900 dark:text-white py-4 rounded-2xl font-bold active:scale-[0.98] transition-all hover:bg-slate-200 dark:hover:bg-zinc-700"
                 >
                    Cancel
                 </button>
                 <button 
                   onClick={handleDeleteCustomer}
                   className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold shadow-xl shadow-red-500/20 active:scale-[0.98] transition-all hover:brightness-110"
                 >
                    Delete
                 </button>
              </div>
           </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
