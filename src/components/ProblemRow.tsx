// src/components/ProblemRow.tsx

import Link from 'next/link';
import { CheckCircleIcon, PencilIcon } from '@heroicons/react/24/solid';

export type Problem = {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  status: 'Solved' | 'Attempted' | 'Todo';
  description?: string;
  testCases?: any[];
};

type ProblemRowProps = {
  problem: Problem;
};

const ProblemRow = ({ problem }: ProblemRowProps) => {
  const difficultyColor = {
    Easy: 'text-emerald-700 bg-emerald-100',
    Medium: 'text-amber-700 bg-amber-100',
    Hard: 'text-red-700 bg-red-100',
  }[problem.difficulty];

  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors duration-200">
      <td className="px-5 py-4">
        {problem.status === 'Solved' && (
          <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
        )}
        {problem.status === 'Attempted' && (
          <PencilIcon className="h-6 w-6 text-amber-500" />
        )}
      </td>
      <td className="px-5 py-4">
        <Link href={`/practice/${problem.id}`} className="font-medium text-slate-800 hover:text-indigo-600">
          {problem.title}
        </Link>
      </td>
      <td className="px-5 py-4">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${difficultyColor}`}>
          {problem.difficulty}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-slate-500">
        {problem.topic}
      </td>
    </tr>
  );
};

export default ProblemRow;