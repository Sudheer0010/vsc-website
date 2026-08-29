import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: lets the Next dev server accept requests proxied through a
  // Cloudflare Quick Tunnel (random *.trycloudflare.com host each run).
  // Without this, the dev server's cross-origin check 403s on /_next/*
  // asset requests whose Origin header doesn't match localhost, which
  // breaks hydration and leaves the tunnel-loaded page blank. No effect
  // on `next build`/`next start` — this option is dev-server only.
  allowedDevOrigins: ["*.trycloudflare.com"],

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
