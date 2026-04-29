"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, ArrowLeft, ShieldCheck, 
  Sparkles, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/viewmodels/authStore';

// Update these with your actual Paystack Payment Page links
const PAYSTACK_MONTHLY_LINK = process.env.NEXT_PUBLIC_PAYSTACK_MONTHLY_LINK || 'https://paystack.com/pay/invoicepro-monthly';
const PAYSTACK_YEARLY_LINK = process.env.NEXT_PUBLIC_PAYSTACK_YEARLY_LINK || 'https://paystack.com/pay/invoicepro-yearly';

const plans = [
  {
    id: 'monthly',
    name: 'Monthly Plan',
    subtitle: 'Flexible month-to-month access',
    price: 5000,
    interval: 'month',
    features: [
      'Unlimited Invoices',
      'Inventory Management',
      'Financial Analytics',
      'Custom Branding',
      'Email Support'
    ],
    featured: false,
    buttonText: 'Start Monthly Plan',
    link: PAYSTACK_MONTHLY_LINK
  },
  {
    id: 'yearly',
    name: 'Yearly Plan',
    subtitle: 'Best value for growing businesses',
    price: 48000,
    interval: 'year',
    features: [
      'Everything in Monthly',
      'Priority WhatsApp Support',
      'Early Access to Features',
      '2 Months Free (Save 20%)',
      'Team Access (Up to 3 users)'
    ],
    featured: true,
    buttonText: 'Start Yearly Plan',
    link: PAYSTACK_YEARLY_LINK
  }
];

export default function SubscriptionContent() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = (plan: typeof plans[0]) => {
    setLoadingPlan(plan.id);
    
    // Construct the URL with user email as a query parameter for a better experience
    // Paystack payment pages automatically pick up 'email' parameter
    const paymentUrl = new URL(plan.link);
    if (user?.email) {
      paymentUrl.searchParams.append('email', user.email);
    }
    
    // Redirect to Paystack Payment Page
    window.location.href = paymentUrl.toString();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white hover:opacity-70 transition-opacity">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Subscription</h1>
        <div className="w-6" />
      </header>

      <main className="flex-1 px-6 pb-12 pt-4">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 text-brand-primary px-3 py-1 rounded-full text-[12px] font-black uppercase tracking-wider mb-4"
          >
            <Sparkles size={14} />
            Upgrade Your Business
          </motion.div>
          <h2 className="text-[32px] font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-2">Simple, Fair Pricing</h2>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium max-w-[280px] mx-auto">Choose the plan that fits your business needs.</p>
        </div>

        <div className="space-y-6 max-w-md mx-auto mb-10">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.id} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-[32px] p-8 border ${
                plan.featured 
                  ? 'bg-brand-primary border-brand-primary text-white shadow-xl shadow-blue-500/20' 
                  : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 text-gray-900 dark:text-white shadow-sm'
              }`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0">
                  <div className="bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider">
                    Best Value
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-[24px] font-black tracking-tight mb-1">{plan.name}</h3>
                <p className={`text-[14px] font-medium ${plan.featured ? 'text-blue-100' : 'text-gray-500'}`}>{plan.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[36px] font-black">₦{plan.price.toLocaleString()}</span>
                <span className={`text-[15px] font-medium ${plan.featured ? 'text-blue-100' : 'text-gray-500'}`}>/{plan.interval}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.featured ? 'bg-white/20' : 'bg-blue-50 dark:bg-zinc-800'}`}>
                      <Check size={12} className={plan.featured ? 'text-white' : 'text-brand-primary'} />
                    </div>
                    <span className="text-[14px] font-medium opacity-90">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSubscribe(plan)} 
                disabled={loadingPlan !== null}
                className={`w-full py-4 rounded-2xl font-black text-[15px] transition-all flex items-center justify-center gap-2 ${
                  plan.featured 
                    ? 'bg-white text-brand-primary hover:bg-blue-50 active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-blue-900/20' 
                    : 'bg-brand-primary text-white hover:bg-blue-600 active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-blue-500/10'
                }`}
              >
                {loadingPlan === plan.id ? (
                  <motion.div 
                    className={`w-5 h-5 border-2 ${plan.featured ? 'border-brand-primary' : 'border-white'} border-t-transparent rounded-full`} 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                  />
                ) : (
                  <>
                    <Zap size={18} fill="currentColor" />
                    {plan.buttonText}
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-[12px] font-bold">
            <ShieldCheck size={14} />
            Secure Payments via Paystack
          </div>
          <p className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">Redirecting you to our secure checkout page.</p>
          
          <button 
            onClick={() => router.push('/dashboard')}
            className="mt-6 text-[11px] font-black uppercase tracking-widest text-brand-primary/40 hover:text-brand-primary transition-colors"
          >
            Skip for now (Dev Only)
          </button>
        </div>
      </main>
    </div>
  );
}
