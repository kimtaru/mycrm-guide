import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";
import { createLlmPageMetadata } from "../metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  return createLlmPageMetadata({
    titleKo: "@mycrm-ui/react-table LLM Guide - 헤더 메뉴",
    titleEn: "@mycrm-ui/react-table LLM Guide - Header Menu",
    descriptionKo: "@mycrm-ui/react-table 헤더 메뉴 파트의 LLM 가이드입니다.",
    descriptionEn: "@mycrm-ui/react-table LLM guide for the header menu section.",
    pathname: "/document/react-table/llm/header-menu",
    searchParams,
  });
}

export default async function ReactTableHeaderMenuLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "header-menu",
    titleKo: "헤더 메뉴",
    titleEn: "Header Menu",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 테이블 전역 액션 메뉴를 정확히 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to configure table-level header menu actions correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-header-menu",
    searchParams,
  });
}
