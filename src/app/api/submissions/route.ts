// src/app/api/submissions/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId

export async function POST(request: Request) {
  try {
    const { userId, problemId, allTestsPassed } = await request.json();

    if (!userId || !problemId) {
      return NextResponse.json({ message: 'Missing userId or problemId' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('CodeCracker');
    const submissionsCollection = db.collection('submissions');

    const newStatus = allTestsPassed ? 'Solved' : 'Attempted';

    // Find the existing submission for this user and problem, or create a new one
    await submissionsCollection.updateOne(
      { 
        userId: new ObjectId(userId), // Ensure userId is a valid ObjectId
        problemId: problemId 
      },
      { 
        $set: { 
          status: newStatus,
          lastAttempted: new Date()
        },
        $setOnInsert: { // These fields are only set when a new document is created
            userId: new ObjectId(userId),
            problemId: problemId
        }
      },
      { upsert: true } // This option creates the document if it doesn't exist
    );

    return NextResponse.json({ message: 'Status updated successfully', status: newStatus }, { status: 200 });

  } catch (error) {
    console.error('Submission API error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
