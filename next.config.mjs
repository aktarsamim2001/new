/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sukaii-admin.notebrains.com',
      },
    ],
  },
};

export default nextConfig;
