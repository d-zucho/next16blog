import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allow images from unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        hostname: 'proper-roadrunner-962.convex.cloud',
        protocol: 'https',
        port: '',
      }
    ],
  },
};

export default nextConfig;
