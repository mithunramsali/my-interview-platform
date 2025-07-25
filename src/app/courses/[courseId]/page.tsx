// src/app/courses/[courseId]/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PlayCircleIcon } from '@heroicons/react/24/solid';

interface Lesson {
  title: string;
  duration: string;
}

interface Course {
  title: string;
  description: string;
  instructor: string;
  videoId: string;
  curriculum: Lesson[];
}

// In a real app, this data would be fetched from your database
const coursesData: Record<string, Course> = {
  'frontend': {
    title: 'Modern Frontend Development',
    description: 'Master the art of building beautiful, fast, and interactive user interfaces from scratch.',
    instructor: 'freeCodeCamp.org',
    videoId: 'MsnQ5uepIaE',
    curriculum: [
      { title: 'Introduction to HTML5', duration: '15:20' },
      { title: 'Styling with CSS3 & Flexbox', duration: '45:10' },
      { title: 'JavaScript Fundamentals', duration: '1:30:05' },
      { title: 'Building with React', duration: '2:10:45' },
      { title: 'Deploying Your First App', duration: '25:00' },
    ]
  },
  'backend-python': {
    title: 'Backend with Python',
    description: 'Build powerful and scalable server-side applications using Python with the Django framework.',
    instructor: 'freeCodeCamp.org',
    videoId: 'ftKiHCDVwfA',
    curriculum: [
      { title: 'Introduction to Backend', duration: '10:15' },
      { title: 'Setting up Python & Django', duration: '30:55' },
    ]
  },
  'backend-js': {
    title: 'Backend with JavaScript',
    description: 'Use your JavaScript skills on the server with Node.js and Express to build fast and efficient APIs.',
    instructor: 'freeCodeCamp.org',
    videoId: '7fjOw8ApZ1I',
    curriculum: [
      { title: 'Intro to Node.js & NPM', duration: '12:45' },
      { title: 'Building a Server with Express', duration: '40:20' },
    ]
  },
  'backend-java': {
    title: 'Backend with Java',
    description: 'Leverage the robustness of Java and Spring Boot to create enterprise-grade backend systems.',
    instructor: 'Amigoscode',
    videoId: 'rIzUe-Bb1c8',
    curriculum: [
        { title: 'Introduction to Java', duration: '20:00' },
        { title: 'Setting up Spring Boot', duration: '25:30' },
    ]
  },
  'fullstack-python': {
    title: 'Full Stack with Python & React',
    description: 'Become a complete developer by combining a Python/Django backend with a modern React frontend.',
    instructor: 'Codio',
    videoId: 'RT6IHsuriMI',
    curriculum: [
        { title: 'Project Setup', duration: '15:00' },
        { title: 'Building the Django Backend', duration: '1:30:00' },
    ]
  },
  'fullstack-java': {
    title: 'Full Stack with Java & React',
    description: 'Master the full development lifecycle with a powerful Java/Spring Boot backend and a React frontend.',
    instructor: 'Telusko',
    videoId: 'fmX84zu-5gs',
    curriculum: [
        { title: 'Spring Boot Backend Setup', duration: '22:15' },
        { title: 'Building the API Layer', duration: '1:10:00' },
    ]
  },
  'fullstack-mern': {
    title: 'MERN Stack Development',
    description: 'Build and deploy complete, end-to-end applications using MongoDB, Express.js, React, and Node.js.',
    instructor: 'freeCodeCamp.org',
    videoId: 'CvCiNeLnZ00',
    curriculum: [
        { title: 'Project Overview & Setup', duration: '10:00' },
        { title: 'Building the Express API', duration: '1:25:00' },
    ]
  },
};

export default function CoursePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  
  const course = coursesData[courseId];

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">Loading...</div>;
  }

  if (!course) {
    return <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">Course not found.</div>;
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <iframe 
                className="w-full h-[300px] md:h-[500px] rounded-lg shadow-2xl"
                src={`https://www.youtube.com/embed/${course.videoId}`}
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <h1 className="text-4xl font-extrabold mb-2">{course.title}</h1>
            <p className="text-slate-400 mb-4">Instructor: {course.instructor}</p>
            <p className="text-slate-300">{course.description}</p>
          </div>
          <aside className="lg:col-span-1">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
              <ul className="space-y-3">
                {course.curriculum.map((lesson: Lesson, index: number) => (
                  <li key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-md">
                    <div className="flex items-center">
                      <PlayCircleIcon className="h-6 w-6 text-cyan-400 mr-3" />
                      <span className="text-slate-200">{lesson.title}</span>
                    </div>
                    <span className="text-xs text-slate-400">{lesson.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
