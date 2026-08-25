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
      // The Framework Library index page is gone — the dark Framework
      // Library section on /research is now the only listing. Permanent
      // so external links and search ranking carry over.
      {
        source: "/frameworks",
        destination: "/research#framework-library",
        permanent: true,
      },
      // Legacy /notes system retired in favor of /research/notes. No
      // legacy slug maps 1:1 to a current note, so both the index and
      // any sub-path land on the current index.
      {
        source: "/notes",
        destination: "/research/notes",
        permanent: true,
      },
      {
        source: "/notes/:path*",
        destination: "/research/notes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
