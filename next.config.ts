import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "open-api.delcom.org",
      },
    ],
  },
  // Tambahkan ini agar aman dari CORS
  async rewrites() {
    return [
      {
        source: "/api-delcom/:path*",
        destination: "https://open-api.delcom.org/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;