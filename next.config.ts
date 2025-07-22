/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this block to your Next.js configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;