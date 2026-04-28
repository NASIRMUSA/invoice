import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { message: 'Reference is required' },
        { status: 400 }
      );
    }

    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (data.status && data.data.status === 'success') {
      // In a real app, you would update the user's subscription in the database here
      // e.g., update user profile with plan, expiry date, etc.
      
      return NextResponse.json(
        { 
          message: 'Payment verified successfully', 
          data: data.data 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          message: 'Payment verification failed', 
          error: data.message 
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
