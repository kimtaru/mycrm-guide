import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - CSS 커스터마이징",
  description: "@mycrm-ui/react-table CSS 커스터마이징 파트의 LLM 가이드입니다.",
};

export default async function ReactTableCssClassnamesLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "css-classnames",
    titleKo: "CSS 커스터마이징",
    titleEn: "CSS Customization",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 classNames 슬롯을 기능 변경 없이 시각 커스터마이징에만 정확히 사용할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to use `@mycrm-ui/react-table` classNames slots strictly for visual customization without changing behavior.",
    sectionHref: "/document/react-table#react-table-classnames",
    searchParams,
  });
}
