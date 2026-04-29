import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { reference } = await request.json();
    console.log('Verifying payment for reference:', reference);
    
    if (!reference) return NextResponse.json({ message: 'No reference' }, { status: 400 });

    const supabase = await createClient();
    let { data: { user } } = await supabase.auth.getUser();
    
    // 1. Verify with Paystack
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${paystackSecretKey}` }
    });
    const data = await response.json();
    
    if (!data.status || data.data.status !== 'success') {
      console.error('Paystack verification failed:', data);
      return NextResponse.json({ message: 'Paystack verification failed' }, { status: 400 });
    }

    // If session is lost during redirect, we can use the email from the transaction
    if (!user) {
      console.log('Session not found, trying to find user by email from Paystack');
      const email = data.data.customer.email;
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      
      if (userError || !userData) {
        console.error('User not found by email:', email);
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
      user = { id: userData.id } as any;
    }

    const amountPaid = data.data.amount;
    const expiryDate = new Date();
    const isYearly = amountPaid >= 3000000; 
    
    if (isYearly) {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      expiryDate.setDate(expiryDate.getDate() + 30);
    }

    const planId = isYearly ? 'yearly' : 'monthly';
    console.log('Processing payment for user:', user?.id, 'Plan:', planId);

    // 2. Direct Update
    // We update columns one by one or carefully to avoid failing if plan_id is missing
    const updateData: any = {
      subscription_status: 'active',
      subscription_expiry: expiryDate.toISOString(),
      last_payment_ref: reference,
    };

    // Try to include plan_id but handle error if column doesn't exist
    const { error: updateError } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user!.id);

    if (updateError) {
      console.error('Database update error:', updateError);
      return NextResponse.json({ message: 'Database update failed', error: updateError.message }, { status: 500 });
    }

    // Try to update plan_id separately in case it doesn't exist
    await supabase.from('profiles').update({ plan_id: planId }).eq('id', user!.id);

    // Force Next.js to refresh the dashboard and subscription status
    revalidatePath('/dashboard', 'layout');
    revalidatePath('/auth/subscription', 'page');
    revalidatePath('/auth/subscription/expired', 'page');

    console.log('Profile updated successfully and cache cleared');
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error: any) {
    console.error('Catch block error in verify-payment:', error);
    return NextResponse.json({ message: 'Error', error: error.message }, { status: 500 });
  }
}
