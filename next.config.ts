import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nachos-hotspot",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
