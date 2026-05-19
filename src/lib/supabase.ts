import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || 'dummy';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || 'dummy';

let client: ReturnType<typeof createClient> | any;

try {
  if (supabaseUrl === 'dummy' || supabaseUrl === 'https://dummy.supabase.co') {
    throw new Error('VITE_SUPABASE_URL is missing or set to dummy. If you are on Vercel, please trigger a Redeployment after adding the environment variables.');
  }
  if (supabaseAnonKey === 'dummy') {
    throw new Error('VITE_SUPABASE_ANON_KEY is missing.');
  }
  new URL(supabaseUrl);
  client = createClient(supabaseUrl, supabaseAnonKey);
} catch (err: any) {
  console.error("❌ CRITICAL: Failed to initialize Supabase client on frontend:", err.message);
  // Provide a dummy client to prevent complete app crash
  client = {
    auth: {
      signInWithPassword: async () => ({ error: new Error('Supabase Configuration Error: ' + err.message) }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getUser: async () => ({ data: { user: null }, error: new Error('Supabase Configuration Error: ' + err.message) }),
      getSession: async () => ({ data: { session: null }, error: null })
    }
  };
}

export const supabase = client;
