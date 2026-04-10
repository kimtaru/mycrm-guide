import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 행 삭제 / 추가",
  description: "@mycrm-ui/react-table 행 삭제 / 추가 파트의 LLM 가이드입니다.",
};

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
