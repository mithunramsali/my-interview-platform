// src/app/practice/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProblemRow, { Problem } from '@/components/ProblemRow';

const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];
const statusOptions = ['All', 'Solved', 'Attempted', 'Todo'];

export default function PracticePage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();

  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [isLoadingProblems, setIsLoadingProblems] = useState(true);

  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/login');
    }
  }, [user, isAuthLoading, router]);

  useEffect(() => {
    if (user) {
      const fetchProblems = async () => {
        setIsLoadingProblems(true);
        try {
          const res = await fetch('/api/problems');
          const data = await res.json();
          setAllProblems(data);
        } catch (error) {
          console.error("Failed to fetch problems:", error);
        } finally {
          setIsLoadingProblems(false);
        }
      };
      fetchProblems();
    }
  }, [user]);

  const filteredProblems = allProblems.filter(p => {
    const difficultyMatch = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    // --- THIS IS THE CORRECTED LINE ---
    const statusMatch = statusFilter === 'All' || p.status === statusFilter;
    return difficultyMatch && statusMatch;
  });

  if (isAuthLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="text-left mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Problem Set
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Hone your skills with our curated list of coding challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Filters</h3>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {difficultyOptions.map(opt => (
                    <button key={opt} onClick={() => setDifficultyFilter(opt)} className={`px-3 py-1 text-sm rounded-full transition-colors ${difficultyFilter === opt ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(opt => (
                    <button key={opt} onClick={() => setStatusFilter(opt)} className={`px-3 py-1 text-sm rounded-full transition-colors ${statusFilter === opt ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <div className="lg:col-span-3">
            <div className="shadow-sm border border-slate-200 rounded-lg overflow-hidden bg-white">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Title</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Difficulty</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Topic</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {isLoadingProblems ? (
                    <tr><td colSpan={4} className="text-center py-8">Loading Problems...</td></tr>
                  ) : (
                    filteredProblems.map((problem) => (
                      <ProblemRow key={problem.id} problem={problem} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
