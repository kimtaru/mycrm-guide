import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderReactTableLlmGuideMarkdownPage } from "../../guide-md-page";
import {
  getReactTableLlmGuidePart,
  REACT_TABLE_LLM_GUIDE_PARTS,
} from "../../guide-parts";

type GuidePartSlug = (typeof REACT_TABLE_LLM_GUIDE_PARTS)[number]["partSlug"];

function isGuidePartSlug(value: string): value is GuidePartSlug {
  return REACT_TABLE_LLM_GUIDE_PARTS.some((part) => part.partSlug === value);
}

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide Markdown",
  description: "@mycrm-ui/react-table LLM Guide Markdown source page.",
};

export default async function ReactTableLlmGuideMarkdownEntryPage({
  params,
  searchParams,
}: {
  params: Promise<{ part: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { part } = await params;

  if (!isGuidePartSlug(part)) {
    notFound();
  }

  const guidePart = getReactTableLlmGuidePart(part);

  if (!guidePart) {
    notFound();
  }

  return renderReactTableLlmGuideMarkdownPage({
    partSlug: part,
    titleKo: guidePart.titleKo,
    titleEn: guidePart.titleEn,
    sectionHref: guidePart.sectionHref,
    searchParams,
  });
}
