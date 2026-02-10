'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { signOut } from '@/lib/supabase';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, setUser } = useAuthStore();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await signOut();
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Sign out error:', error);
      alert('Failed to sign out. Try again!');
    } finally {
      setIsSigningOut(false);
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
          <p className="text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-700 backdrop-blur-sm sticky top-0 z-40 bg-slate-900/80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow">Settings</h1>
            <p className="text-xs text-slate-300 drop-shadow">Manage your account</p>
          </div>
          <Link
            href="/home"
            className="px-3 py-2 rounded-lg text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors"
          >
            Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-12">
        {/* Account Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white drop-shadow mb-4">Account</h2>
          <div className="rounded-lg bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 p-6 space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-200 drop-shadow">Email</label>
              <p className="text-white font-semibold mt-1">{user?.email}</p>
            </div>

            {user?.user_metadata?.full_name && (
              <div>
                <label className="text-sm font-bold text-slate-200 drop-shadow">Name</label>
                <p className="text-white font-semibold mt-1">
                  {user.user_metadata.full_name}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Preferences Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white drop-shadow mb-4">Preferences</h2>
          <div className="rounded-lg bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-bold text-white drop-shadow">Dark mode</label>
                <p className="text-sm text-slate-300">Always on</p>
              </div>
              <div className="text-green-400 font-bold drop-shadow">✓</div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-600">
              <div>
                <label className="font-bold text-white drop-shadow">Sound notifications</label>
                <p className="text-sm text-slate-300">Soft chime on save</p>
              </div>
              <div className="text-slate-400 font-bold drop-shadow">Coming soon</div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white drop-shadow mb-4">About</h2>
          <div className="rounded-lg bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600 p-6 space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-200 drop-shadow">Version</label>
              <p className="text-white font-semibold mt-1">1.0.0</p>
            </div>

            <div className="pt-4 border-t border-slate-600">
              <p className="text-sm text-slate-200 drop-shadow">
                VibeVault is your private vault for moods + music moments. All your data is encrypted and stored securely.
              </p>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section>
          <h2 className="text-lg font-bold text-white drop-shadow mb-4">Danger Zone</h2>
          <div className="rounded-lg bg-red-900/30 backdrop-blur-sm border-2 border-red-600 p-6">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full px-4 py-3 rounded-lg font-bold bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed drop-shadow"
            >
              {isSigningOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
