import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy';

let client: ReturnType<typeof createClient> | any;

try {
  new URL(supabaseUrl);
  client = createClient(supabaseUrl, supabaseAnonKey);
} catch (err) {
  console.error("❌ CRITICAL: Failed to initialize Supabase client on frontend. Your VITE_SUPABASE_URL is likely malformed.", err);
  // Provide a dummy client to prevent complete app crash
  client = {
    auth: {
      signInWithPassword: async () => ({ error: new Error('Invalid Supabase configuration') }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
}

export const supabase = client;
