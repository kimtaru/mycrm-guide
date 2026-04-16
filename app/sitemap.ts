import type { MetadataRoute } from "next";

import { REACT_TABLE_LLM_GUIDE_PARTS } from "./document/react-table/llm/guide-parts";

const DEFAULT_SITE_URL = "https://www.mycrm-ui.com";

function getSiteUrl() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
    DEFAULT_SITE_URL;

  return siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes = [
    "",
    "/document",
    "/document/core",
    "/document/react",
    "/document/react-table",
    "/document/react-table/llm",
  ];

  const llmGuideRoutes = REACT_TABLE_LLM_GUIDE_PARTS.flatMap((part) => [
    `/document/react-table/llm/${part.partSlug}`,
    `/document/react-table/llm/${part.partSlug}/md`,
  ]);

  return [...staticRoutes, ...llmGuideRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
  }));
}
