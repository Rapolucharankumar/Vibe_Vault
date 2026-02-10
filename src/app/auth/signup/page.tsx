'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUpWithEmail, signInWithGoogle } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: signUpError } = await signUpWithEmail(email, password);
      if (signUpError) throw signUpError;
      setCheckEmail(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignup() {
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: signUpError } = await signInWithGoogle();
      if (signUpError) throw signUpError;
      // Google OAuth will redirect automatically
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  }

  if (checkEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white drop-shadow mb-2">Check your email</h2>
          <p className="text-slate-200 drop-shadow mb-6 font-semibold">
            We've sent a confirmation link to <strong>{email}</strong>. Click it to verify your account and get started!
          </p>
          <Link
            href="/auth/login"
            className="inline-block py-3 px-4 rounded-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all drop-shadow"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
            <span className="text-xl">♫</span>
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow mb-2">VibeVault</h1>
          <p className="text-slate-200 font-semibold drop-shadow">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailSignup} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-white drop-shadow mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border-2 border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-colors disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-white drop-shadow mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border-2 border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-colors disabled:opacity-50"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-white drop-shadow mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border-2 border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-colors disabled:opacity-50"
              required
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-900/30 border-2 border-red-600 text-red-200 text-sm font-semibold drop-shadow">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed drop-shadow"
          >
            {isLoading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-slate-600" />
          <span className="text-xs text-slate-300 font-bold">or</span>
          <div className="flex-1 h-px bg-slate-600" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full py-3 rounded-lg font-bold border-2 border-slate-600 text-white bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 drop-shadow"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign Up with Google
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-slate-300 mt-6 drop-shadow">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-pink-300 hover:text-pink-200 font-bold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
