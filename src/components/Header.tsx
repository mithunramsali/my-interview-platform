// src/components/Header.tsx

"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      logout(); // This will clear the user from the frontend state
      // Optionally, redirect the user
      window.location.href = '/login';
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <header className="bg-slate-950 sticky top-0 z-50 w-full border-b border-slate-700">
      <div className="flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
          <Link href="/courses" className="text-slate-300 hover:text-white">Courses</Link>
          <Link href="/practice" className="text-slate-300 hover:text-white">Practice</Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="text-slate-300 hover:text-white">
                Hi, {user.fullname.split(' ')[0]}!
              </Link>
              <button 
                onClick={handleLogout} // Use the new handler
                className="bg-red-600 text-white px-5 py-2.5 rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
