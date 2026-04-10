import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 컬럼 관리",
  description: "@mycrm-ui/react-table 컬럼 관리 파트의 LLM 가이드입니다.",
};

export default async function ReactTableColumnManagerLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "column-manager",
    titleKo: "컬럼 관리",
    titleEn: "Column Manager",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 컬럼 숨김, 순서 변경, 고정, 리사이즈 상태를 분리해서 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to configure column visibility, ordering, pinning, and resizing states separately in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-column-manager",
    searchParams,
  });
}
