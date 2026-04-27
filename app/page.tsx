import Link from 'next/link';
import { Wallet, ShieldCheck, TrendingUp, Zap } from 'lucide-react';

export default function WelcomeScreen() {
  return (
    <div className="flex flex-col flex-1 relative min-h-screen overflow-hidden transition-colors">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110"
        style={{ backgroundImage: "url('/shop-bg.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 dark:from-black/40 dark:via-black/60 dark:to-black/95 transition-colors"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1 items-center justify-between pb-12 pt-20 px-6">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-4 rounded-3xl mb-2 border border-white/20 dark:border-white/10 shadow-2xl">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-black text-white text-center tracking-tight drop-shadow-lg">
            InvoicePro NG
          </h1>
          
          <p className="text-center text-gray-200 dark:text-gray-300 font-medium px-4 leading-relaxed max-w-[300px] drop-shadow-md">
            The complete business tool for Nigerian entrepreneurs. Manage stock and sales in one place.
          </p>
          
          <div className="flex gap-4 w-full mt-8">
            <div className="flex-1 bg-white/10 dark:bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 dark:border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                 <Zap className="text-white w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-white">Fast Invoicing</span>
            </div>
            <div className="flex-1 bg-white/10 dark:bg-black/20 backdrop-blur-md p-3 rounded-2xl border border-white/10 dark:border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                 <ShieldCheck className="text-white w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-white">Secure Payments</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Growth Image (Optional, removed to let background shine) */}
        <div className="flex-1"></div>

        <div className="w-full flex flex-col gap-4 mt-8">
          <Link 
            href="/auth"
            className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black text-center text-xl shadow-2xl shadow-brand-primary/30 transition-all hover:brightness-110 active:scale-[0.98]"
          >
            Get Started
          </Link>
          <Link 
            href="/auth"
            className="w-full bg-white/10 dark:bg-white/5 backdrop-blur-xl text-white py-5 rounded-2xl font-black text-center text-xl border border-white/20 dark:border-white/10 shadow-2xl transition-all hover:bg-white/20 active:scale-[0.98]"
          >
            Sign In
          </Link>
          
          <p className="text-[10px] text-center text-gray-300 dark:text-gray-400 font-bold mt-2 uppercase tracking-widest opacity-60">
            Trusted by 5,000+ businesses across Nigeria
          </p>
        </div>
      </div>
    </div>
  );
}
