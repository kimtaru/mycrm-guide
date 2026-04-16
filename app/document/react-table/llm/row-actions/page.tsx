import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";
import { createLlmPageMetadata } from "../metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  return createLlmPageMetadata({
    titleKo: "@mycrm-ui/react-table LLM Guide - 행 삭제 / 추가",
    titleEn: "@mycrm-ui/react-table LLM Guide - Row Delete / Add",
    descriptionKo: "@mycrm-ui/react-table 행 삭제 / 추가 파트의 LLM 가이드입니다.",
    descriptionEn: "@mycrm-ui/react-table LLM guide for the row delete and add section.",
    pathname: "/document/react-table/llm/row-actions",
    searchParams,
  });
}

export default async function ReactTableRowActionsLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "row-actions",
    titleKo: "행 삭제 / 추가",
    titleEn: "Row Delete / Add",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 삭제 액션과 추가 입력 행 패턴을 정확히 연결할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to wire row deletion actions and add-row input patterns correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-row-actions",
    searchParams,
  });
}
