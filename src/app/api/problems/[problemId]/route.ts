// src/app/api/problems/[problemId]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request, context: { params: { problemId: string } }) {
  try {
    // Use await if params is a promise that needs to resolve
    const { problemId } = await context.params; // Ensure params are awaited here

    const client = await clientPromise;
    const db = client.db('CodeCracker');

    const problem = await db
      .collection('problems')
      .findOne({ id: problemId });

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    return NextResponse.json(problem);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch problem' }, { status: 500 });
  }
}
