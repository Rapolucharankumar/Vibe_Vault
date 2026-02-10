import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get the authenticated user
export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Helper function for sign up
export async function signUpWithEmail(email: string, password: string) {
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
}

// Helper function for sign in
export async function signInWithEmail(email: string, password: string) {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

// Helper function for OAuth sign in
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
}

// Helper function for sign out
export async function signOut() {
  return supabase.auth.signOut();
}

// Helper to listen to auth changes
export function onAuthStateChange(callback: (user: any) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user);
  });
}
