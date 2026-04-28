"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Check, ArrowLeft, ShieldCheck, 
  CreditCard, Sparkles, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { usePaystackPayment } from 'react-paystack';
import { useToastStore } from '@/lib/viewmodels/toastStore';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    subtitle: 'For solo entrepreneurs',
    monthlyPrice: 5000,
    yearlyPrice: 48000,
    features: [
      'Up to 20 Invoices/mo',
      'Basic Financial Analytics',
      'Email Support'
    ],
    featured: false,
    buttonText: 'Get Started'
  },
  {
    id: 'pro',
    name: 'Growth Pro',
    subtitle: 'For scaling businesses',
    monthlyPrice: 12500,
    yearlyPrice: 120000,
    features: [
      'Unlimited Invoices',
      'Custom Branding & Domains',
      'Priority WhatsApp Support',
      'Team Access (3 seats)'
    ],
    featured: true,
    buttonText: 'Go Pro Now'
  }
];

export default function SubscriptionContent() {
  const router = useRouter();
  const { showToast } = useToastStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  
  const [paystackConfig, setPaystackConfig] = useState<any>({
    reference: "",
    email: "user@example.com",
    amount: 0,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_4e33441865910903332a67e4e899e719326e5e8c',
  });

  const initializePayment = usePaystackPayment(paystackConfig);

  const handlePaystackSuccess = async (response: any) => {
    const reference = response.reference;
    setLoadingPlan('verifying');
    
    try {
      const verifyResponse = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference }),
      });

      const data = await verifyResponse.json();

      if (verifyResponse.ok) {
        showToast('Payment verified! Welcome aboard.', 'success');
        router.push('/dashboard');
      } else {
        showToast(data.message || 'Verification failed', 'error');
      }
    } catch (error) {
      console.error('Verification error:', error);
      showToast('Error verifying payment', 'error');
    } finally {
      setLoadingPlan(null);
    }
  };

  const handlePaystackClose = () => {
    setLoadingPlan(null);
    showToast('Payment cancelled', 'info');
  };

  const initiatePayment = (plan: typeof plans[0]) => {
    setLoadingPlan(plan.id);
    const amount = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    
    const newConfig = {
      reference: new Date().getTime().toString(),
      email: 'user@example.com',
      amount: amount * 100,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_4e33441865910903332a67e4e899e719326e5e8c',
      metadata: {
        custom_fields: [
          { display_name: "Plan", variable_name: "plan", value: plan.name },
          { display_name: "Billing Cycle", variable_name: "billing_cycle", value: billingCycle }
        ]
      }
    };

    setPaystackConfig(newConfig);
  };

  useEffect(() => {
    if (loadingPlan && loadingPlan !== 'verifying' && paystackConfig.amount > 0) {
      // @ts-ignore
      initializePayment(handlePaystackSuccess, handlePaystackClose);
    }
  }, [paystackConfig]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors">
      <header className="px-6 pt-8 pb-4 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-[17px] font-black text-gray-900 dark:text-white tracking-tight">Subscriptions</h1>
        <div className="w-6" />
      </header>

      <main className="flex-1 px-6 pb-12 pt-4">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-2">Choose your flow</h2>
          <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium">Simple pricing that grows with your business across Nigeria.</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-slate-200/50 dark:bg-zinc-900 rounded-2xl p-1.5 flex gap-1 border border-slate-100 dark:border-zinc-800 relative">
            <button onClick={() => setBillingCycle('monthly')} className={`px-8 py-2.5 rounded-xl text-[14px] font-bold transition-all relative z-10 ${billingCycle === 'monthly' ? 'text-brand-primary' : 'text-gray-500'}`}>Monthly</button>
            <button onClick={() => setBillingCycle('yearly')} className={`px-8 py-2.5 rounded-xl text-[14px] font-bold transition-all relative z-10 ${billingCycle === 'yearly' ? 'text-brand-primary' : 'text-gray-500'}`}>Yearly</button>
            <motion.div className="absolute top-1.5 bottom-1.5 bg-white dark:bg-zinc-800 rounded-xl shadow-sm z-0" initial={false} animate={{ left: billingCycle === 'monthly' ? 6 : '50%', right: billingCycle === 'monthly' ? '50%' : 6 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
          </div>
        </div>

        <div className="space-y-6 max-w-md mx-auto mb-10">
          {plans.map((plan) => {
            const currentPrice = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice / 12;
            return (
              <motion.div key={plan.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-[32px] p-8 border ${plan.featured ? 'bg-brand-primary border-brand-primary text-white shadow-xl shadow-blue-500/20' : 'bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 text-gray-900 dark:text-white shadow-sm'}`}>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-[22px] font-black tracking-tight">{plan.name}</h3>
                  {plan.featured && <span className="bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">Popular</span>}
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-[32px] font-black">₦{currentPrice.toLocaleString()}</span>
                  <span className="text-[14px] font-medium opacity-60">/month</span>
                  {billingCycle === 'yearly' && <span className="text-[11px] font-black ml-2 px-2 py-0.5 bg-emerald-500/20 text-emerald-100 rounded-md">SAVE 20%</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.featured ? 'bg-white/20' : 'bg-blue-50 dark:bg-zinc-800'}`}><Check size={12} className={plan.featured ? 'text-white' : 'text-brand-primary'} /></div>
                      <span className="text-[14px] font-medium opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => initiatePayment(plan)} disabled={loadingPlan !== null} className={`w-full py-4 rounded-2xl font-black text-[15px] transition-all shadow-lg flex items-center justify-center gap-2 ${plan.featured ? 'bg-white text-brand-primary shadow-blue-900/20 active:bg-blue-50 disabled:opacity-70' : 'bg-white dark:bg-zinc-800 text-brand-primary border-2 border-brand-primary shadow-blue-500/10 active:scale-95 disabled:opacity-70'}`}>
                  {loadingPlan === plan.id ? <motion.div className="w-5 h-5 border-2 border-brand-primary border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /> : loadingPlan === 'verifying' ? 'Verifying...' : plan.buttonText}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-[12px] font-bold"><ShieldCheck size={14} />Secure SSL Encrypted Payments via Paystack</div>
          <p className="text-[12px] text-gray-400 dark:text-gray-500 font-medium">Cancel anytime. No hidden fees.</p>
          
          {/* Development Skip Button */}
          <button 
            onClick={() => router.push('/dashboard')}
            className="mt-4 text-[11px] font-black uppercase tracking-widest text-brand-primary/40 hover:text-brand-primary transition-colors"
          >
            Skip for now (Dev Only)
          </button>
        </div>
      </main>
    </div>
  );
}
