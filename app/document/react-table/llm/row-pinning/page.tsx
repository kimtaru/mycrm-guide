import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";
import { createLlmPageMetadata } from "../metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  return createLlmPageMetadata({
    titleKo: "@mycrm-ui/react-table LLM Guide - 행 상단 고정",
    titleEn: "@mycrm-ui/react-table LLM Guide - Row Pinning",
    descriptionKo: "@mycrm-ui/react-table 행 상단 고정 파트의 LLM 가이드입니다.",
    descriptionEn: "@mycrm-ui/react-table LLM guide for the row pinning section.",
    pathname: "/document/react-table/llm/row-pinning",
    searchParams,
  });
}

export default async function ReactTableRowPinningLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "row-pinning",
    titleKo: "행 상단 고정",
    titleEn: "Row Pinning",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 flat table 행 상단고정 상태와 우클릭 메뉴 연동을 정확히 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to configure flat-table row pinning state and right-click menu wiring correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-row-pinning",
    searchParams,
  });
}
