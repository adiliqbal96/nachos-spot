import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nachos-spot",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
