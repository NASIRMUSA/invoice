import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Invoice, DashboardStats, UserProfile, BusinessProfile, Customer } from '../models/types';

interface AppState {
  userProfile: UserProfile;
  businessProfile: BusinessProfile;
  products: Product[];
  invoices: Invoice[];
  customers: Customer[];
  isDarkMode: boolean;
  securityPin: string | null;
  isLocked: boolean;
  
  // Actions
  setSecurityPin: (pin: string | null) => void;
  setLocked: (isLocked: boolean) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateBusinessProfile: (profile: Partial<BusinessProfile>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addInvoice: (invoice: Omit<Invoice, 'id'>) => void;
  addCustomer: (customer: Omit<Customer, 'id'>) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
  toggleDarkMode: () => void;
}

// Initial mock data
const initialProducts: Product[] = [
  { id: '1', name: 'Digital Quartz Watch', quantity: 53, price: 15000, isLowStock: false },
  { id: '2', name: 'Pro Audio Headphones', quantity: 2, price: 12000, isLowStock: true },
  { id: '3', name: 'Classic Canvas Shoes', quantity: 120, price: 12500, isLowStock: false },
  { id: '4', name: 'Luxury Sunglasses', quantity: 22, price: 6000, isLowStock: false },
];

const initialInvoices: Invoice[] = [
  { id: 'INV-001', customerName: 'Adesola Ojekemi', date: 'Oct 21, 2023', items: [], totalAmount: 450000.00, status: 'Paid' },
  { id: 'INV-002', customerName: 'Chukwudi Obi', date: 'Oct 22, 2023', items: [], totalAmount: 1200000.00, status: 'Pending' },
  { id: 'INV-003', customerName: 'Grace Emmanuel', date: 'Oct 18, 2023', items: [], totalAmount: 85000.00, status: 'Overdue' },
  { id: 'INV-004', customerName: 'Lagos Logistics Ltd', date: 'Oct 15, 2023', items: [], totalAmount: 520000.00, status: 'Paid' },
];

const initialCustomers: Customer[] = [
  { id: '1', name: 'Adeola Bakare', email: 'adeola.bakare@example.com', phone: '+234 802 345 6789', location: 'Lagos, NG', status: 'Outstanding', amount: 245000, initials: 'AB', color: 'bg-blue-100 text-blue-600', avatar: '/adeola_avatar.png' },
  { id: '2', name: 'Chidi Okoro', location: 'Abuja, FCT', status: 'Paid', amount: 0, initials: 'CO', color: 'bg-green-400 text-green-900' },
  { id: '3', name: 'Funke Sholaye', location: 'Ibadan, Oyo', status: 'Pending', amount: 12500, initials: 'FS', color: 'bg-blue-100 text-blue-600' },
  { id: '4', name: 'Ibrahim Musa', location: 'Kano, Nigeria', status: 'Outstanding', amount: 890000, initials: 'IM', color: 'bg-blue-100 text-blue-600' },
];

const initialUserProfile: UserProfile = {
  fullName: 'Nasir Adeyemi',
  email: 'nasir.adeyemi@invoicepro.ng',
  phone: '+234 800 000 0000'
};

const initialBusinessProfile: BusinessProfile = {
  name: 'InvoicePro NG',
  email: 'hello@invoicepro.ng',
  address: '12 Admiralty Way, Lekki',
  phone: '+234 800 000 0000',
  website: 'www.invoicepro.ng',
  tin: '12345678-0001'
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userProfile: initialUserProfile,
      businessProfile: initialBusinessProfile,
      products: initialProducts,
      invoices: initialInvoices,
      customers: initialCustomers,
      isDarkMode: false,
      securityPin: null,
      isLocked: false,
      
      setSecurityPin: (pin) => set({ securityPin: pin }),
      setLocked: (isLocked) => set({ isLocked }),
      
      updateUserProfile: (profile) => set((state) => ({ userProfile: { ...state.userProfile, ...profile } })),
      updateBusinessProfile: (profile) => set((state) => ({ businessProfile: { ...state.businessProfile, ...profile } })),
      
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      
      addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Math.random().toString(36).substr(2, 9) }]
      })),
      
      updateProduct: (id, product) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...product } : p)
      })),

      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      
      addInvoice: (invoice) => set((state) => {
        // Also deduct inventory
        const newProducts = [...state.products];
        invoice.items.forEach(item => {
          const pIdx = newProducts.findIndex(p => p.id === item.product.id);
          if (pIdx > -1) {
            newProducts[pIdx].quantity = Math.max(0, newProducts[pIdx].quantity - item.quantity);
            newProducts[pIdx].isLowStock = newProducts[pIdx].quantity <= 5;
          }
        });
        
        return {
          invoices: [{ ...invoice, id: `INV-${String(state.invoices.length + 1).padStart(3, '0')}` }, ...state.invoices],
          products: newProducts
        };
      }),
      
      addCustomer: (customer) => set((state) => ({
        customers: [...state.customers, { ...customer, id: Math.random().toString(36).substr(2, 9) }]
      })),

      updateCustomer: (id, customer) => set((state) => ({
        customers: state.customers.map(c => c.id === id ? { ...c, ...customer } : c)
      })),
      
      deleteCustomer: (id) => set((state) => ({
        customers: state.customers.filter(c => c.id !== id)
      }))
    }),
    {
      name: 'invoicepro-storage',
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
