import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/api/image/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dulces-petalos.jakala.es",
      },
    ],
  },
};

export default nextConfig;
