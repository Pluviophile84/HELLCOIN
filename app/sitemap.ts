import type { MetadataRoute } from "next";

const siteUrl = (() => {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  const fallback = "https://hellcoin.fun";
  return (envUrl || fallback).replace(/\/+$/, "");
})();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}

