import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work/bugsnag-vertical-pages",
        destination: "/work/bugsnag-retail-vertical",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
