export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  isLowStock?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  location: string;
  status: 'Outstanding' | 'Paid' | 'Pending';
  amount: number;
  initials: string;
  color: string;
  avatar?: string;
}

export interface InvoiceItem {
  product: Product;
  quantity: number;
}

export interface Invoice {
  id: string;
  customerName: string;
  date: string;
  items: InvoiceItem[];
  totalAmount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface DashboardStats {
  totalSales: number;
  totalProducts: number;
  totalStockValue: number;
  weeklyProfit: number;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface BusinessProfile {
  name: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  tin: string;
}
