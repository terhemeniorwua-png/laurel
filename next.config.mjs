/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    // Allow next/image to use quality 75 (default) and 85 (used in hero carousel)
    qualities: [75, 85],
    remotePatterns: [
      {
        // Unsplash image CDN — used for hero carousel school photography
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-**",
      },
    ],
  },
};

export default nextConfig;
