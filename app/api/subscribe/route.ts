import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // MOCK DELAY - simulate database write
    await new Promise((resolve) => setTimeout(resolve, 800));

    // LOGGING for Dylan's visibility in development
    console.log(`[Newsletter Signup] New subscriber: ${email}`);

    // SUCCESS RESPONSE
    return NextResponse.json(
      { message: 'Successfully subscribed', email },
      { status: 200 }
    );

    /* 
      TODO: Connect to your preferred service later:
      
      - Mailchimp: Use @mailchimp/mailchimp_marketing
      - Resend: Use resend library
      - Supabase: Use supabase-js
      - Google Sheets: Use googleapis
    */

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
