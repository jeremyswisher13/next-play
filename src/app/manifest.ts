import type { MetadataRoute } from "next";

// Required for `output: export` (static generation of the manifest route).
export const dynamic = "force-static";

// Prefix paths with the deploy base path (e.g. "/next-play" on GitHub Pages).
const base = process.env.BASE_PATH || "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next Play — Sports Injury Navigator",
    short_name: "Next Play",
    description:
      "Clearer injury decisions. Safer return to play. Bilingual sports injury guidance.",
    start_url: `${base}/`,
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0f766e",
    icons: [
      {
        src: `${base}/icon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: `${base}/icon-192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${base}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${base}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
