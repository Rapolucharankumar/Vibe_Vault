'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function Page() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/home');
      } else {
        router.push('/auth');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
        <p className="text-slate-300">Loading VibeVault...</p>
      </div>
    </div>
  );
}
