import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderReactTableLlmGuideMarkdownPage } from "../../guide-md-page";

const GUIDE_PARTS = {
  basic: {
    titleKo: "기본 사용",
    titleEn: "Basic Usage",
    sectionHref: "/document/react-table#react-table-basic",
  },
  sorting: {
    titleKo: "정렬",
    titleEn: "Sorting",
    sectionHref: "/document/react-table#react-table-sorting",
  },
  selection: {
    titleKo: "체크박스 선택",
    titleEn: "Selection",
    sectionHref: "/document/react-table#react-table-selection",
  },
  filter: {
    titleKo: "필터",
    titleEn: "Filter",
    sectionHref: "/document/react-table#react-table-filter",
  },
  "row-actions": {
    titleKo: "행 삭제 / 추가",
    titleEn: "Row Actions",
    sectionHref: "/document/react-table#react-table-row-actions",
  },
  editing: {
    titleKo: "인라인 편집",
    titleEn: "Inline Editing",
    sectionHref: "/document/react-table#react-table-editing",
  },
  loading: {
    titleKo: "로딩 / 빈 상태",
    titleEn: "Loading / Empty State",
    sectionHref: "/document/react-table#react-table-loading",
  },
  "virtual-scroll": {
    titleKo: "가상 스크롤",
    titleEn: "Virtual Scroll",
    sectionHref: "/document/react-table#react-table-virtual-scroll",
  },
  "column-manager": {
    titleKo: "컬럼 관리",
    titleEn: "Column Manager",
    sectionHref: "/document/react-table#react-table-column-manager",
  },
  expand: {
    titleKo: "확장 행",
    titleEn: "Expandable Rows",
    sectionHref: "/document/react-table#react-table-expand",
  },
  "row-events": {
    titleKo: "행 클릭 / 키보드 내비게이션",
    titleEn: "Row Click / Keyboard Navigation",
    sectionHref: "/document/react-table#react-table-row-events",
  },
  "tooltip-copy": {
    titleKo: "툴팁 / 복사",
    titleEn: "Tooltip / Copy",
    sectionHref: "/document/react-table#react-table-tooltip-copy",
  },
  "header-menu": {
    titleKo: "헤더 메뉴",
    titleEn: "Header Menu",
    sectionHref: "/document/react-table#react-table-header-menu",
  },
  "css-classnames": {
    titleKo: "CSS 커스터마이징",
    titleEn: "CSS Customization",
    sectionHref: "/document/react-table#react-table-classnames",
  },
  "column-def": {
    titleKo: "ColumnDef 옵션",
    titleEn: "ColumnDef Options",
    sectionHref: "/document/react-table#column-def",
  },
} as const;

type GuidePartSlug = keyof typeof GUIDE_PARTS;

function isGuidePartSlug(value: string): value is GuidePartSlug {
  return value in GUIDE_PARTS;
}

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide Markdown",
  description: "@mycrm-ui/react-table LLM Guide Markdown source page.",
};

export default async function ReactTableLlmGuideMarkdownEntryPage({
  params,
  searchParams,
}: {
  params: Promise<{ part: string }>;
  searchParams?: Promise<{ lang?: string }>;
}) {
  const { part } = await params;

  if (!isGuidePartSlug(part)) {
    notFound();
  }

  const guidePart = GUIDE_PARTS[part];

  return renderReactTableLlmGuideMarkdownPage({
    partSlug: part,
    titleKo: guidePart.titleKo,
    titleEn: guidePart.titleEn,
    sectionHref: guidePart.sectionHref,
    searchParams,
  });
}
