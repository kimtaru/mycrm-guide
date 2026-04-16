import type { MetadataRoute } from "next";

import { REACT_TABLE_LLM_GUIDE_PARTS } from "./document/react-table/llm/guide-parts";
import { getSiteUrl } from "./lib/site-url";

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
