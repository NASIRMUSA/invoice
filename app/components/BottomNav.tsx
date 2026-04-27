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
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-t border-slate-100 dark:border-zinc-800 flex justify-around items-center h-[calc(5rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_20px_-6px_rgba(0,0,0,0.05)] z-50 transition-colors">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center justify-center gap-1 w-16 h-20 ${isActive ? 'text-brand-primary' : 'text-gray-400 dark:text-gray-500'} transition-colors active:scale-90`}
          >
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
