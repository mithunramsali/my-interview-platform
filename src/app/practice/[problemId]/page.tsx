// src/app/practice/[problemId]/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Problem } from '@/components/ProblemRow';
import CodeEditor from '@/components/CodeEditor';

export default function ProblemPage() {
  const params = useParams();
  const problemId = params.problemId as string;

  const [problem, setProblem] = useState<Problem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!problemId) return;
    const fetchProblem = async () => {
      try {
        const res = await fetch(`/api/problems/${problemId}`);
        if (!res.ok) throw new Error('Problem not found');
        const data = await res.json();
        setProblem(data);
      } catch (error) {
        console.error("Failed to fetch problem:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  const starterCodeTemplates = {
    javascript: `function solve(args) {\n  // Your code here\n  return true;\n}`,
    python: `def solve(args):\n  # Your code here\n  return True`,
    java: `class Solution {\n    public boolean solve(String[] args) {\n        // Your code here\n        return true;\n    }\n}`,
    cpp: `#include <iostream>\n#include <vector>\n\nbool solve(std::vector<std::string> args) {\n    // Your code here\n    return true;\n}`,
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!problem) {
    return <div className="flex justify-center items-center min-h-screen">Problem not found.</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Panel: Problem Description */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{problem.title}</h1>
            <div className="flex items-center gap-4 mb-6">
               <span className={`px-3 py-1 text-xs leading-5 font-semibold rounded-full ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
               }`}>
                  {problem.difficulty}
              </span>
              <span className="text-sm text-gray-500">Topic: {problem.topic}</span>
            </div>
            <div className="prose mb-8">
              <p>{problem.description}</p>
            </div>

            {/* START: Changed "Examples" to "Test Cases" */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Cases</h2>
              {problem.testCases?.map((testCase: any, index: number) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-700">Case {index + 1}:</p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Input:</strong> <code className="bg-gray-200 p-1 rounded">{JSON.stringify(testCase.input)}</code>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Output:</strong> <code className="bg-gray-200 p-1 rounded">{JSON.stringify(testCase.output)}</code>
                  </p>
                </div>
              ))}
            </div>
            {/* END: Change */}

          </div>

          {/* Right Panel: Code Editor */}
          <div>
            <CodeEditor starterCode={starterCodeTemplates} problemId={problemId} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
