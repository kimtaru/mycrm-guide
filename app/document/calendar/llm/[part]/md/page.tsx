import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "../../../../../lib/metadata";
import { renderCalendarLlmGuideMarkdownPage } from "../../guide-md-page";
import {
  CALENDAR_LLM_GUIDE_PARTS,
  getCalendarLlmGuidePart,
} from "../../guide-parts";

type GuidePartSlug = (typeof CALENDAR_LLM_GUIDE_PARTS)[number]["partSlug"];

function isGuidePartSlug(value: string): value is GuidePartSlug {
  return CALENDAR_LLM_GUIDE_PARTS.some((part) => part.partSlug === value);
}

export function generateStaticParams() {
  return CALENDAR_LLM_GUIDE_PARTS.map((part) => ({ part: part.partSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ part: string }>;
}): Promise<Metadata> {
  const { part } = await params;

  if (!isGuidePartSlug(part)) {
    return {};
  }

  const guidePart = getCalendarLlmGuidePart(part);

  if (!guidePart) {
    return {};
  }

  return createPageMetadata({
    title: `@mycrm-ui/components Calendar LLM Markdown - ${guidePart.titleKo}`,
    description: `${guidePart.titleKo} 파트의 LLM용 원문 Markdown 페이지입니다.`,
    pathname: `/document/calendar/llm/${part}/md`,
  });
}

export default async function CalendarLlmGuideMarkdownEntryPage({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;

  if (!isGuidePartSlug(part)) {
    notFound();
  }

  return renderCalendarLlmGuideMarkdownPage(part);
}
