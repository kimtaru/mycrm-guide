import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 확장 행",
  description: "@mycrm-ui/react-table 확장 행 파트의 LLM 가이드입니다.",
};

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
