"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Inbox, Users, History } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutGrid },
    { name: 'Inventory', path: '/inventory', icon: Inbox },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <div className="sticky bottom-0 w-full bg-white dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800 flex justify-around items-center h-20 shadow-[0_-8px_20px_-6px_rgba(0,0,0,0.05)] z-50 transition-colors">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-full ${isActive ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-500'} transition-colors`}
          >
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
