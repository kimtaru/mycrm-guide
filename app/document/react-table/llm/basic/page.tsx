import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 기본 사용",
  description: "@mycrm-ui/react-table 기본 사용 파트의 LLM 가이드입니다.",
};

export default async function ReactTableBasicLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "basic",
    titleKo: "기본 사용",
    titleEn: "Basic Usage",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 최소 구성 패턴을 그대로 읽고 사용할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to read and apply the minimum setup pattern of `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-basic",
    searchParams,
  });
}
