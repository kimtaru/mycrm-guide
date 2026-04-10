import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 가상 스크롤",
  description: "@mycrm-ui/react-table 가상 스크롤 파트의 LLM 가이드입니다.",
};

export default async function ReactTableVirtualScrollLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "virtual-scroll",
    titleKo: "가상 스크롤",
    titleEn: "Virtual Scroll",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 가상 스크롤과 무한 로딩 조건을 빠짐없이 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to configure virtual scrolling and infinite-loading requirements correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-virtual-scroll",
    searchParams,
  });
}
