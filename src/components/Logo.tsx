// src/components/Logo.tsx

import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3"> {/* Increased gap for better spacing */}
      {/* 1. Increased the size of the Logo Image */}
      <Image 
        src="/codecracker_logo.png" 
        alt="CodeCracker Icon" 
        width={80} // Increased from 40
        height={80} // Increased from 40
        priority 
      />
      
      {/* 2. Increased the font size of the Brand Name */}
      <span className="text-3xl font-extrabold text-white tracking-tight hidden sm:block">
        CodeCracker
      </span>
    </Link>
  );
};

export default Logo;