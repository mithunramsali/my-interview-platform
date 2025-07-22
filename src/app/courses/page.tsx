// src/app/courses/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';

const allCourses = [
    {
    category: 'frontend',
    title: 'Modern Frontend Development',
    description: 'Master the art of building beautiful, fast, and interactive user interfaces from scratch.',
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'],
    href: '/courses/frontend',
    },
    {
    category: 'backend',
    title: 'Backend with Python',
    description: 'Build powerful and scalable server-side applications using Python with the Django framework.',
    tags: ['Python', 'Django', 'APIs', 'Databases'],
    href: '/courses/backend-python',
    },
    {
    category: 'backend',
    title: 'Backend with Java',
    description: 'Leverage the robustness of Java and Spring Boot to create enterprise-grade backend systems.',
    tags: ['Java', 'Spring Boot', 'REST APIs', 'SQL'],
    href: '/courses/backend-java',
    },
    {
    category: 'backend',
    title: 'Backend with JavaScript',
    description: 'Use your JavaScript skills on the server with Node.js and Express to build fast and efficient APIs.',
    tags: ['Node.js', 'Express', 'APIs', 'MongoDB'],
    href: '/courses/backend-js',
    },
    {
    category: 'fullstack',
    title: 'Full Stack with Python & React',
    description: 'Become a complete developer by combining a Python/Django backend with a modern React frontend.',
    tags: ['Python', 'Django', 'React', 'Full Stack'],
    href: '/courses/fullstack-python',
    },
    {
    category: 'fullstack',
    title: 'Full Stack with Java & React',
    description: 'Master the full development lifecycle with a powerful Java/Spring Boot backend and a React frontend.',
    tags: ['Java', 'Spring Boot', 'React', 'Full Stack'],
    href: '/courses/fullstack-java',
    },
    {
    category: 'fullstack',
    title: 'MERN Stack Development',
    description: 'Build and deploy complete, end-to-end applications using MongoDB, Express.js, React, and Node.js.',
    tags: ['MERN', 'JavaScript', 'MongoDB', 'Full Stack'],
    href: '/courses/fullstack-mern',
    },
];

const tabs = ['All', 'Frontend', 'Backend', 'Full Stack'];

export default function CoursesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const filteredCourses = activeTab === 'All'
    ? allCourses
    : allCourses.filter(course => course.category === activeTab.toLowerCase().replace(' ', ''));

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-slate-900 text-white min-h-screen">
        <div
          className="relative bg-cover bg-center py-24"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-slate-900 opacity-70"></div>
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold">Course Catalog</h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              From frontend design to backend logic, find the perfect path to launch your tech career.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center border-b border-slate-700 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  px-6 py-3 font-semibold text-lg transition-colors duration-300
                  ${activeTab === tab 
                    ? 'text-white border-b-2 border-cyan-400' 
                    : 'text-slate-400 hover:text-white'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
