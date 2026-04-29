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

  // 2. Fetch profile and verify reference existence
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('subscription_status, subscription_expiry, last_payment_ref')
    .eq('id', user.id)
    .single();

  // 3. Strict Verification Logic
  // Check if profile exists and has a valid payment reference
  if (profileError || !profile || !profile.last_payment_ref) {
    redirect('/auth/subscription');
  }

  // 4. Status Check
  if (profile.subscription_status !== 'active') {
    redirect('/auth/subscription');
  }

  // 5. Expiry Check
  if (profile.subscription_expiry) {
    const expiryDate = new Date(profile.subscription_expiry);
    if (expiryDate < new Date()) {
      redirect('/auth/subscription/expired');
    }
  }

  return <>{children}</>;
}
