// src/app/api/problems/[problemId]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// This is the context object that Next.js passes to the function.
// It must contain a 'params' property.
interface RouteContext {
  params: {
    problemId: string;
  }
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { params } = context; // Destructure params from the context object
    const client = await clientPromise;
    const db = client.db('CodeCracker');

    const problem = await db
      .collection('problems')
      .findOne({ id: params.problemId });

    if (!problem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 });
    }

    return NextResponse.json(problem);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch problem' }, { status: 500 });
  }
}