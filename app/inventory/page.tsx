"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useAppStore, useDashboardStats } from '@/lib/viewmodels/appStore';
import { useToastStore } from '@/lib/viewmodels/toastStore';
import BottomNav from '../components/BottomNav';
import { Wallet, User, Search, Plus, PackageOpen, AlertTriangle, X, Edit2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function InventoryScreen() {
  const { products, addProduct, updateProduct, deleteProduct } = useAppStore();
  const stats = useDashboardStats();
  const { showToast } = useToastStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Product Form State
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductQty, setNewProductQty] = useState('');

  const handleSaveProduct = () => {
    if (!newProductName.trim()) {
      showToast('Product name is required', 'error');
      return;
    }
    
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: newProductName,
        price: Number(newProductPrice) || 0,
        quantity: Number(newProductQty) || 0,
        isLowStock: Number(newProductQty) <= 5
      });
      showToast(`${newProductName} updated successfully!`, 'success');
    } else {
      addProduct({
        name: newProductName,
        price: Number(newProductPrice) || 0,
        quantity: Number(newProductQty) || 0,
        isLowStock: Number(newProductQty) <= 5
      });
      showToast(`${newProductName} added to inventory!`, 'success');
    }
    
    closeModal();
  };

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setNewProductPrice(product.price.toString());
    setNewProductQty(product.quantity.toString());
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      showToast(`${productToDelete.name} deleted!`, 'success');
      setProductToDelete(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductQty('');
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  
  const activeStock = products.filter(p => !p.isLowStock).length;
  const lowStock = products.filter(p => p.isLowStock).length;

  return (
    <div className="flex flex-col h-screen bg-slate-50/50 dark:bg-zinc-950/50 relative overflow-hidden transition-colors">
      <header className="px-6 pt-6 pb-2 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-20 shadow-sm shadow-slate-100 dark:shadow-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-gray-900 dark:text-white tracking-tight">InvoicePro NG</span>
        </div>
        <Link href="/settings" className="w-10 h-10 bg-blue-50 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center border border-blue-100 dark:border-zinc-700 shadow-sm transition-transform active:scale-95 hover:scale-105 cursor-pointer">
           <User className="w-6 h-6 text-brand-primary" />
        </Link>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pt-4 pb-24 hide-scrollbar">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Inventory</h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative mb-6"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input 
            type="text" 
            placeholder="Search products, SKUs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary shadow-sm font-medium text-gray-900 dark:text-white"
          />
        </motion.div>

        {/* Value Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-brand-primary text-white rounded-[32px] p-6 mb-6 shadow-2xl shadow-brand-primary/30 relative overflow-hidden"
        >
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <PackageOpen className="w-40 h-40" />
          </div>
          <div className="relative z-10">
            <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1">Total Stock Value</p>
            <h2 className="text-4xl font-black tracking-tight">₦{stats.totalStockValue.toLocaleString()}</h2>
          </div>
        </motion.div>

        {/* Stock Status */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-4 mb-8"
        >
          <div className="flex-1 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-4 rounded-3xl shadow-sm hover:border-brand-primary/20 transition-colors">
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-wider mb-1">Active SKUs</p>
            <p className="text-2xl font-black text-gray-900 dark:text-white">{activeStock}</p>
          </div>
          <div className="flex-1 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 p-4 rounded-3xl shadow-sm hover:border-red-200 dark:hover:border-red-900/40 transition-colors">
             <div className="flex items-center justify-between">
                <p className="text-[10px] text-red-500 dark:text-red-400 font-black uppercase tracking-wider mb-1">Low Stock</p>
                <AlertTriangle className="w-4 h-4 text-red-500" />
             </div>
            <p className="text-2xl font-black text-red-600 dark:text-red-400">{lowStock}</p>
          </div>
        </motion.div>

        {/* Product List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-50 dark:border-zinc-800 shadow-sm flex items-center gap-4 hover:border-brand-primary/20 dark:hover:border-brand-primary/20 transition-all">
              <div className="w-16 h-16 bg-slate-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                 <PackageOpen className="w-8 h-8 text-gray-300 dark:text-zinc-700" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white text-[15px] truncate tracking-tight">{product.name}</h3>
                <p className={`text-xs mt-1 font-bold ${product.isLowStock ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`}>
                  {product.quantity} in stock
                </p>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(product)} className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteClick(product)} className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-black text-brand-primary text-base">₦{product.price.toLocaleString()}</p>
                {product.isLowStock && <span className="text-[9px] font-black text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-full mt-1 inline-block border border-red-100 dark:border-red-900/20 uppercase tracking-tighter">Low Stock</span>}
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      {/* FAB */}
      <button 
        onClick={() => {
          closeModal();
          setIsModalOpen(true);
        }}
        className="absolute bottom-24 right-6 w-14 h-14 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-brand-primary/30 hover:scale-110 active:scale-95 transition-all z-30 border-[4px] border-white dark:border-zinc-900"
      >
        <Plus className="w-7 h-7" strokeWidth={3} />
      </button>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4 transition-all">
           <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[40px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 border border-slate-100 dark:border-zinc-800">
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                 <button onClick={closeModal} className="w-10 h-10 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="flex flex-col gap-6">
                 <div>
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Product Name</label>
                    <input 
                      type="text" 
                      value={newProductName}
                      onChange={(e) => setNewProductName(e.target.value)}
                      placeholder="e.g. Digital Watch" 
                      className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Price (₦)</label>
                       <input 
                         type="number" 
                         value={newProductPrice}
                         onChange={(e) => setNewProductPrice(e.target.value)}
                         placeholder="0.00" 
                         className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                       />
                    </div>
                    <div>
                       <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-2 block tracking-widest">Quantity</label>
                       <input 
                         type="number" 
                         value={newProductQty}
                         onChange={(e) => setNewProductQty(e.target.value)}
                         placeholder="0" 
                         className="w-full bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 rounded-2xl py-4 px-4 outline-none focus:border-brand-primary dark:focus:border-brand-primary font-medium text-gray-900 dark:text-white" 
                       />
                    </div>
                 </div>
                 
                 <button 
                   onClick={handleSaveProduct}
                   className="w-full bg-brand-primary text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-brand-primary/20 mt-4 active:scale-[0.98] transition-all hover:brightness-110"
                 >
                    Save Product
                 </button>
              </div>
           </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4 transition-all">
           <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-zinc-800 text-center">
              <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Delete Product?</h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
                 Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">{productToDelete.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                 <button 
                   onClick={() => setProductToDelete(null)}
                   className="flex-1 bg-slate-100 dark:bg-zinc-800 text-gray-900 dark:text-white py-4 rounded-2xl font-bold active:scale-[0.98] transition-all hover:bg-slate-200 dark:hover:bg-zinc-700"
                 >
                    Cancel
                 </button>
                 <button 
                   onClick={confirmDelete}
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
