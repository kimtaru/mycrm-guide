# @mycrm-ui/components Calendar CSS 커스터마이징 LLM 가이드

이 문서는 Calendar와 DatePicker의 시각 스타일을 프로젝트 CSS로 조정할 때 참고한다.

## 기본 원칙

- 기능을 바꾸지 않고 스타일만 바꿀 때 `classNames`를 사용한다.
- `Calendar`의 최외곽에는 `className`을 사용한다.
- `Calendar` 내부 날짜/요일/상태 슬롯에는 `classNames`를 사용한다.
- `DatePicker`의 trigger, clear 버튼, popover shell은 `classNames`를 사용한다.
- `DatePicker` 내부 Calendar 날짜 셀은 `calendarClassNames`를 사용한다.
- 외부 className이 있으면 주요 기본 inline style이 생략되는 슬롯이 있어 프로젝트 CSS가 우선 적용될 수 있다.

## Calendar 예시

```tsx
<Calendar
  year={2026}
  month={9}
  className="w-80 rounded-xl border border-slate-200 p-4"
  classNames={{
    weekdaySat: "text-blue-600",
    weekdaySun: "text-red-600",
    selectedDay: "bg-blue-600 text-white",
    rangeInsideDay: "bg-blue-100 text-blue-900",
    adjacentMonthDay: "text-slate-400 opacity-60",
    disabledDay: "text-slate-400 opacity-45",
    dayMarker: "ring-1 ring-white",
  }}
/>
```

## DatePicker 예시

```tsx
<DatePicker
  classNames={{
    root: "w-64",
    trigger: "w-full rounded-lg border px-3",
    triggerValue: "truncate whitespace-nowrap",
    clearButton: "rounded-lg border px-2.5",
    popover: "rounded-xl bg-white shadow-xl",
    monthPickerOptionActive: "bg-blue-600 text-white",
  }}
  calendarClassNames={{
    selectedDay: "bg-blue-600 text-white",
    rangeInsideDay: "bg-blue-100",
    disabledDay: "opacity-40 text-slate-400",
  }}
/>
```

## CalendarClassNames 슬롯

### 레이아웃

- `root`: Calendar 최외곽 div
- `grid`: 요일과 날짜를 포함하는 grid
- `weekday`: 요일 헤더 공통
- `weekdaySun`, `weekdayMon`, `weekdayTue`, `weekdayWed`, `weekdayThu`, `weekdayFri`, `weekdaySat`: 요일별 헤더

### 날짜 셀

- `day`: 날짜 cell wrapper
- `dayContent`: 날짜 숫자 주변 content
- `dayHover`: hover 가능한 날짜 content
- `daySun`, `dayMon`, `dayTue`, `dayWed`, `dayThu`, `dayFri`, `daySat`: 요일별 날짜
- `currentMonthDay`: 현재 월 날짜
- `adjacentMonthDay`: 이전/다음 월 날짜
- `disabledDay`: 비활성 날짜
- `todayDay`: 오늘 날짜

### 선택 / 범위

- `selectedDay`: single/multiple 선택 날짜
- `rangeStartDay`: range 시작 날짜
- `rangeEndDay`: range 종료 날짜
- `rangeInsideDay`: range 내부 날짜
- `rangePreviewDay`: range hover preview 날짜
- `rangeSingleDay`: 시작일과 종료일이 같은 range 날짜

### marker

- `dayMarker`: 날짜 하단 dot marker

## DatePickerClassNames 슬롯

### 필드 / 트리거

- `root`: DatePicker 최외곽 div
- `field`: trigger와 clear 버튼 wrapper
- `trigger`: input-like trigger button
- `triggerValue`: 선택값 텍스트. 긴 range 텍스트는 이 슬롯에서 말줄임 처리한다.
- `placeholder`: 미선택 placeholder 텍스트
- `icon`: trigger 오른쪽 calendar icon
- `clearButton`: 지우기 버튼

### Calendar popover

- `popover`: Calendar popover dialog
- `popoverHeader`: 이전/다음 버튼과 현재 월 영역
- `popoverTitle`: 현재 연도/월 텍스트
- `monthButton`: 이전/다음 월 버튼

### 연도/월 선택 popover

- `monthPickerWrap`: 연도/월 선택 wrapper
- `monthPickerToggle`: 연도/월 선택 버튼
- `monthPickerPopover`: 연도/월 리스트 popover
- `monthPickerSection`: 연도 또는 월 section
- `monthPickerSectionTitle`: section 제목
- `monthPickerOption`: 연도/월 option button
- `monthPickerOptionActive`: 선택된 연도/월 option

## 자주 하는 실수

- DatePicker의 날짜 cell 스타일을 `classNames`에 넣으면 적용되지 않는다. 내장 Calendar에는 `calendarClassNames`를 써야 한다.
- range 텍스트 줄바꿈을 막으려면 `triggerValue`에 `truncate`, `white-space: nowrap`, `text-overflow: ellipsis` 계열 스타일을 준다.
- adjacent 날짜의 취소선은 기본 요구사항이 아니다. 회색 계열 표현만 원하면 `adjacentMonthDay`에서 색상과 투명도만 지정한다.
- marker dot 색상은 `markedDates[].color`가 우선이다. 공통 크기나 테두리는 `dayMarker`로 조정한다.

## LLM 구현 체크리스트

- Calendar 단독: `className` + `classNames`
- DatePicker shell: `classNames`
- DatePicker 내부 Calendar: `calendarClassNames`
- 선택 상태: `selectedDay`
- range 상태: `rangeStartDay`, `rangeEndDay`, `rangeInsideDay`, `rangePreviewDay`, `rangeSingleDay`
- 인접 월 날짜: `adjacentMonthDay`
- 비활성 날짜: `disabledDay`
