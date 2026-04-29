import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Prevent build crash during prerendering if environment variables are missing
  if (!url || !anonKey) {
    // In production build, we just return a dummy or null to let the build finish
    // Real errors will be caught on the client side if the variables are still missing
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    );
  }

  return createBrowserClient(url, anonKey);
}
