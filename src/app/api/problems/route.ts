// src/app/api/problems/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

interface DecodedToken {
  id: string;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('CodeCracker');
    
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    let userId = null;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
            userId = decoded.id;
        } catch {
            console.log('Invalid token');
        }
    }

    let problems = await db.collection('problems').find({}).toArray();

    if (userId) {
        const submissions = await db.collection('submissions').find({ userId: new ObjectId(userId) }).toArray();
        const submissionMap = new Map(submissions.map(s => [s.problemId, s.status]));

        problems = problems.map(problem => ({
            ...problem,
            status: submissionMap.get(problem.id) || 'Todo',
        }));
    } else {
        problems = problems.map(problem => ({
            ...problem,
            status: 'Todo',
        }));
    }

    return NextResponse.json(problems);
  } catch (e) {
    const error = e as Error;
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch problems' }, { status: 500 });
  }
}