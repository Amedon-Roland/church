import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Les images envoyées depuis l'administration passent par une action serveur.
  experimental: { serverActions: { bodySizeLimit: "2mb" } },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
  // Le texte biblique est lu sur le disque par ces routes : on l'embarque au déploiement.
  outputFileTracingIncludes: {
    "/bible/**": ["./data/bible/lsg.json"],
    "/api/bible/**": ["./data/bible/lsg.json"],
    "/": ["./data/bible/lsg.json"],
  },
  async redirects() {
    return [
      { source: "/about", destination: "/eglise", permanent: true },
      { source: "/sermon", destination: "/direct", permanent: true },
      { source: "/contact", destination: "/nous-trouver", permanent: true },
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
