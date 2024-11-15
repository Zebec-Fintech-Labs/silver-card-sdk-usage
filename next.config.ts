import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["@zebec-fintech/card-minimal-sdk"] = path.resolve(
      __dirname,
      "node_modules/@zebec-fintech/card-minimal-sdk"
    );
    return config;
  },
};

export default nextConfig;
