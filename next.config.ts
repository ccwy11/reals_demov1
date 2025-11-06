import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
          {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
             {
        protocol: 'https',
        hostname: 'wvhrwywa93.ufs.sh',
        port: '',
        pathname: '/**',
      },
             
            {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },    
             
             
            //  picsum.
    ],

  },
serverRuntimeConfig: {
    port: 8080,
    host: '0.0.0.0'
  }

  // output: 'standalone',
};

export default nextConfig;

