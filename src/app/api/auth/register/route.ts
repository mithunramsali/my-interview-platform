// src/app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs'; // Import bcrypt

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('CodeCracker');
    const usersCollection = db.collection('users');

    const { fullname, email, password } = await request.json();

    if (!fullname || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    // Hash the password before saving
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 is the salt rounds

    const result = await usersCollection.insertOne({
      fullname,
      email,
      password: hashedPassword, // Save the hashed password
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'User registered successfully', userId: result.insertedId },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'An internal server error occurred' },
      { status: 500 }
    );
  }
}