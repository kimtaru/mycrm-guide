import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 툴팁 / 복사",
  description: "@mycrm-ui/react-table 툴팁 / 복사 파트의 LLM 가이드입니다.",
};

export default async function ReactTableTooltipCopyLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "tooltip-copy",
    titleKo: "툴팁 / 복사",
    titleEn: "Tooltip / Copy",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 hover 툴팁과 우클릭 복사 메뉴를 분리해서 구성할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to separate hover-tooltips from right-click copy menus in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-tooltip-copy",
    searchParams,
  });
}
