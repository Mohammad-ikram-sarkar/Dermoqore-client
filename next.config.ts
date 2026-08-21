import type { NextConfig } from "next";

const apiUrl = process.env.API_URL ?? "http://localhost:8000";

const remotePatterns: NextConfig["images"] = {
  remotePatterns: [
    { protocol: "http", hostname: "localhost", port: "8000" },
    { protocol: "https", hostname: "localhost", port: "8000" },
    // Banner / CMS images are served from external CDNs (e.g. Cloudinary).
    // Allow any host so new CDNs work without a config change.
    { protocol: "https", hostname: "**" },
    { protocol: "http", hostname: "**" },
  ],
};

// Also allow the configured API host explicitly (supports IPs / custom hosts).
try {
  const { hostname, port, protocol } = new URL(apiUrl);
  if (hostname && hostname !== "localhost") {
    remotePatterns.remotePatterns!.push({
      protocol: protocol === "https:" ? "https" : "http",
      hostname,
      ...(port ? { port } : {}),
    });
  }
} catch {
  // API_URL not a valid URL — keep localhost defaults above.
}

const nextConfig: NextConfig = {
  images: remotePatterns,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
