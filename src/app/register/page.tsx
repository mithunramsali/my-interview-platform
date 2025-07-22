// src/app/register/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

export default function RegisterPage() {
  const router = useRouter();
  
  // State for form fields
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for password validation UI
  const [validations, setValidations] = useState({
    minLength: false,
    hasCapital: false,
    hasNumber: false,
    hasSymbol: false,
  });

  // State for form submission status
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Effect to validate password in real-time
  useEffect(() => {
    setValidations({
      minLength: password.length >= 8,
      hasCapital: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[^A-Za-z0-9]/.test(password),
    });
  }, [password]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(''); // Reset error message
    
    // --- Frontend Validation ---
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!validations.minLength || !validations.hasCapital || !validations.hasNumber || !validations.hasSymbol) {
        setError("Password does not meet the requirements.");
        return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullname, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If API returns an error, show it
        throw new Error(data.message || 'Something went wrong');
      }

      // If registration is successful
      setSuccess(true);
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          {success ? (
            <div className='text-center'>
              <h2 className="text-3xl font-extrabold text-gray-900">Registration Successful!</h2>
              <p className="mt-4 text-gray-600">Redirecting you to the login page...</p>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-extrabold text-center text-gray-900">
                Create your account
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* --- Form Inputs --- */}
                <div>
                  <label htmlFor="fullname">Full Name</label>
                  <input id="fullname" type="text" required value={fullname} onChange={e => setFullname(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                <div>
                  <label htmlFor="email">Email address</label>
                  <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                
                {/* --- Password Validation UI --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 text-sm">
                  <ValidationItem isValid={validations.minLength} text="At least 8 characters" />
                  <ValidationItem isValid={validations.hasCapital} text="One capital letter" />
                  <ValidationItem isValid={validations.hasNumber} text="One number" />
                  <ValidationItem isValid={validations.hasSymbol} text="One symbol" />
                </div>

                <div>
                  <label htmlFor="confirm-password">Confirm Password</label>
                  <input id="confirm-password" type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm"/>
                </div>
                
                {/* --- Error Message Display --- */}
                {error && <p className="text-sm text-red-600">{error}</p>}
                
                {/* --- Submit Button --- */}
                <div>
                  <button type="submit" disabled={submitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400">
                    {submitting ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </form>
              <p className="text-sm text-center text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

// Helper component for validation items
const ValidationItem = ({ isValid, text }: { isValid: boolean, text: string }) => (
  <div className="flex items-center">
    {isValid ? (
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
    ) : (
      <XCircleIcon className="h-5 w-5 text-gray-400" />
    )}
    <span className={`ml-2 ${isValid ? 'text-gray-700' : 'text-gray-500'}`}>{text}</span>
  </div>
);