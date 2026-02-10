'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function AuthCallbackPage() {
  const router = useRouter();
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await initialize();
        // Give a moment for auth state to update
        setTimeout(() => {
          router.push('/home');
        }, 500);
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [initialize, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
        <p className="text-slate-300">Completing authentication...</p>
      </div>
    </div>
  );
}
