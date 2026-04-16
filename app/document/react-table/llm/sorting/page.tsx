import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";
import { createLlmPageMetadata } from "../metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  return createLlmPageMetadata({
    titleKo: "@mycrm-ui/react-table LLM Guide - 정렬",
    titleEn: "@mycrm-ui/react-table LLM Guide - Sorting",
    descriptionKo: "@mycrm-ui/react-table 정렬 파트의 LLM 가이드입니다.",
    descriptionEn: "@mycrm-ui/react-table LLM guide for the sorting section.",
    pathname: "/document/react-table/llm/sorting",
    searchParams,
  });
}

export default async function ReactTableSortingLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "sorting",
    titleKo: "정렬",
    titleEn: "Sorting",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 단일 정렬과 멀티 정렬 패턴을 구분해서 사용할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to distinguish and apply single-sort and multi-sort patterns in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-sorting",
    searchParams,
  });
}
