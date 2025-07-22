// src/app/forgot-password/page.tsx

"use client"; 

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

type Method = 'email' | 'sms';
type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ForgotPasswordPage() {
  const [method, setMethod] = useState<Method>('email');
  const [contactInfo, setContactInfo] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');

    await new Promise(resolve => setTimeout(resolve, 2000));

    if (contactInfo) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          
          {status === 'success' ? (
            // --- Success Message UI ---
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Link Sent!</h2>
              <p className="mt-4 text-center text-sm text-gray-600">
                A password reset link has been sent to {contactInfo}. Please check your inbox (or messages).
              </p>
              <Link href="/login" className="mt-6 inline-block font-medium text-blue-600 hover:text-blue-500">
                &larr; Back to Sign in
              </Link>
            </div>
          ) : (
            // --- Form UI ---
            <>
              <h2 className="text-3xl font-extrabold text-center text-gray-900">
                Reset your password
              </h2>
              <p className="text-center text-sm text-gray-600">
                Enter your contact information below to receive a reset link.
              </p>

              <div className="flex justify-center space-x-4">
                <label className="flex items-center">
                  <input type="radio" name="method" value="email" checked={method === 'email'} onChange={() => setMethod('email')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                  <span className="ml-2 text-sm text-gray-700">Email</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="method" value="sms" checked={method === 'sms'} onChange={() => setMethod('sms')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"/>
                  <span className="ml-2 text-sm text-gray-700">SMS</span>
                </label>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                    {method === 'email' ? 'Email address' : 'Phone number'}
                  </label>
                  <div className="mt-1">
                    <input
                      id="contact"
                      name="contact"
                      type={method === 'email' ? 'email' : 'tel'}
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder={method === 'email' ? 'you@example.com' : '+1234567890'}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
              
              {/* START: Added "Back to Sign in" Link */}
              <p className="text-sm text-center text-gray-600">
                Remember your password?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
              {/* END: Added "Back to Sign in" Link */}
            </>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}