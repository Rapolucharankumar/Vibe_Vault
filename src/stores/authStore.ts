import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/lib/types';
import { supabase, onAuthStateChange } from '@/lib/supabase';

export const useAuthStore = create<AuthState & {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initialize: () => Promise<void>;
}>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      error: null,
      setUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      initialize: async () => {
        try {
          set({ isLoading: true });
          const {
            data: { user },
          } = await supabase.auth.getUser();
          
          if (user) {
            set({
              user: {
                id: user.id,
                email: user.email!,
                user_metadata: user.user_metadata,
              },
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ error: 'Failed to initialize auth' });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

// Subscribe to auth changes
if (typeof window !== 'undefined') {
  onAuthStateChange((user) => {
    if (user) {
      useAuthStore.setState({
        user: {
          id: user.id,
          email: user.email,
          user_metadata: user.user_metadata,
        },
      });
    } else {
      useAuthStore.setState({ user: null });
    }
  });
}
