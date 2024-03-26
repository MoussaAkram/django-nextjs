/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            pathname: '/t/p/**',
          },
          {
            protocol: 'https',
            hostname: 'upload-os-bbs.hoyolab.com',
            pathname: '/upload/**',
          },
        ],
      },
};

export default nextConfig;

// https://upload-os-bbs.hoyolab.com/upload/2022/09/16/074db8f69d6b4eb66139b837405416f6_2637497491200521781.png