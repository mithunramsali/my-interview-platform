// src/app/api/problems/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { cookies } from 'next/headers'; // Import the 'cookies' function
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('CodeCracker');
    
    // Get the cookie store directly
    const cookieStore = cookies();
    const token = (await cookieStore).get('authToken')?.value;

    let userId = null;
    if (token) {
        try {
            const decoded: any = jwt.verify(token, JWT_SECRET);
            userId = decoded.id;
        } catch (e) {
            console.log('Invalid token');
        }
    }

    // Fetch all problems
    let problems = await db.collection('problems').find({}).toArray();

    // If a user is logged in, fetch their submissions and merge the status
    if (userId) {
        const submissions = await db.collection('submissions').find({ userId: new ObjectId(userId) }).toArray();
        const submissionMap = new Map(submissions.map(s => [s.problemId, s.status]));

        problems = problems.map(problem => ({
            ...problem,
            status: submissionMap.get(problem.id) || 'Todo',
        }));
    } else {
        // If no user is logged in, default all statuses to 'Todo'
        problems = problems.map(problem => ({
            ...problem,
            status: 'Todo',
        }));
    }

    return NextResponse.json(problems);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch problems' }, { status: 500 });
  }
}
