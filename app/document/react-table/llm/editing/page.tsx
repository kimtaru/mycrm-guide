import type { Metadata } from "next";
import { renderReactTableLlmGuidePage } from "../guide-page";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 인라인 편집",
  description: "@mycrm-ui/react-table 인라인 편집 파트의 LLM 가이드입니다.",
};

export default async function ReactTableEditingLlmGuidePage({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string }>;
}) {
  return renderReactTableLlmGuidePage({
    partSlug: "editing",
    titleKo: "인라인 편집",
    titleEn: "Inline Editing",
    descriptionKo:
      "AI 에이전트가 `@mycrm-ui/react-table`의 셀 단위 편집 패턴과 검증 흐름을 정확히 연결할 수 있도록 정리한 Markdown 가이드입니다.",
    descriptionEn:
      "A Markdown guide for AI agents that need to wire cell-level editing patterns and validation flows correctly in `@mycrm-ui/react-table`.",
    sectionHref: "/document/react-table#react-table-editing",
    searchParams,
  });
}
