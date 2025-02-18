import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pgqopytnbkjovvnwtvun.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/images-bucket/**",
      },
    ],
  },

  experimental: {
    staleTimes: {
      static: 6 * 60 * 60, // (6 hours)
      dynamic: 1,
    },
  },
};

export default nextConfig;
