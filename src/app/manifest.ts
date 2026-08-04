import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Thairapy",
    description: siteConfig.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3eb",
    theme_color: "#15180f",
    // Static `app/icon.png` is served at /icon.png — "/icon" is only the route
    // for a generated icon (icon.tsx) and 404s here.
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
