/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "towxpbhkteuivfortifw.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/images-bucket/**",
      },
    ],
  },
};

export default nextConfig;
