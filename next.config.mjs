/**
 * Next config.
 *
 * For the GitHub Pages deploy we build a fully static export under a repo
 * subpath. That behavior is gated behind GITHUB_PAGES=true (set only in the
 * Pages CI workflow) so local `npm run dev` / `npm run build` stay a normal
 * Next.js app — ready to add server features / Supabase later.
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isPages
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        images: { unoptimized: true },
        env: { BASE_PATH: basePath },
      }
    : {}),
};

export default nextConfig;
