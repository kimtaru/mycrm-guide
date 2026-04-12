export interface ReactTableLlmGuidePart {
  partSlug:
    | "basic"
    | "sorting"
    | "selection"
    | "filter"
    | "row-actions"
    | "editing"
    | "loading"
    | "virtual-scroll"
    | "column-manager"
    | "expand"
    | "row-events"
    | "tooltip-copy"
    | "header-menu"
    | "css-classnames"
    | "column-def";
  titleKo: string;
  titleEn: string;
  hintKo: string;
  hintEn: string;
  sectionHref: string;
}

export const REACT_TABLE_LLM_GUIDE_PARTS: readonly ReactTableLlmGuidePart[] = [
  {
    partSlug: "basic",
    titleKo: "기본 사용",
    titleEn: "Basic Usage",
    hintKo: "columns, data, rowKey만으로 기본 테이블을 만들 때 읽는다.",
    hintEn: "Read this when building a basic table with only columns, data, and rowKey.",
    sectionHref: "/document/react-table#react-table-basic",
  },
  {
    partSlug: "sorting",
    titleKo: "정렬",
    titleEn: "Sorting",
    hintKo: "단일 정렬이나 멀티 정렬이 필요할 때 읽는다.",
    hintEn: "Read this when single-column or multi-column sorting is required.",
    sectionHref: "/document/react-table#react-table-sorting",
  },
  {
    partSlug: "selection",
    titleKo: "체크박스 선택",
    titleEn: "Selection",
    hintKo: "행 선택, 일괄 선택, 선택 상태 관리가 필요할 때 읽는다.",
    hintEn: "Read this when row selection, bulk selection, or selected key state is needed.",
    sectionHref: "/document/react-table#react-table-selection",
  },
  {
    partSlug: "filter",
    titleKo: "필터",
    titleEn: "Filter",
    hintKo: "텍스트 검색이나 셀렉트 필터처럼 컬럼별 필터가 필요할 때 읽는다.",
    hintEn: "Read this when column-level text or select filters are needed.",
    sectionHref: "/document/react-table#react-table-filter",
  },
  {
    partSlug: "row-actions",
    titleKo: "행 삭제 / 추가",
    titleEn: "Row Actions",
    hintKo: "행 삭제 버튼이나 신규 행 입력 추가가 필요할 때 읽는다.",
    hintEn: "Read this when delete-row actions or add-row input flows are needed.",
    sectionHref: "/document/react-table#react-table-row-actions",
  },
  {
    partSlug: "editing",
    titleKo: "인라인 편집",
    titleEn: "Inline Editing",
    hintKo: "셀 단위 편집, 유효성 검사, 편집 UI 커스터마이징이 필요할 때 읽는다.",
    hintEn: "Read this when inline cell editing, validation, or edit UI customization is needed.",
    sectionHref: "/document/react-table#react-table-editing",
  },
  {
    partSlug: "loading",
    titleKo: "로딩 / 빈 상태",
    titleEn: "Loading / Empty State",
    hintKo: "로딩 표시와 빈 데이터 상태를 구분해서 처리해야 할 때 읽는다.",
    hintEn: "Read this when loading and empty states must be handled separately.",
    sectionHref: "/document/react-table#react-table-loading",
  },
  {
    partSlug: "virtual-scroll",
    titleKo: "가상 스크롤",
    titleEn: "Virtual Scroll",
    hintKo: "대용량 데이터, 고정 높이 행, 무한 스크롤이 필요할 때 읽는다.",
    hintEn: "Read this when large datasets, fixed row height, or infinite loading are required.",
    sectionHref: "/document/react-table#react-table-virtual-scroll",
  },
  {
    partSlug: "column-manager",
    titleKo: "컬럼 관리",
    titleEn: "Column Manager",
    hintKo: "컬럼 숨김, 순서 변경, 고정, 너비 변경이 필요할 때 읽는다.",
    hintEn: "Read this when columns need hiding, reordering, pinning, or width control.",
    sectionHref: "/document/react-table#react-table-column-manager",
  },
  {
    partSlug: "expand",
    titleKo: "확장 행",
    titleEn: "Expandable Rows",
    hintKo: "부모-자식 구조의 확장형 행이나 중첩 테이블이 필요할 때 읽는다.",
    hintEn: "Read this when expandable parent-child rows or nested row structures are needed.",
    sectionHref: "/document/react-table#react-table-expand",
  },
  {
    partSlug: "row-events",
    titleKo: "행 클릭 / 키보드 내비게이션",
    titleEn: "Row Click / Keyboard Navigation",
    hintKo: "행 클릭, 더블클릭, 키보드 이동, 포커스 추적이 필요할 때 읽는다.",
    hintEn: "Read this when row click events, double click, keyboard navigation, or focus tracking is needed.",
    sectionHref: "/document/react-table#react-table-row-events",
  },
  {
    partSlug: "tooltip-copy",
    titleKo: "툴팁 / 복사",
    titleEn: "Tooltip / Copy",
    hintKo: "셀 툴팁, 우클릭 복사, 복사 가능 컬럼 제어가 필요할 때 읽는다.",
    hintEn: "Read this when cell tooltips, right-click copy, or copyable columns are needed.",
    sectionHref: "/document/react-table#react-table-tooltip-copy",
  },
  {
    partSlug: "header-menu",
    titleKo: "헤더 메뉴",
    titleEn: "Header Menu",
    hintKo: "헤더 우상단 메뉴 액션이나 컬럼 메뉴 확장이 필요할 때 읽는다.",
    hintEn: "Read this when header action menus or column-level menu extensions are needed.",
    sectionHref: "/document/react-table#react-table-header-menu",
  },
  {
    partSlug: "css-classnames",
    titleKo: "CSS 커스터마이징",
    titleEn: "CSS Customization",
    hintKo: "기능 변경 없이 classNames로 시각 스타일만 조정할 때 읽는다.",
    hintEn: "Read this when only visual styling should change through classNames.",
    sectionHref: "/document/react-table#react-table-classnames",
  },
  {
    partSlug: "column-def",
    titleKo: "ColumnDef 옵션",
    titleEn: "ColumnDef Options",
    hintKo: "어떤 컬럼 옵션을 켜야 할지 판단하거나 ColumnDef 구성을 정리할 때 읽는다.",
    hintEn: "Read this when deciding which ColumnDef options should be enabled for a column.",
    sectionHref: "/document/react-table#column-def",
  },
] as const;

export function getReactTableLlmGuidePart(partSlug: string) {
  return REACT_TABLE_LLM_GUIDE_PARTS.find((part) => part.partSlug === partSlug);
}

export function getReactTableLlmGuideMarkdownFileName(
  partSlug: string,
  lang: "ko" | "en",
) {
  return `${partSlug}-llm-guide${lang === "en" ? "-en" : ""}.md`;
}
