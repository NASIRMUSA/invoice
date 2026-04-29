"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/viewmodels/appStore';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import BottomNav from '../components/BottomNav';
import { Wallet, User, Plus, Trash2, Receipt, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function CreateInvoiceContent() {
  const router = useRouter();
  const { products, invoices, customers, addInvoice } = useAppStore();
  const { showToast } = useToastStore();
  const searchParams = useSearchParams();
  const [customerName, setCustomerName] = useState('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  useEffect(() => {
    const name = searchParams.get('name');
    if (name) setCustomerName(name);
  }, [searchParams]);
  
  const [selectedItems, setSelectedItems] = useState<{id: string, name: string, price: number, qty: number}[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleAddProduct = (product: any) => {
    setSelectedItems(items => {
      const exists = items.find(i => i.id === product.id);
      if (exists) {
        return items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...items, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    setIsProductModalOpen(false);
  };

  const updateQty = (id: string, delta: number) => {
    setSelectedItems(items => {
      return items.map(item => {
        if (item.id === id) {
           const newQty = Math.max(1, item.qty + delta);
           return { ...item, qty: newQty };
        }
        return item;
      });
    });
  };

  const removeItem = (id: string) => {
    setSelectedItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = selectedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const total = subtotal + (subtotal * 0.075);

  const handleGenerate = async () => {
    const newInvoice = {
      customerName: customerName || 'Adeola Bakare',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: selectedItems.map(item => ({
        product: { id: item.id, name: item.name, price: item.price, quantity: 99 },
        quantity: item.qty
      })),
      totalAmount: total,
      status: 'Paid' as const
    };
    
    // We want to wait for the invoice to be created to get the ID
    // Since our addInvoice in appStore doesn't return the ID yet, we'll fetch it from the state after update 
    // or better, update addInvoice to return it.
    await addInvoice(newInvoice);
    
    // Get the latest invoice ID (the one we just added)
    const latestInvoice = useAppStore.getState().invoices[0];
    const invoiceId = latestInvoice?.id || 'new';
    
    showToast(`Invoice ${invoiceId} created successfully!`, 'success');
    router.push(`/invoice/${invoiceId}`);
  };


  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-20 shadow-sm shadow-slate-100 dark:shadow-zinc-800">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="mr-1">
            <div className="w-8 h-8 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <ChevronRight className="w-5 h-5 rotate-180" />
            </div>
          </Link>
          <span className="font-extrabold text-gray-900 dark:text-white tracking-tight">Create Invoice</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-6 pb-24 hide-scrollbar">
        {/* Customer Info */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2 ml-1">
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Customer Name</label>
            <button onClick={() => setIsCustomerModalOpen(true)} className="text-brand-primary font-black text-[11px] flex items-center gap-1 bg-blue-50 dark:bg-zinc-800 px-3 py-1 rounded-lg">
              SELECT EXISTING
            </button>
          </div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 dark:text-zinc-600" />
            <input 
              type="text" 
              placeholder="Enter customer name" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white"
            />
          </div>
        </motion.div>

        {/* Selected Products */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[13px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Selected Items</h2>
            <button onClick={() => setIsProductModalOpen(true)} className="text-brand-primary font-black text-[11px] flex items-center gap-1 bg-blue-50 dark:bg-zinc-800 px-4 py-2 rounded-xl">
              <Plus size={14} /> ADD ITEM
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {selectedItems.map(item => (
              <div key={item.id} className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-50 dark:border-zinc-800 shadow-sm flex items-center justify-between hover:border-brand-primary/10 transition-colors">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm tracking-tight">{item.name}</h3>
                  <p className="text-base font-black text-brand-primary mt-1">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-blue-50/50 dark:bg-zinc-800/50 border border-blue-100 dark:border-zinc-700 rounded-2xl overflow-hidden p-1">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-brand-primary font-black hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-colors">-</button>
                    <span className="w-8 text-center text-sm font-black text-brand-primary">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-brand-primary font-black hover:bg-white dark:hover:bg-zinc-700 rounded-xl transition-colors">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="w-10 h-10 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-500 rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Totals */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 p-6 rounded-[32px] border border-slate-100 dark:border-zinc-800 shadow-sm mb-8"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[11px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">Subtotal</span>
            <span className="text-base font-black text-gray-900 dark:text-white">₦{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
          <div className="h-px bg-slate-50 dark:bg-zinc-800 my-4"></div>
          <div className="flex justify-between items-center">
            <span className="text-base font-black text-gray-900 dark:text-white tracking-tight">Total Price</span>
            <span className="text-2xl font-black text-brand-primary tracking-tighter">₦{total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
          </div>
        </motion.div>

        <motion.button 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          onClick={handleGenerate}
          className="w-full bg-brand-primary text-white py-5 rounded-3xl font-black text-xl shadow-2xl shadow-brand-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all hover:brightness-110"
        >
           <Receipt className="w-6 h-6" /> Generate Invoice
        </motion.button>
      </main>

      {/* Product Selection Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="flex-1" onClick={() => setIsProductModalOpen(false)}></div>
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-t-[32px] p-6 pb-12 shadow-2xl max-h-[80vh] flex flex-col"
          >
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">Select Product</h2>
            
            <div className="overflow-y-auto hide-scrollbar flex-1 flex flex-col gap-3">
              {products.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No products in inventory.</p>
              ) : (
                products.map(product => (
                  <button 
                    key={product.id}
                    onClick={() => handleAddProduct(product)}
                    disabled={product.quantity <= 0}
                    className="flex justify-between items-center p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 hover:border-brand-primary/50 text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{product.name}</h3>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">Stock: {product.quantity}</p>
                    </div>
                    <p className="font-black text-brand-primary">₦{product.price.toLocaleString()}</p>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}

      <BottomNav />

      {/* Customer Selection Modal */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="flex-1" onClick={() => setIsCustomerModalOpen(false)}></div>
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-white dark:bg-zinc-900 rounded-t-[32px] p-6 pb-12 shadow-2xl max-h-[80vh] flex flex-col"
          >
            <div className="w-12 h-1.5 bg-slate-200 dark:bg-zinc-700 rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">Select Customer</h2>
            
            <div className="overflow-y-auto hide-scrollbar flex-1 flex flex-col gap-3">
              {customers.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No customers found.</p>
              ) : (
                customers.map(customer => (
                  <button 
                    key={customer.id}
                    onClick={() => {
                      setCustomerName(customer.name);
                      setIsCustomerModalOpen(false);
                    }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 hover:border-brand-primary/50 text-left transition-colors"
                  >
                    <div className={`w-10 h-10 ${customer.color} rounded-full flex items-center justify-center font-bold text-xs`}>
                      {customer.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">{customer.name}</h3>
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{customer.location}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default function CreateInvoiceScreen() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-white dark:bg-zinc-950">
        <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CreateInvoiceContent />
    </Suspense>
  );
}
