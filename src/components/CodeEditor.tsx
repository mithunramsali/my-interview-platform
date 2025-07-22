// src/components/CodeEditor.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

type Language = 'javascript' | 'python' | 'java' | 'cpp';

interface CodeEditorProps {
  starterCode: Record<Language, string>;
  problemId: string;
}

const languageDisplayNames: Record<Language, string> = {
  javascript: 'JavaScript',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
};

const CodeEditor: React.FC<CodeEditorProps> = ({ starterCode, problemId }) => {
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(starterCode.javascript);
  const [results, setResults] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storageKey = `code-${problemId}-${selectedLanguage}`;
    const savedCode = localStorage.getItem(storageKey);
    setCode(savedCode || starterCode[selectedLanguage]);
    setResults(null);
  }, [selectedLanguage, problemId, starterCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    const storageKey = `code-${problemId}-${selectedLanguage}`;
    localStorage.setItem(storageKey, newCode);
  };

  const handleRunCode = async () => {
    setIsSubmitting(true);
    setResults(null);
    try {
      const executeResponse = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, problemId, language: selectedLanguage }),
      });
      const resultData = await executeResponse.json();
      if (!executeResponse.ok) throw new Error(resultData.error || 'An error occurred during execution');
      setResults(resultData);

      if (user) {
        await fetch('/api/submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            problemId: problemId,
            allTestsPassed: resultData.allTestsPassed,
          }),
        });
      }

    } catch (err: any) {
      setResults({ error: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#2d2d2d] rounded-lg shadow-lg border border-slate-700">
      <div className="px-4 py-2 bg-slate-800 rounded-t-lg flex justify-between items-center">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value as Language)}
          className="bg-slate-700 text-white text-xs rounded p-1 border border-slate-600 focus:outline-none"
        >
          {Object.entries(languageDisplayNames).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>
      </div>
      <Editor
        value={code}
        onValueChange={handleCodeChange}
        highlight={(code) => highlight(code, languages[selectedLanguage], selectedLanguage)}
        padding={16}
        className="font-mono text-sm min-h-[300px] text-white"
        style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 14 }}
      />
      
      {results && (
        <div className="px-4 py-3 border-t border-slate-700">
          <div className={`flex items-center gap-2 mb-4 p-3 rounded-md ${
            results.allTestsPassed 
              ? 'bg-green-900/50 text-green-300' 
              : 'bg-red-900/50 text-red-300'
          }`}>
            {results.allTestsPassed ? <CheckCircleIcon className="h-6 w-6" /> : <XCircleIcon className="h-6 w-6" />}
            <h3 className="text-lg font-semibold">
              {results.allTestsPassed ? 'Accepted' : 'Wrong Answer'}
            </h3>
          </div>
          
          {results.results?.map((res: any, index: number) => (
            <div key={index} className="mb-2 p-2 bg-slate-800 rounded">
              <p className="text-sm font-semibold text-white">Case {index + 1}: {res.passed ? 'Passed' : 'Failed'}</p>
              <p className="text-xs text-slate-400 mt-1">Input: <code className="bg-slate-700 p-1 rounded">{JSON.stringify(res.input)}</code></p>
              <p className="text-xs text-slate-400 mt-1">Expected: <code className="bg-slate-700 p-1 rounded">{JSON.stringify(res.expected)}</code></p>
              <p className={`text-xs mt-1 ${res.passed ? 'text-slate-400' : 'text-red-400'}`}>
                Your Output: <code className="bg-slate-700 p-1 rounded">{JSON.stringify(res.actual)}</code>
              </p>
            </div>
          ))}
          {results.error && <pre className="text-sm text-red-400 whitespace-pre-wrap">{results.error}</pre>}
        </div>
      )}

      <div className="px-4 py-3 bg-slate-800 rounded-b-lg flex justify-end">
        <button 
          onClick={handleRunCode}
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 disabled:bg-gray-500"
        >
          {isSubmitting ? 'Running...' : 'Run Code'}
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
