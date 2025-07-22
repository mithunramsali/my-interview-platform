// src/context/AuthContext.tsx

"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  fullname: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean; // New loading state
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start in a loading state

  useEffect(() => {
    // In a real app, you might check a token here
    // For now, we'll just finish loading
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};