import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  // We use createBrowserClient to create a Supabase client on the client-side
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
