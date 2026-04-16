import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";
import { createLlmPageMetadata } from "../metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  return createLlmPageMetadata({
    titleKo: "@mycrm-ui/react-table LLM Guide - 체크박스 선택",
    titleEn: "@mycrm-ui/react-table LLM Guide - Checkbox Selection",
    descriptionKo: "@mycrm-ui/react-table 체크박스 선택 파트의 LLM 가이드입니다.",
    descriptionEn: "@mycrm-ui/react-table LLM guide for the checkbox selection section.",
    pathname: "/document/react-table/llm/selection",
    searchParams,
  });
}

export default async function ReactTableSelectionLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "selection",
    titleKo: "체크박스 선택",
    titleEn: "Checkbox Selection",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 체크박스 기반 행 선택 패턴을 정확히 연결할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to wire checkbox-based row selection correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-selection",
    searchParams,
  });
}
