import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 필터",
  description: "@mycrm-ui/react-table 필터 파트의 LLM 가이드입니다.",
};

export default async function ReactTableFilterLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "filter",
    titleKo: "필터",
    titleEn: "Filtering",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 컬럼 단위 필터 패턴을 정확히 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to configure column-level filtering patterns correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-filter",
    searchParams,
  });
}
