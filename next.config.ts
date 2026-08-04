import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /blog moved to /research (Architecture doc §3.1 — never let an old
  // address 404). Permanent so it also carries search ranking over.
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/research",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "/research",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
