import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";
import { createLlmPageMetadata } from "../metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  return createLlmPageMetadata({
    titleKo: "@mycrm-ui/react-table LLM Guide - 확장 행",
    titleEn: "@mycrm-ui/react-table LLM Guide - Expandable Rows",
    descriptionKo: "@mycrm-ui/react-table 확장 행 파트의 LLM 가이드입니다.",
    descriptionEn: "@mycrm-ui/react-table LLM guide for the expandable rows section.",
    pathname: "/document/react-table/llm/expand",
    searchParams,
  });
}

export default async function ReactTableExpandLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "expand",
    titleKo: "확장 행",
    titleEn: "Expandable Rows",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 계층형 확장 구조와 자식 행 제어를 정확히 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to configure hierarchical expansion structures and child-row controls correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-expand",
    searchParams,
  });
}
