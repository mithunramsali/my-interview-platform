// src/components/HeroSection.tsx
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative text-white animated-gradient">
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-slate-400">
          Your Gateway to a Top Tech Career
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          Master in-demand skills with our project-based courses and land your dream job in the tech industry.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/courses" className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors">
            Explore Courses
          </Link>
          <Link href="/register" className="bg-slate-700 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-slate-600 transition-colors">
            Sign Up Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;