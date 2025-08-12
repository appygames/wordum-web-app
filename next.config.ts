import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    domains: ['wordum.s3.us-east-1.amazonaws.com'],
  },
};

export default nextConfig;
