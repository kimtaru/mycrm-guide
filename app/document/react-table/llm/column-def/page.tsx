import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - ColumnDef 옵션",
  description: "@mycrm-ui/react-table ColumnDef 옵션 파트의 LLM 가이드입니다.",
};

export default async function ReactTableColumnDefLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "column-def",
    titleKo: "ColumnDef 옵션",
    titleEn: "ColumnDef Options",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 컬럼 옵션을 기능별 묶음으로 읽고 필요한 것만 선택할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to read `@mycrm-ui/react-table` column options as feature groups and choose only the ones they need.",
    sectionHref: "/document/react-table#column-def",
    searchParams,
  });
}
