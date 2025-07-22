// src/app/login/page.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to login');
      }

      login(data.user);
      router.push('/courses');

    } catch (err) {
      const error = err as Error;
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Sign in to your account
          </h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
              >
                {submitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}