// src/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  // Create a cookie that is already expired
  const serializedCookie = serialize('authToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: -1, // Expire immediately
    path: '/',
  });

  const response = NextResponse.json({ message: 'Logout successful' });
  response.headers.set('Set-Cookie', serializedCookie);
  return response;
}
