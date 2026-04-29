import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Authenticate User
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/auth');
  }

  // 2. Check Subscription
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status, subscription_expiry')
    .eq('id', user.id)
    .single();

  const isPaid = profile?.subscription_status === 'active';
  const isExpired = profile?.subscription_expiry && new Date(profile.subscription_expiry) < new Date();

  // If not paid or expired, redirect to payment
  if (!isPaid || isExpired) {
    redirect('/auth/subscription');
  }

  return <>{children}</>;
}



