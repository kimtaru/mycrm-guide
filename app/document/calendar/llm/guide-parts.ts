export interface CalendarLlmGuidePart {
  partSlug:
    | "basic"
    | "range"
    | "multiple"
    | "pending-api"
    | "date-picker"
    | "date-picker-advanced"
    | "support-notes"
    | "css-classnames";
  titleKo: string;
  hintKo: string;
  sectionHref: string;
}

export const CALENDAR_LLM_GUIDE_PARTS: readonly CalendarLlmGuidePart[] = [
  {
    partSlug: "basic",
    titleKo: "Calendar 기본 사용",
    hintKo: "월간 달력 grid, 단일 날짜 선택, marker dot, 날짜 포맷을 구현할 때 읽는다.",
    sectionHref: "/document/calendar#calendar-basic",
  },
  {
    partSlug: "range",
    titleKo: "Calendar Range 선택",
    hintKo: "시작일/종료일 선택, draft 상태, hover preview 범위를 구현할 때 읽는다.",
    sectionHref: "/document/calendar#calendar-range",
  },
  {
    partSlug: "multiple",
    titleKo: "Calendar Multiple 선택",
    hintKo: "여러 날짜 선택, 선택 토글, 최대 선택 개수 제한이 필요할 때 읽는다.",
    sectionHref: "/document/calendar#calendar-multiple",
  },
  {
    partSlug: "pending-api",
    titleKo: "Calendar Pending / API 연동",
    hintKo: "월 변경 후 API 응답으로 비활성 날짜나 marker를 갱신해야 할 때 읽는다.",
    sectionHref: "/document/calendar#calendar-pending",
  },
  {
    partSlug: "date-picker",
    titleKo: "DatePicker",
    hintKo: "Calendar를 trigger/popover/form input 형태로 제품 화면에 붙일 때 읽는다.",
    sectionHref: "/document/calendar#date-picker",
  },
  {
    partSlug: "date-picker-advanced",
    titleKo: "DatePicker 고급 옵션",
    hintKo: "DatePicker의 API 연동, 연도/월 선택, theme, marker, disabled 규칙을 조합할 때 읽는다.",
    sectionHref: "/document/calendar#date-picker-advanced",
  },
  {
    partSlug: "support-notes",
    titleKo: "Calendar 추가 지원 기능",
    hintKo: "입력 포맷, 접근성, 키보드, focus 격리, 테스트 attribute를 확인할 때 읽는다.",
    sectionHref: "/document/calendar#calendar-support-notes",
  },
  {
    partSlug: "css-classnames",
    titleKo: "Calendar CSS 커스터마이징",
    hintKo: "CalendarClassNames, DatePickerClassNames, calendarClassNames 슬롯을 적용할 때 읽는다.",
    sectionHref: "/document/calendar#calendar-classnames",
  },
] as const;

export function getCalendarLlmGuidePart(partSlug: string) {
  return CALENDAR_LLM_GUIDE_PARTS.find((part) => part.partSlug === partSlug);
}

export function getCalendarLlmGuideMarkdownFileName(partSlug: string) {
  return `${partSlug}-llm-guide.md`;
}
