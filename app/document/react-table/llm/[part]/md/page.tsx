import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderReactTableLlmGuideMarkdownPage } from "../../guide-md-page";
import {
  getReactTableLlmGuidePart,
  REACT_TABLE_LLM_GUIDE_PARTS,
} from "../../guide-parts";
import { createLlmPageMetadata } from "../../metadata";

type GuidePartSlug = (typeof REACT_TABLE_LLM_GUIDE_PARTS)[number]["partSlug"];

function isGuidePartSlug(value: string): value is GuidePartSlug {
  return REACT_TABLE_LLM_GUIDE_PARTS.some((part) => part.partSlug === value);
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ part: string }>;
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { part } = await params;

  if (!isGuidePartSlug(part)) {
    return {};
  }

  const guidePart = getReactTableLlmGuidePart(part);

  if (!guidePart) {
    return {};
  }

  return createLlmPageMetadata({
    titleKo: `@mycrm-ui/react-table LLM Markdown - ${guidePart.titleKo}`,
    titleEn: `@mycrm-ui/react-table LLM Markdown - ${guidePart.titleEn}`,
    descriptionKo: `@mycrm-ui/react-table ${guidePart.titleKo} 파트의 LLM용 원문 Markdown 페이지입니다.`,
    descriptionEn: `Raw Markdown page for the ${guidePart.titleEn} LLM guide section of @mycrm-ui/react-table.`,
    pathname: `/document/react-table/llm/${part}/md`,
    searchParams,
  });
}

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
