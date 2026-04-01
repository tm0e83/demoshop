import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/profile',
        destination: '/profile/overview',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true,
      },
    ];
  },  
  images: {
    dangerouslyAllowSVG: true,       
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.placeholders.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },  
};

export default nextConfig;
