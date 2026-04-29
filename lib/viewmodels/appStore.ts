import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Invoice, DashboardStats, UserProfile, BusinessProfile, Customer } from '../models/types';
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();

interface AppState {
  userProfile: UserProfile | null;
  businessProfile: BusinessProfile | null;
  products: Product[];
  invoices: Invoice[];
  customers: Customer[];
  isDarkMode: boolean;
  securityPin: string | null;
  isLocked: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setSecurityPin: (pin: string | null) => void;
  setLocked: (isLocked: boolean) => void;
  fetchInitialData: () => Promise<void>;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<void>;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => Promise<void>;
  addCustomer: (customer: Omit<Customer, 'id'>) => Promise<void>;
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  updateSubscription: (status: string, expiry: string) => Promise<void>;
  toggleDarkMode: () => void;
  clearData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userProfile: null,
      businessProfile: null,
      products: [],
      invoices: [],
      customers: [],
      isDarkMode: false,
      securityPin: null,
      isLocked: false,
      isLoading: true,
      error: null,
      
      setSecurityPin: (pin) => set({ securityPin: pin }),
      setLocked: (isLocked) => set({ isLocked }),
      
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      fetchInitialData: async () => {
        set({ isLoading: true, error: null });
        try {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) {
            set({ isLoading: false });
            return;
          }

          // Fetch all data in parallel
          const [productsRes, invoicesRes, customersRes, profileRes, businessRes] = await Promise.all([
            supabase.from('products').select('*').eq('user_id', user.id).order('name'),
            supabase.from('invoices').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
            supabase.from('customers').select('*').eq('user_id', user.id).order('name'),
            supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
            supabase.from('business_profiles').select('*').eq('user_id', user.id).maybeSingle(),
          ]);

          set({
            products: productsRes.data || [],
            invoices: invoicesRes.data || [],
            customers: customersRes.data || [],
            userProfile: profileRes.data || null,
            businessProfile: businessRes.data || null,
            isLoading: false
          });
        } catch (error: any) {
          console.error('Error fetching data:', error);
          set({ error: error.message, isLoading: false });
        }
      },
      
      updateUserProfile: async (profile) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        // Map camelCase to snake_case for DB
        const dbProfile = {
          full_name: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          avatar: profile.avatar
        };
        
        const { error } = await supabase.from('profiles').update(dbProfile).eq('id', user.id);
        if (!error) {
          set((state) => ({ userProfile: state.userProfile ? { ...state.userProfile, ...profile } : null }));
        }
      },

      updateBusinessProfile: async (profile) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const { error } = await supabase.from('business_profiles').upsert({ ...profile, user_id: user.id }).eq('user_id', user.id);
        if (!error) {
          set((state) => ({ businessProfile: state.businessProfile ? { ...state.businessProfile, ...profile } : profile as any }));
        }
      },
      
      addProduct: async (product) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        // Map camelCase to snake_case for DB
        const dbProduct = {
          name: product.name,
          quantity: product.quantity,
          price: product.price,
          user_id: user.id,
          is_low_stock: product.quantity < 5
        };
        
        const { data, error } = await supabase.from('products').insert([dbProduct]).select().single();
        if (!error && data) {
          const mappedProduct: Product = {
            id: data.id,
            name: data.name,
            quantity: data.quantity,
            price: Number(data.price),
            isLowStock: data.is_low_stock
          };
          set((state) => ({ products: [...state.products, mappedProduct] }));
        }
      },
      
      updateProduct: async (id, product) => {
        const dbProduct: any = {};
        if (product.name) dbProduct.name = product.name;
        if (product.quantity !== undefined) {
          dbProduct.quantity = product.quantity;
          dbProduct.is_low_stock = product.quantity < 5;
        }
        if (product.price !== undefined) dbProduct.price = product.price;

        const { error } = await supabase.from('products').update(dbProduct).eq('id', id);
        if (!error) {
          set((state) => ({
            products: state.products.map(p => p.id === id ? { ...p, ...product, isLowStock: product.quantity !== undefined ? product.quantity < 5 : p.isLowStock } : p)
          }));
        }
      },

      deleteProduct: async (id) => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) {
          set((state) => ({
            products: state.products.filter(p => p.id !== id)
          }));
        }
      },
      
      addInvoice: async (invoice) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const dbInvoice = {
          user_id: user.id,
          customer_name: invoice.customerName,
          date: invoice.date,
          items: invoice.items,
          total_amount: invoice.totalAmount,
          status: invoice.status
        };
        
        const { data, error } = await supabase.from('invoices').insert([dbInvoice]).select().single();
        
        if (!error && data) {
          const mappedInvoice: Invoice = {
            id: data.id,
            customerName: data.customer_name,
            date: data.date,
            items: data.items,
            totalAmount: Number(data.total_amount),
            status: data.status
          };

          // Deduct inventory locally and sync
          const newProducts = [...get().products];
          for (const item of invoice.items) {
            const pIdx = newProducts.findIndex(p => p.id === item.product.id);
            if (pIdx > -1) {
              const newQty = Math.max(0, newProducts[pIdx].quantity - item.quantity);
              await supabase.from('products').update({ 
                quantity: newQty,
                is_low_stock: newQty <= 5 
              }).eq('id', item.product.id);
              
              newProducts[pIdx].quantity = newQty;
              newProducts[pIdx].isLowStock = newQty <= 5;
            }
          }
          
          set({
            invoices: [mappedInvoice, ...get().invoices],
            products: newProducts
          });
        }
      },
      
      addCustomer: async (customer) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const { data, error } = await supabase.from('customers').insert([{ ...customer, user_id: user.id }]).select().single();
        if (!error && data) {
          set((state) => ({ customers: [...state.customers, data] }));
        }
      },

      updateCustomer: async (id, customer) => {
        const { error } = await supabase.from('customers').update(customer).eq('id', id);
        if (!error) {
          set((state) => ({
            customers: state.customers.map(c => c.id === id ? { ...c, ...customer } : c)
          }));
        }
      },
      
      deleteCustomer: async (id) => {
        const { error } = await supabase.from('customers').delete().eq('id', id);
        if (!error) {
          set((state) => ({
            customers: state.customers.filter(c => c.id !== id)
          }));
        }
      },
      
      updateSubscription: async (status, expiry) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        
        const dbProfile = {
          subscription_status: status,
          subscription_expiry: expiry
        };
        
        const { error } = await supabase.from('profiles').update(dbProfile).eq('id', user.id);
        if (!error) {
          set((state) => ({ 
            userProfile: state.userProfile ? { 
              ...state.userProfile, 
              subscription_status: status as any, 
              subscription_expiry: expiry 
            } : null 
          }));
        }
      },
      
      clearData: () => set({
        userProfile: null,
        businessProfile: null,
        products: [],
        invoices: [],
        customers: [],
        securityPin: null,
        isLocked: false,
        error: null
      })
    }),
    {
      name: 'invoicepro-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        securityPin: state.securityPin,
      }),
    }
  )
);

// Derived State Selector
export const useDashboardStats = (): DashboardStats => {
  const products = useAppStore(state => state.products);
  const invoices = useAppStore(state => state.invoices);
  
  const totalProducts = products.length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  const totalSales = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.totalAmount, 0);
  const weeklyProfit = totalSales * 0.15; // Mock profit margin
  
  return { totalSales, totalProducts, totalStockValue, weeklyProfit };
};

