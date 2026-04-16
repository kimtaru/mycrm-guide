import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";
import { createLlmPageMetadata } from "../metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  return createLlmPageMetadata({
    titleKo: "@mycrm-ui/react-table LLM Guide - 행 클릭 / 키보드 내비게이션",
    titleEn: "@mycrm-ui/react-table LLM Guide - Row Click / Keyboard Navigation",
    descriptionKo: "@mycrm-ui/react-table 행 클릭 / 키보드 내비게이션 파트의 LLM 가이드입니다.",
    descriptionEn: "@mycrm-ui/react-table LLM guide for the row click and keyboard navigation section.",
    pathname: "/document/react-table/llm/row-events",
    searchParams,
  });
}

export default async function ReactTableRowEventsLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "row-events",
    titleKo: "행 클릭 / 키보드 내비게이션",
    titleEn: "Row Click / Keyboard Navigation",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 행 상호작용과 셀 포커스 이동을 분리해서 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to separate row-level interactions from cell-focus navigation in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-row-events",
    searchParams,
  });
}
