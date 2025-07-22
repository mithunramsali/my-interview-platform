// src/app/page.tsx

import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-slate-900">
        <HeroSection />
        <FeaturesSection />
        {/* The "Featured Courses" section has been removed from here */}
      </main>
      <Footer />
    </>
  );
}