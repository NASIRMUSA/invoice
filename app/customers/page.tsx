"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAppStore } from '@/lib/viewmodels/appStore';
import BottomNav from '../components/BottomNav';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import { Search, SlidersHorizontal, Users, Wallet, ChevronRight, Plus, User, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CustomersScreen() {
  const { customers, addCustomer, userProfile } = useAppStore();
  const { showToast } = useToastStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleSaveCustomer = () => {
    if (!newName.trim()) {
      showToast('Customer name is required', 'error');
      return;
    }
    
    // Auto-generate initials
    const initials = newName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'NA';
    
    addCustomer({
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      location: newLocation.trim() || 'N/A',
      status: 'Paid', // Default
      amount: 0,
      initials: initials,
      color: 'bg-blue-100 text-blue-600',
    });
    
    showToast(`${newName} added!`, 'success');
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewLocation('');
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCustomers = customers.length;
  // Calculate outstanding based on status or total (using simple mock logic for outstanding sum)
  const totalOutstanding = customers
    .filter(c => c.status === 'Outstanding')
    .reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      <header className="px-6 pt-6 pb-4 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-20 shadow-sm shadow-slate-100 dark:shadow-zinc-800">
        <button className="w-10 h-10 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
          <Search className="w-6 h-6" />
        </button>
        <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Customers</span>
        <Link href="/settings" className="w-10 h-10 bg-blue-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-blue-100 dark:border-zinc-700 shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer">
           {userProfile.avatar ? (
             <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
           ) : (
             <User className="w-6 h-6 text-brand-primary" />
           )}
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-4 pb-24 hide-scrollbar">
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative mb-6"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Find customers by name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-[20px] shadow-sm flex flex-col justify-between h-28 hover:border-brand-primary/20 transition-colors">
            <div className="flex items-center gap-2 mb-2">
               <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
               <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total<br/>Customers</p>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{totalCustomers}</p>
          </div>
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-5 rounded-[20px] shadow-sm flex flex-col justify-between h-28 hover:border-red-200 transition-colors">
             <div className="flex items-center gap-2 mb-2">
               <Wallet className="w-5 h-5 text-red-600 dark:text-red-500" />
               <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Outstanding</p>
             </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">₦{(totalOutstanding / 1000000).toFixed(1)}M</p>
          </div>
        </motion.div>

        {/* Recent Activity Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex justify-between items-center mb-4"
        >
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">
            View All
          </button>
        </motion.div>

        {/* Customer List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          {filteredCustomers.map(customer => (
            <Link key={customer.id} href={`/customers/${customer.id}`}>
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-[20px] border border-slate-50 dark:border-zinc-800 shadow-sm flex items-center gap-4 hover:border-brand-primary/20 dark:hover:border-brand-primary/20 transition-all cursor-pointer">
                <div className={`w-14 h-14 ${customer.color} rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg overflow-hidden`}>
                   {customer.avatar ? (
                     <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                   ) : (
                     customer.initials
                   )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-white text-[16px] truncate">{customer.name}</h3>
                  <p className="text-sm mt-0.5 text-gray-500 dark:text-gray-400 truncate">
                    {customer.location}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end justify-center">
                  {customer.status === 'Paid' ? (
                    <span className="text-[13px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">Paid</span>
                  ) : (
                    <>
                      <p className={`font-medium text-[15px] ${customer.status === 'Outstanding' ? 'text-red-600 dark:text-red-500' : 'text-amber-700 dark:text-amber-500'}`}>
                        ₦{customer.amount.toLocaleString()}
                      </p>
                      <p className={`text-[13px] ${customer.status === 'Outstanding' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {customer.status}
                      </p>
                    </>
                  )}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 ml-1" />
              </div>
            </Link>
          ))}
        </motion.div>
      </main>

      {/* FAB */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-24 right-6 w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-brand-primary/30 hover:scale-110 active:scale-95 transition-all z-30"
      >
        <Plus className="w-7 h-7" strokeWidth={2.5} />
      </button>

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4 transition-all">
           <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 border border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Add Customer</h2>
                 <button onClick={closeModal} className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="flex flex-col gap-5">
                 <div>
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. John Doe" 
                      className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                    />
                 </div>
                 <div>
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Email (Optional)</label>
                    <input 
                      type="email" 
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="john@example.com" 
                      className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Phone</label>
                       <input 
                         type="tel" 
                         value={newPhone}
                         onChange={(e) => setNewPhone(e.target.value)}
                         placeholder="+234..." 
                         className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Location</label>
                       <input 
                         type="text" 
                         value={newLocation}
                         onChange={(e) => setNewLocation(e.target.value)}
                         placeholder="Lagos, NG" 
                         className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                       />
                    </div>
                 </div>
                 
                 <button 
                   onClick={handleSaveCustomer}
                   className="w-full bg-brand-primary text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-brand-primary/20 mt-4 active:scale-[0.98] transition-all hover:brightness-110"
                 >
                    Save Customer
                 </button>
              </div>
           </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
