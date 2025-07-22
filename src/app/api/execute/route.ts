// src/app/api/execute/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Define a type for the test cases
interface TestCase {
  input: Record<string, unknown>;
  output: any;
}

const languageToId: { [key: string]: number } = {
  javascript: 93,
  python: 92,
  java: 91,
  cpp: 54,
};

const JUDGE0_API_HOST = process.env.JUDGE0_API_HOST;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

export async function POST(request: Request) {
  if (!JUDGE0_API_HOST || !JUDGE0_API_KEY) {
    return NextResponse.json({ error: 'Judge0 API credentials are not configured.' }, { status: 500 });
  }

  try {
    const { code, problemId, language } = await request.json();

    const client = await clientPromise;
    const db = client.db('CodeCracker');
    const problem = await db.collection('problems').findOne({ id: problemId });

    if (!problem || !problem.testCases) {
      return NextResponse.json({ error: 'Test cases not found for this problem' }, { status: 404 });
    }

    const submissionPromises = problem.testCases.map((testCase: TestCase) => {
      let sourceCode = code;
      if (language === 'python') {
        const inputString = Object.values(testCase.input).map(val => JSON.stringify(val)).join(', ');
        sourceCode += `\nprint(solve(${inputString}))`;
      }
      
      return fetch(`https://${JUDGE0_API_HOST}/submissions?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': JUDGE0_API_HOST,
          'X-RapidAPI-Key': JUDGE0_API_KEY,
        },
        body: JSON.stringify({
          source_code: sourceCode,
          language_id: languageToId[language],
        }),
      });
    });

    const responses = await Promise.all(submissionPromises);
    const submissionResults = await Promise.all(responses.map(res => res.json()));

    const results = [];
    let allTestsPassed = true;

    for (let i = 0; i < submissionResults.length; i++) {
      const result = submissionResults[i];
      const testCase = problem.testCases[i];
      
      if (result && result.status && result.status.id) {
        let passed = false;
        const actualOutputTrimmed = (result.stdout || '').trim();
        let actualOutput: any = actualOutputTrimmed;

        if (result.status.id === 3) {
           try {
              actualOutput = JSON.parse(actualOutputTrimmed);
           } catch {
              if (typeof testCase.output === 'boolean') {
                if (actualOutputTrimmed.toLowerCase() === 'true') actualOutput = true;
                else if (actualOutputTrimmed.toLowerCase() === 'false') actualOutput = false;
              }
           }
           passed = JSON.stringify(actualOutput) === JSON.stringify(testCase.output);
        }
        
        if (!passed) allTestsPassed = false;

        results.push({
          input: testCase.input,
          expected: testCase.output,
          actual: result.stderr || actualOutput,
          passed,
        });
      } else {
        allTestsPassed = false;
        results.push({
          input: testCase.input,
          expected: testCase.output,
          actual: result.message || 'An unknown error occurred',
          passed: false,
        });
      }
    }

    return NextResponse.json({ allTestsPassed, results });

  } catch (e) { // Type the error as 'unknown'
    const error = e as Error;
    console.error("Execution API error:", error);
    return NextResponse.json({ error: `An internal server error occurred: ${error.message}` }, { status: 500 });
  }
}
