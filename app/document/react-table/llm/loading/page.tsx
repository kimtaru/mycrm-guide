import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 로딩 / 빈 상태",
  description: "@mycrm-ui/react-table 로딩 / 빈 상태 파트의 LLM 가이드입니다.",
};

export default async function ReactTableLoadingLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "loading",
    titleKo: "로딩 / 빈 상태",
    titleEn: "Loading / Empty State",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 스켈레톤 로딩과 빈 상태 표시를 구분해서 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to distinguish and configure skeleton loading and empty-state rendering in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-loading",
    searchParams,
  });
}
