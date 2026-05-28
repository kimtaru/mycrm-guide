import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createPageMetadata } from "../../../../lib/metadata";
import { renderCalendarLlmGuidePage } from "../guide-page";
import {
  CALENDAR_LLM_GUIDE_PARTS,
  getCalendarLlmGuidePart,
} from "../guide-parts";

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
    title: `@mycrm-ui/components Calendar LLM Guide - ${guidePart.titleKo}`,
    description: guidePart.hintKo,
    pathname: `/document/calendar/llm/${part}`,
  });
}

export default async function CalendarLlmGuideEntryPage({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;

  if (!isGuidePartSlug(part)) {
    notFound();
  }

  return renderCalendarLlmGuidePage(part);
}
