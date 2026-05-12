import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";
import { createLlmPageMetadata } from "../metadata";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  return createLlmPageMetadata({
    titleKo: "@mycrm-ui/react-table LLM Guide - 행 순서 변경",
    titleEn: "@mycrm-ui/react-table LLM Guide - Row Reorder",
    descriptionKo: "@mycrm-ui/react-table 행 순서 변경 파트의 LLM 가이드입니다.",
    descriptionEn: "@mycrm-ui/react-table LLM guide for the row reorder section.",
    pathname: "/document/react-table/llm/row-reorder",
    searchParams,
  });
}

export default async function ReactTableRowReorderLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "row-reorder",
    titleKo: "행 순서 변경",
    titleEn: "Row Reorder",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 드래그앤드롭 행 순서 변경 상태와 핸들 컬럼을 정확히 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to configure drag-and-drop row reordering state and handle columns correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-row-reorder",
    searchParams,
  });
}
