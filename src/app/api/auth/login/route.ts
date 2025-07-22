// src/app/api/auth/login/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { serialize } from 'cookie'; // Import cookie serializer

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key'; // IMPORTANT: Add this to .env.local

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('CodeCracker');
    const user = await db.collection('users').findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 1. Create the JWT payload
    const payload = {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
    };

    // 2. Sign the token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day

    // 3. Serialize the cookie
    const serializedCookie = serialize('authToken', token, {
      httpOnly: true, // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      path: '/',
    });

    const response = NextResponse.json(
      { message: 'Login successful', user: payload },
      { status: 200 }
    );

    // 4. Set the cookie in the response headers
    response.headers.set('Set-Cookie', serializedCookie);

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
