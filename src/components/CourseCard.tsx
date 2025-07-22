// src/components/CourseCard.tsx

import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

type CourseCardProps = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

const CourseCard = ({ title, description, tags, href }: CourseCardProps) => {
  return (
    <Link 
      href={href} 
      className="
        block group relative p-6 bg-slate-800/50 rounded-lg border border-slate-700 
        hover:bg-slate-800 transition-colors duration-300
      "
    >
      {/* Glowing border effect on hover */}
      <div 
        className="
          absolute -inset-px rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        "
        aria-hidden="true"
      ></div>
      
      <div className="relative">
        <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400 mb-4 h-24">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="bg-slate-700 text-cyan-300 text-xs font-medium px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center text-sky-400 font-semibold group-hover:text-sky-300">
          Start Learning
          <ArrowRightIcon className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;