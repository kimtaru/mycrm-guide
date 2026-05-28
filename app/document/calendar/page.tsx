import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";
import type { ReactNode } from "react";
import { codeToHtml } from "shiki";
import { createPageMetadata } from "../../lib/metadata";
import TocAside from "../toc-aside";
import type { TocGroup } from "../toc-aside";
import {
  BasicCalendarDemo,
  DatePickerAdvancedDemo,
  DatePickerDemo,
  MultipleCalendarDemo,
  PendingCalendarDemo,
  RangeCalendarDemo,
} from "./calendar-demos";

const BASIC_CALENDAR_CODE = `import { useState } from 'react'
import { Calendar } from '@mycrm-ui/components'
import type { CalendarDateSelectValue, CalendarMarkedDate } from '@mycrm-ui/components'

const markedDates: CalendarMarkedDate[] = [
  { date: '2026-09-10', color: '#2563eb', meta: '상담 예약' },
  { date: '2026-09-20', color: '#dc2626', meta: '창립5주년행사' },
  { date: '2026-09-20', color: '#16a34a', meta: 'VIP 미팅' },
  '2026-09-25',
]

export default function BasicCalendarExample() {
  const [selectedDate, setSelectedDate] =
    useState<CalendarDateSelectValue | null>('2026-09-10')
  const [selectedMarkers, setSelectedMarkers] = useState([])

  return (
    <Calendar
      year={2026}
      month={9}
      selectedDate={selectedDate}
      weekdayLabelType="ko"
      weekStartsOn={1}
      selectableStartDate="2026-09-01"
      selectableEndDate="2026-09-30"
      markedDates={markedDates}
      dateSelectValueType="yyyy-MM-dd"
      onDateSelect={(date, markers) => {
        setSelectedDate(date)
        setSelectedMarkers(markers)
      }}
    />
  )
}`;

const RANGE_CALENDAR_CODE = `import { useState } from 'react'
import { Calendar } from '@mycrm-ui/components'
import type {
  CalendarRangeDraftValue,
  CalendarRangeSelectValue,
} from '@mycrm-ui/components'

export default function RangeCalendarExample() {
  const [draft, setDraft] = useState<CalendarRangeDraftValue>({
    startDate: '2026-09-10',
    endDate: null,
  })
  const [selectedRange, setSelectedRange] =
    useState<CalendarRangeSelectValue | null>(null)

  return (
    <Calendar
      year={2026}
      month={9}
      selectionMode="range"
      rangeStart={draft.startDate}
      rangeEnd={draft.endDate}
      weekdayLabelType="ko"
      selectableStartDate="2026-09-01"
      selectableEndDate="2026-09-30"
      dateSelectValueType="yyyy-MM-dd"
      onRangeDraftChange={(value) => {
        setDraft(value)
        if (value.endDate === null) {
          setSelectedRange(null)
        }
      }}
      onRangeSelect={setSelectedRange}
    />
  )
}`;

const MULTIPLE_CALENDAR_CODE = `import { useState } from 'react'
import { Calendar } from '@mycrm-ui/components'
import type { CalendarDateSelectValue } from '@mycrm-ui/components'

export default function MultipleCalendarExample() {
  const [selectedDates, setSelectedDates] =
    useState<CalendarDateSelectValue[]>(['2026-09-10', '2026-09-20'])

  return (
    <Calendar
      year={2026}
      month={9}
      selectionMode="multiple"
      selectedDates={selectedDates}
      maxSelectedDates={3}
      weekdayLabelType="ko"
      dateSelectValueType="yyyy-MM-dd"
      onDateSelect={(date) => {
        setSelectedDates((current) =>
          current.includes(date)
            ? current.filter((item) => item !== date)
            : [...current, date],
        )
      }}
    />
  )
}`;

const PENDING_CALENDAR_CODE = `import { useEffect, useState } from 'react'
import { Calendar } from '@mycrm-ui/components'
import type { CalendarMonthChangeValue } from '@mycrm-ui/components'

function formatDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return \`\${year}-\${month}-\${day}\`
}

export default function PendingCalendarExample() {
  const [month, setMonth] = useState<CalendarMonthChangeValue>({
    year: 2026,
    month: 9,
  })
  const [pending, setPending] = useState(true)
  const [disabledDates, setDisabledDates] = useState<string[]>([])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDisabledDates(
        month.month === 9 ? ['2026-09-09', '2026-09-16', '2026-09-23'] : [],
      )
      setPending(false)
    }, 900)

    return () => window.clearTimeout(timer)
  }, [month])

  const goMonth = (offset: number) => {
    const next = new Date(month.year, month.month - 1 + offset, 1)
    setPending(true)
    setMonth({ year: next.getFullYear(), month: next.getMonth() + 1 })
  }

  return (
    <>
      <button type="button" onClick={() => goMonth(-1)}>이전 달</button>
      <strong>{month.year}.{String(month.month).padStart(2, '0')}</strong>
      <button type="button" onClick={() => goMonth(1)}>다음 달</button>

      <Calendar
        year={month.year}
        month={month.month}
        pending={pending}
        weekdayLabelType="ko"
        isDateDisabled={(date) => disabledDates.includes(formatDateKey(date))}
      />
    </>
  )
}`;

const DATE_PICKER_CODE = `import { useState } from 'react'
import { DatePicker } from '@mycrm-ui/components'
import type {
  CalendarDateSelectValue,
  DatePickerMultipleValue,
  DatePickerRangeValue,
} from '@mycrm-ui/components'

export default function DatePickerExample() {
  const [single, setSingle] = useState<CalendarDateSelectValue | null>('2026-09-10')
  const [range, setRange] = useState<DatePickerRangeValue>({
    startDate: '2026-09-10',
    endDate: '2026-09-20',
  })
  const [multiple, setMultiple] = useState<DatePickerMultipleValue>({
    selectedDates: ['2026-09-10', '2026-09-20'],
  })

  return (
    <>
      <DatePicker
        value={single}
        onChange={(date) => setSingle(date)}
        placeholder="날짜 선택"
      />
      <DatePicker
        range
        rangeStart={range.startDate}
        rangeEnd={range.endDate}
        onRangeDraftChange={setRange}
        onRangeChange={setRange}
        placeholder="기간 선택"
      />
      <DatePicker
        multi
        selectedDates={multiple.selectedDates}
        maxSelectedDates={3}
        onMultipleChange={setMultiple}
        placeholder="여러 날짜 선택"
      />
    </>
  )
}`;

const DATE_PICKER_ADVANCED_CODE = `import { useEffect, useState } from 'react'
import { DatePicker } from '@mycrm-ui/components'
import type { CalendarDateSelectValue, CalendarMonthChangeValue } from '@mycrm-ui/components'

const markedDates = [
  { date: '2026-09-20', color: '#dc2626', meta: '창립5주년행사' },
  { date: '2026-09-20', color: '#16a34a', meta: 'VIP 미팅' },
]

function isSeptemberWednesday(date: Date) {
  return date.getFullYear() === 2026 && date.getMonth() === 8 && date.getDay() === 3
}

export default function AdvancedDatePickerExample() {
  const [value, setValue] = useState<CalendarDateSelectValue | null>('2026-09-01')
  const [events, setEvents] = useState<unknown[]>([])
  const [month, setMonth] = useState<CalendarMonthChangeValue>({ year: 2026, month: 9 })
  const [pending, setPending] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const timer = window.setTimeout(() => setPending(false), 700)
    return () => window.clearTimeout(timer)
  }, [month])

  return (
    <>
      <button type="button" onClick={() => setTheme('light')}>Light</button>
      <button type="button" onClick={() => setTheme('dark')}>Dark</button>

      <DatePicker
        value={value}
        onChange={(date, markers) => {
          setValue(date)
          setEvents(markers.map((marker) => marker.meta ?? marker.date))
        }}
        onMonthChange={(nextMonth) => {
          setPending(true)
          setMonth(nextMonth)
        }}
        pending={pending}
        theme={theme}
        weekdayLabelType="ko"
        previousMonthLabel="이전 달"
        nextMonthLabel="다음 달"
        clearLabel="지우기"
        placeholder="행사일 선택"
        selectableStartDate="2026-09-01"
        selectableEndDate="2026-09-30"
        markedDates={markedDates}
        isDateDisabled={isSeptemberWednesday}
        getDayClassName={(date) =>
          date.getFullYear() === 2026 && date.getMonth() === 8 && date.getDate() === 20
            ? 'font-extrabold'
            : undefined
        }
      />
      <pre>{JSON.stringify({ value, events, month, pending, theme }, null, 2)}</pre>
    </>
  )
}`;

async function highlight(code: string) {
  return codeToHtml(code, { lang: "tsx", theme: "one-dark-pro" });
}

export const metadata: Metadata = createPageMetadata({
  title: "@mycrm-ui/components Calendar - mycrm UI",
  description:
    "@mycrm-ui/components의 Calendar와 DatePicker 문서입니다. 단일 날짜, 기간, 다중 선택, 마커, 비활성 날짜, pending, 팝오버 DatePicker 사용 예제를 제공합니다.",
  pathname: "/document/calendar",
});

const TOC_GROUPS: TocGroup[] = [
  {
    title: "@mycrm-ui/components",
    items: [
      { id: "calendar-basic", label: "Calendar 기본 사용" },
      { id: "calendar-range", label: "Range 선택" },
      { id: "calendar-multiple", label: "Multiple 선택" },
      { id: "calendar-pending", label: "Pending / API 연동" },
      { id: "date-picker", label: "DatePicker" },
      { id: "date-picker-advanced", label: "DatePicker 고급 옵션" },
      { id: "calendar-api", label: "Calendar API" },
      { id: "date-picker-api", label: "DatePicker API" },
      { id: "calendar-support-notes", label: "추가 지원 기능" },
      { id: "calendar-classnames", label: "CSS 커스터마이징" },
    ],
  },
];

const calendarApiRows: Array<[string, string, string]> = [
  ["year / month", "number", "렌더링할 연도와 월입니다. 둘 다 필수이며 month는 1~12 값입니다."],
  ["selectionMode", "'single' | 'range' | 'multiple'", "선택 모드를 전환합니다. 기본값은 single입니다."],
  ["selectedDate", "Date | string | null", "single 모드의 controlled 선택값입니다. 생략하면 Calendar 내부 상태로 선택값을 관리합니다."],
  ["selectedDates", "(Date | string)[]", "multiple 모드의 controlled 선택 목록입니다. 생략하면 내부 상태로 선택 목록을 관리합니다."],
  ["rangeStart / rangeEnd", "Date | string | null", "range 모드의 controlled 시작일과 종료일입니다. 생략하면 내부 상태로 범위를 관리합니다."],
  ["onDateSelect", "(date, markers) => void", "single/multiple 모드에서 날짜 선택 시 호출됩니다. date는 dateSelectValueType 포맷이며 해당 날짜 marker 목록을 함께 받습니다."],
  ["onRangeDraftChange", "(range) => void", "range 모드에서 시작일 선택 또는 범위 확정 전/후 상태가 바뀔 때 호출됩니다."],
  ["onRangeSelect", "(range) => void", "range 모드에서 시작일과 종료일이 모두 확정되면 호출됩니다. 시작/종료 순서는 자동 정규화됩니다."],
  ["dateSelectValueType", "'date' | 'yyyyMMdd' | 'yyyy-MM-dd' | 'yyyy.MM.dd'", "선택 콜백으로 반환할 날짜 타입/문자열 포맷입니다. Calendar 기본값은 date입니다."],
  ["selectableStartDate / selectableEndDate", "Date | string | null", "선택 가능한 날짜 범위를 제한합니다. 현재 월이 아닌 날짜는 선택 대상에서 제외됩니다."],
  ["isDateDisabled", "(date: Date) => boolean", "특정 날짜를 비활성화합니다. 현재 range 모드에서는 이 함수보다 선택 가능 기간 제한을 중심으로 동작합니다."],
  ["markedDates", "(Date | string | { date, color?, meta? })[]", "날짜 하단 dot marker를 렌더링합니다. 같은 날짜에 여러 marker를 넣을 수 있고 선택 콜백에서 markers로 반환됩니다."],
  ["maxSelectedDates", "number", "multiple 모드에서 선택 가능한 최대 개수입니다. 0 이하나 정수가 아니면 제한하지 않습니다."],
  ["pending", "boolean", "달력 위에 dimmed overlay와 원형 spinner를 표시하고 날짜 상호작용을 막습니다. 기본값은 false입니다."],
  ["weekStartsOn", "0 | 1", "0은 일요일 시작, 1은 월요일 시작입니다. 기본값은 0입니다."],
  ["weekdayLabelType", "'en' | 'ko'", "기본 요일 라벨 언어입니다. 기본값은 en입니다."],
  ["weekdayLabels / weekdayLabelsJson", "readonly string[] / { sun, mon, ... }", "요일 라벨을 직접 주입합니다. weekdayLabels가 있으면 배열 순서가 우선 적용됩니다."],
  ["showAdjacentMonthDays", "boolean", "이전/다음 달 날짜 표시 여부입니다. 기본값은 true이며 adjacent 날짜는 선택할 수 없습니다."],
  ["showToday", "boolean", "오늘 날짜 강조 표시 여부입니다. 기본값은 true입니다."],
  ["showHover", "boolean", "hover 스타일과 range preview hover 추적 여부입니다. 기본값은 true입니다."],
  ["hoveredDate / onHoverDateChange", "Date | string | null / (date: Date | null) => void", "hover 날짜를 외부에서 제어하거나 추적합니다."],
  ["getDayClassName", "(date, cell) => string | undefined", "CalendarCell 상태를 보고 특정 날짜 cell에 className을 추가합니다."],
  ["className / classNames", "string / CalendarClassNames", "root className과 grid, weekday, day, selectedDay, rangeInsideDay 등 내부 슬롯 className입니다."],
];

const datePickerApiRows: Array<[string, string, string]> = [
  ["selectionMode / range / multi", "'single' | 'range' | 'multiple' / boolean", "선택 모드입니다. range 또는 multi boolean shorthand를 사용할 수 있습니다. range가 multi보다 우선합니다."],
  ["value / defaultValue", "Date | string | null", "single 모드의 controlled 값과 uncontrolled 초기값입니다."],
  ["onChange", "(date, markers) => void", "single/multiple 모드에서 선택 날짜와 marker 목록을 받습니다. clear 시 date는 null입니다."],
  ["rangeStart / rangeEnd", "Date | string | null", "range 모드의 controlled 시작일/종료일입니다."],
  ["defaultRangeStart / defaultRangeEnd", "Date | string | null", "range 모드의 uncontrolled 초기 시작일/종료일입니다."],
  ["onRangeDraftChange / onRangeChange", "(range) => void", "기간 선택 중간 상태와 확정 상태를 받습니다. clear 시 둘 다 null로 호출됩니다."],
  ["selectedDates / defaultSelectedDates", "(Date | string)[]", "multiple 모드의 controlled 선택 목록과 uncontrolled 초기값입니다."],
  ["maxSelectedDates", "number", "multiple 모드에서 선택 가능한 최대 개수입니다."],
  ["onMultipleChange", "({ selectedDates }) => void", "multiple DatePicker의 전체 선택 목록을 받습니다. clear 시 빈 배열로 호출됩니다."],
  ["name", "string", "form submit용 hidden input을 렌더링합니다. range는 nameStart/nameEnd, multiple은 쉼표로 연결한 값을 생성합니다."],
  ["placeholder", "string", "선택값이 없을 때 trigger에 표시할 문구입니다. 기본값은 Select date입니다."],
  ["clearable / clearLabel", "boolean / string", "지우기 버튼 표시 여부와 라벨입니다. 기본값은 true / Clear입니다."],
  ["disabled / readOnly / required", "boolean", "trigger, hidden input, 상호작용 제어에 사용합니다."],
  ["closeOnSelect", "boolean", "선택 후 popover를 닫을지 제어합니다. 기본값은 single/range true, multiple false입니다."],
  ["theme", "'light' | 'dark'", "DatePicker 내장 trigger, popover, 연도/월 선택 popover의 기본 테마입니다. 기본값은 light입니다."],
  ["dateSelectValueType", "'date' | 'yyyyMMdd' | 'yyyy-MM-dd' | 'yyyy.MM.dd'", "선택 콜백과 내부 표시값에 사용할 날짜 포맷입니다. DatePicker 기본값은 yyyy-MM-dd입니다."],
  ["className / classNames", "string / DatePickerClassNames", "root className과 field, trigger, clearButton, popover, monthPickerOption 등 DatePicker 슬롯 className입니다."],
  ["calendarClassNames", "CalendarClassNames", "내장 Calendar 슬롯 스타일입니다."],
  ["popoverLabel", "string", "Calendar popover dialog의 aria-label입니다. 기본값은 Choose date입니다."],
  ["previousMonthLabel / nextMonthLabel", "string", "popover 내부 이전/다음 달 버튼 문구입니다."],
  ["yearSelectLabel / monthSelectLabel", "string", "연도/월 선택 popover의 섹션 라벨입니다. 없으면 weekdayLabelType에 따라 Year/Month 또는 연도/월을 사용합니다."],
  ["onMonthChange", "({ year, month }) => void", "popover 내부 월 변경 또는 연도/월 직접 선택 시 호출됩니다. API로 비활성 날짜나 marker를 다시 가져올 때 사용합니다."],
  ["pending", "boolean", "내장 Calendar에 pending overlay/spinner를 표시합니다. 기본값은 false입니다."],
  ["weekStartsOn", "0 | 1", "내장 Calendar의 주 시작 요일입니다. 기본값은 0입니다."],
  ["weekdayLabelType", "'en' | 'ko'", "내장 Calendar의 기본 요일 라벨 언어입니다. 기본값은 en입니다."],
  ["weekdayLabels / weekdayLabelsJson", "readonly string[] / { sun, mon, ... }", "내장 Calendar의 요일 라벨을 직접 주입합니다."],
  ["showAdjacentMonthDays / showToday / showHover", "boolean", "내장 Calendar의 adjacent 날짜, 오늘 강조, hover/range preview 표시 여부입니다."],
  ["selectableStartDate / selectableEndDate", "Date | string | null", "내장 Calendar의 선택 가능 날짜 범위를 제한합니다."],
  ["markedDates", "(Date | string | { date, color?, meta? })[]", "내장 Calendar에 marker dot을 표시하고 선택 콜백에서 markers로 반환합니다."],
  ["isDateDisabled", "(date: Date) => boolean", "내장 Calendar에서 특정 날짜를 비활성화합니다. range 모드에서는 선택 가능 기간 제한을 중심으로 동작합니다."],
  ["getDayClassName", "(date, cell) => string | undefined", "내장 Calendar의 특정 날짜 cell에 className을 추가합니다."],
];

type ClassNameSlotRow = [string, string, string, string, string];

const calendarClassNameRows: Array<{ label: string; rows: ClassNameSlotRow[] }> = [
  {
    label: "기본 레이아웃",
    rows: [
      ["root", "Calendar 최외곽 div", "달력 전체 크기, 테두리, 배경", "width: 320px; padding: 16px; border: 1px solid #e5e7eb", "w-80 rounded-xl border p-4"],
      ["grid", "요일/날짜 grid", "grid 간격, 폰트 크기", "gap: 8px; font-size: 14px", "gap-2 text-sm"],
      ["weekday", "요일 헤더 공통", "요일 라벨 높이, 정렬, 글꼴", "height: 30px; font-weight: 600", "h-8 font-semibold"],
      ["weekdaySun / weekdaySat", "일/토 요일 헤더", "주말 색상", "color: #dc2626 / #2563eb", "text-red-600 / text-blue-600"],
      ["weekdayMon~weekdayFri", "월~금 요일 헤더", "특정 요일 색상", "color: #374151", "text-slate-700"],
    ],
  },
  {
    label: "날짜 셀",
    rows: [
      ["day", "날짜 cell wrapper", "셀 높이, 정렬, 상태별 wrapper 스타일", "min-height: 40px; display: grid; place-items: center", "min-h-10 place-items-center"],
      ["dayContent", "날짜 숫자 주변 content", "선택/범위 배경이 적용되는 영역", "width: 36px; height: 36px; border-radius: 9999px", "h-9 w-9 rounded-full"],
      ["dayHover", "hover 가능한 날짜 내부", "hover 시 배경/색상", "background: #eff6ff; color: #2563eb", "bg-blue-50 text-blue-600"],
      ["daySun / daySat", "일/토 날짜", "주말 날짜 색상", "color: #dc2626 / #2563eb", "text-red-600 / text-blue-600"],
      ["dayMon~dayFri", "월~금 날짜", "특정 요일 날짜 색상", "color: #111827", "text-slate-900"],
      ["currentMonthDay", "현재 월 날짜 cell", "현재 월 날짜 강조", "color: #111827", "text-slate-900"],
      ["adjacentMonthDay", "이전/다음 월 날짜 cell", "인접 월 날짜 흐림 처리", "color: #9ca3af; opacity: .6", "text-slate-400 opacity-60"],
      ["disabledDay", "비활성 날짜 내부", "비활성 날짜 흐림 처리", "color: #9ca3af; opacity: .45", "text-slate-400 opacity-45"],
      ["todayDay", "오늘 날짜 내부", "오늘 강조", "font-weight: 800; text-decoration: underline", "font-extrabold underline underline-offset-4"],
    ],
  },
  {
    label: "선택 / 범위",
    rows: [
      ["selectedDay", "single/multiple 선택 날짜 content", "선택 날짜 배경", "background: #2563eb; color: #fff", "bg-blue-600 text-white"],
      ["rangeStartDay", "range 시작 날짜 content", "기간 시작일", "background: #2563eb; color: #fff", "bg-blue-600 text-white"],
      ["rangeEndDay", "range 종료 날짜 content", "기간 종료일", "background: #2563eb; color: #fff", "bg-blue-600 text-white"],
      ["rangeInsideDay", "range 내부 날짜 content", "기간 내부 배경", "background: #dbeafe; color: #1e3a8a", "bg-blue-100 text-blue-900"],
      ["rangePreviewDay", "range hover preview content", "종료일 선택 전 미리보기", "background: #eff6ff; color: #2563eb", "bg-blue-50 text-blue-600"],
      ["rangeSingleDay", "시작/종료가 같은 range content", "하루짜리 기간", "background: #2563eb; color: #fff", "bg-blue-600 text-white"],
    ],
  },
  {
    label: "마커 / 상태",
    rows: [
      ["dayMarker", "날짜 하단 dot", "markedDates dot 스타일", "width: 6px; height: 6px; border-radius: 9999px", "h-1.5 w-1.5 rounded-full"],
    ],
  },
];

const datePickerClassNameRows: Array<{ label: string; rows: ClassNameSlotRow[] }> = [
  {
    label: "필드 / 트리거",
    rows: [
      ["root", "DatePicker 최외곽 div", "전체 폭, 배치, form 주변 간격", "width: 280px; position: relative", "w-70 relative"],
      ["field", "trigger와 clear 버튼 wrapper", "버튼 간격, 정렬", "display: inline-flex; gap: 8px", "inline-flex gap-2"],
      ["trigger", "input-like trigger button", "입력 박스 형태, 테두리, 배경", "height: 40px; border: 1px solid #d1d5db", "h-10 rounded-lg border px-3"],
      ["triggerValue", "선택값 텍스트", "긴 날짜/기간 말줄임", "overflow: hidden; text-overflow: ellipsis; white-space: nowrap", "truncate whitespace-nowrap"],
      ["placeholder", "placeholder 텍스트", "미선택 상태 색상", "color: #6b7280", "text-slate-500"],
      ["icon", "오른쪽 calendar icon", "아이콘 크기/색상", "color: #6b7280; flex-shrink: 0", "shrink-0 text-slate-500"],
      ["clearButton", "지우기 버튼", "clearable 버튼", "border: 1px solid #d1d5db; padding: 0 10px", "rounded-lg border px-2.5"],
    ],
  },
  {
    label: "Calendar Popover",
    rows: [
      ["popover", "Calendar popover dialog", "달력 팝오버 배경, z-index, shadow", "z-index: 50; border-radius: 12px; box-shadow: 0 18px 45px rgba(0,0,0,.18)", "z-50 rounded-xl shadow-xl"],
      ["popoverHeader", "popover 상단 헤더", "이전/다음 버튼과 월 선택 정렬", "display: flex; justify-content: space-between", "flex items-center justify-between"],
      ["popoverTitle", "현재 연도/월 텍스트", "월 선택 버튼 텍스트", "font-weight: 700", "font-bold"],
      ["monthButton", "이전/다음 달 버튼", "월 이동 버튼", "height: 32px; border: 1px solid #d1d5db", "h-8 rounded-lg border px-2.5"],
    ],
  },
  {
    label: "연도/월 선택 Popover",
    rows: [
      ["monthPickerWrap", "연도/월 선택 wrapper", "내부 popover 기준점", "position: relative", "relative"],
      ["monthPickerToggle", "연도/월 선택 버튼", "연도/월 리스트 열기 버튼", "min-width: 96px; border-radius: 8px", "min-w-24 rounded-lg"],
      ["monthPickerPopover", "연도/월 리스트 popover", "내부 popover 패널", "width: 280px; max-width: calc(100vw - 64px)", "w-70 max-w-[calc(100vw-64px)]"],
      ["monthPickerSection", "연도 또는 월 section", "옵션 grid", "display: grid; grid-template-columns: repeat(4, 1fr)", "grid grid-cols-4 gap-1.5"],
      ["monthPickerSectionTitle", "section 제목", "연도/월 라벨", "font-size: 12px; font-weight: 700", "text-xs font-bold"],
      ["monthPickerOption", "연도/월 option button", "각 연도/월 버튼", "height: 32px; border-radius: 8px", "h-8 rounded-lg"],
      ["monthPickerOptionActive", "선택된 연도/월 option", "active option", "background: #4f46e5; color: #fff", "bg-indigo-600 text-white"],
    ],
  },
];

function ApiTable({
  rows,
}: {
  rows: Array<[string, string, string]>;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
      <table className="w-full text-sm">
        <thead className="bg-surface-container-low text-on-surface-variant">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Prop</th>
            <th className="px-4 py-3 text-left font-semibold">Type</th>
            <th className="px-4 py-3 text-left font-semibold">설명</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, type, description]) => (
            <tr key={name} className="border-t border-outline-variant/20">
              <td className="px-4 py-3 align-top font-mono text-xs text-primary">{name}</td>
              <td className="px-4 py-3 align-top font-mono text-xs text-on-surface-variant">{type}</td>
              <td className="px-4 py-3 align-top text-on-surface-variant">{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ClassNameSlotTable({
  title,
  rows,
}: {
  title: string;
  rows: Array<{ label: string; rows: ClassNameSlotRow[] }>;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
      <div className="border-b border-outline-variant/20 bg-surface-container-low px-4 py-3">
        <h3 className="font-semibold text-on-surface">{title}</h3>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-surface-container-low text-on-surface-variant">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">슬롯</th>
            <th className="px-4 py-3 text-left font-semibold">적용 요소</th>
            <th className="px-4 py-3 text-left font-semibold">관련 기능</th>
            <th className="px-4 py-3 text-left font-semibold">CSS 예시</th>
            <th className="px-4 py-3 text-left font-semibold">Tailwind 예시</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, rows: sectionRows }) => (
            <Fragment key={label}>
              <tr className="border-t border-outline-variant/20 bg-surface-container-low/50">
                <td
                  colSpan={5}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-on-surface-variant/60"
                >
                  {label}
                </td>
              </tr>
              {sectionRows.map(([slot, element, feature, cssExample, tailwindExample]) => (
                <tr
                  key={slot}
                  className="border-t border-outline-variant/20 transition-colors hover:bg-surface-container-lowest"
                >
                  <td className="px-4 py-2.5 font-mono text-xs text-primary">{slot}</td>
                  <td className="px-4 py-2.5 text-on-surface-variant">{element}</td>
                  <td className="px-4 py-2.5 text-on-surface-variant">{feature}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-on-surface-variant">{cssExample}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-on-surface-variant">{tailwindExample}</td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SupportNotes() {
  const notes = [
    {
      title: "날짜 입력 포맷",
      description:
        "Calendar와 DatePicker는 Date 객체와 yyyyMMdd, yyyy-MM-dd, yyyy.MM.dd 문자열 입력을 파싱합니다. 선택 콜백 반환값은 dateSelectValueType으로 date, yyyyMMdd, yyyy-MM-dd, yyyy.MM.dd 중 선택할 수 있습니다.",
      code: `<Calendar
  selectedDate="20260910"
  dateSelectValueType="yyyy.MM.dd"
  onDateSelect={(date) => console.log(date)}
/>`,
    },
    {
      title: "Controlled hover",
      description:
        "hoveredDate와 onHoverDateChange를 함께 사용하면 hover 상태를 외부 상태로 제어할 수 있습니다. range 모드에서는 시작일 선택 후 hover 날짜를 기준으로 preview 범위가 표시됩니다.",
      code: `<Calendar
  year={2026}
  month={9}
  selectionMode="range"
  hoveredDate={hoveredDate}
  onHoverDateChange={setHoveredDate}
/>`,
    },
    {
      title: "접근성 / 키보드",
      description:
        "Calendar는 role=\"grid\" 구조와 aria-selected, aria-disabled, aria-busy 속성을 사용합니다. 키보드는 방향키 이동, Home/End 행 이동, Enter/Space 선택을 지원합니다.",
      code: `// 날짜 cell 키보드 동작
Arrow keys: focus 이동
Home / End: 행 시작/끝 이동
Enter / Space: 날짜 선택`,
    },
    {
      title: "Focus 격리 / 테스트",
      description:
        "각 Calendar 인스턴스는 자체 focus 상태를 갖습니다. 날짜 cell에는 data-mycrm-ui-calendar-date가 제공되어 테스트에서 특정 날짜를 안정적으로 찾을 수 있습니다.",
      code: `screen.getByRole('grid', { name: '2026-09' })
container.querySelector('[data-mycrm-ui-calendar-date="2026-09-10"]')`,
    },
    {
      title: "DatePicker의 현재 역할",
      description:
        "DatePicker는 더 이상 Calendar를 그대로 반환하는 pass-through wrapper가 아닙니다. trigger, popover, clear 버튼, hidden input, 연도/월 선택 UI를 포함한 상위 컴포넌트입니다.",
      code: `<DatePicker
  name="eventDate"
  clearable
  previousMonthLabel="이전 달"
  nextMonthLabel="다음 달"
/>`,
    },
    {
      title: "Pending UI",
      description:
        "현재 pending UI는 skeleton이 아니라 dimmed overlay와 원형 spinner입니다. pending=true 동안 날짜 선택과 focus 대상 상호작용이 차단됩니다.",
      code: `<Calendar
  year={2026}
  month={9}
  pending={isLoading}
/>`,
    },
  ];

  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <div
          key={note.title}
          className="rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-4"
        >
          <h3 className="mb-2 font-semibold text-on-surface">{note.title}</h3>
          <p className="mb-3 text-sm leading-relaxed text-on-surface-variant">
            {note.description}
          </p>
          <pre className="overflow-x-auto rounded-lg bg-inverse-surface p-3 font-mono text-xs text-inverse-on-surface">
            <code>{note.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  actions,
}: {
  icon: string;
  title: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-on-surface">{title}</h2>
      </div>
      {actions}
    </div>
  );
}

function LlmGuideActions({ partSlug }: { partSlug: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="text-[11px] font-semibold text-secondary">LLM Guide</span>
      <Link
        href={`/document/calendar/llm/${partSlug}`}
        className="rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-1 text-xs font-medium text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
      >
        Viewer
      </Link>
      <Link
        href={`/document/calendar/llm/${partSlug}/md`}
        className="rounded-full border border-outline-variant/30 px-2.5 py-1 text-xs font-medium text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
      >
        MD
      </Link>
    </div>
  );
}

function LlmSkillSampleAction() {
  return (
    <Link
      href="/document/calendar/llm"
      className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-sm font-semibold text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
    >
      스킬 샘플 보기
    </Link>
  );
}

export default async function CalendarDocumentPage() {
  const [
    basicCalendarHtml,
    rangeCalendarHtml,
    multipleCalendarHtml,
    pendingCalendarHtml,
    datePickerHtml,
    datePickerAdvancedHtml,
  ] = await Promise.all([
    highlight(BASIC_CALENDAR_CODE),
    highlight(RANGE_CALENDAR_CODE),
    highlight(MULTIPLE_CALENDAR_CODE),
    highlight(PENDING_CALENDAR_CODE),
    highlight(DATE_PICKER_CODE),
    highlight(DATE_PICKER_ADVANCED_CODE),
  ]);

  return (
    <>
      <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
        <div className="max-w-3xl">
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                Component
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
              Calendar
            </h1>
            <p className="text-xl font-light leading-relaxed text-on-surface-variant">
              <code>@mycrm-ui/components</code>의 Calendar와 DatePicker입니다.
              단일 날짜, 기간, 여러 날짜 선택과 marker, disabled date, pending 상태,
              DatePicker popover를 제공합니다.
            </p>
            <p className="mt-3 rounded-lg bg-surface-container-low p-3 text-sm text-on-surface-variant">
              Calendar는 달력 본문에 집중한 headless 컴포넌트입니다. 월 이동 버튼,
              API 호출, 폼 연결이 필요하면 DatePicker를 사용하거나 외부 상태로 Calendar를
              조립합니다.
            </p>
            <div className="mt-5">
              <LlmSkillSampleAction />
            </div>
          </header>

          <section className="mb-16" id="calendar-basic">
            <SectionHeader
              icon="calendar_month"
              title="Calendar 기본 사용"
              actions={<LlmGuideActions partSlug="basic" />}
            />
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>year</code>와 <code>month</code>로 표시 월을 정하고,
              <code>selectedDate</code>와 <code>onDateSelect</code>로 단일 날짜 선택을 제어합니다.
              <code>markedDates</code>는 날짜 하단 dot과 선택 시 반환되는 marker 메타데이터를 제공합니다.
            </p>
            <BasicCalendarDemo codeHtml={basicCalendarHtml} />
          </section>

          <section className="mb-16" id="calendar-range">
            <SectionHeader
              icon="date_range"
              title="Range 선택"
              actions={<LlmGuideActions partSlug="range" />}
            />
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>selectionMode=&quot;range&quot;</code>를 사용하면 첫 번째 클릭으로 시작일을 만들고,
              두 번째 클릭으로 시작일/종료일을 정규화해 반환합니다.
            </p>
            <RangeCalendarDemo codeHtml={rangeCalendarHtml} />
          </section>

          <section className="mb-16" id="calendar-multiple">
            <SectionHeader
              icon="event_available"
              title="Multiple 선택"
              actions={<LlmGuideActions partSlug="multiple" />}
            />
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>selectionMode=&quot;multiple&quot;</code>은 날짜를 토글 방식으로 선택합니다.
              <code>maxSelectedDates</code>로 선택 가능한 최대 개수를 제한할 수 있습니다.
            </p>
            <MultipleCalendarDemo codeHtml={multipleCalendarHtml} />
          </section>

          <section className="mb-16" id="calendar-pending">
            <SectionHeader
              icon="progress_activity"
              title="Pending / API 연동"
              actions={<LlmGuideActions partSlug="pending-api" />}
            />
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              월 변경 시 API를 호출하는 구조에서는 외부에서 <code>pending</code>을 켜고,
              응답으로 받은 날짜를 <code>isDateDisabled</code> 또는 <code>markedDates</code>에 반영합니다.
              pending 중에는 dimmed overlay와 원형 spinner가 표시됩니다.
            </p>
            <PendingCalendarDemo codeHtml={pendingCalendarHtml} />
          </section>

          <section className="mb-16" id="date-picker">
            <SectionHeader
              icon="edit_calendar"
              title="DatePicker"
              actions={<LlmGuideActions partSlug="date-picker" />}
            />
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              DatePicker는 input-like trigger, Calendar popover, clear 버튼, hidden input,
              연도/월 선택 popover를 포함합니다. <code>range</code> 또는 <code>multi</code> shorthand로
              같은 컴포넌트에서 기간/다중 선택 모드를 사용할 수 있습니다.
            </p>
            <DatePickerDemo codeHtml={datePickerHtml} />
          </section>

          <section className="mb-16" id="date-picker-advanced">
            <SectionHeader
              icon="tune"
              title="DatePicker 고급 옵션"
              actions={<LlmGuideActions partSlug="date-picker-advanced" />}
            />
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>onMonthChange</code>로 API 호출을 연결하고, <code>pending</code>,
              <code>markedDates</code>, <code>isDateDisabled</code>, <code>getDayClassName</code>을
              조합해 업무 규칙을 주입합니다. <code>theme</code>은 내장 popover의 light/dark 테마를 바꿉니다.
            </p>
            <DatePickerAdvancedDemo codeHtml={datePickerAdvancedHtml} />
          </section>

          <section className="mb-16" id="calendar-api">
            <SectionHeader icon="data_object" title="Calendar API" />
            <ApiTable rows={calendarApiRows} />
          </section>

          <section className="mb-16" id="date-picker-api">
            <SectionHeader icon="input" title="DatePicker API" />
            <ApiTable rows={datePickerApiRows} />
          </section>

          <section className="mb-16" id="calendar-support-notes">
            <SectionHeader
              icon="verified"
              title="추가 지원 기능"
              actions={<LlmGuideActions partSlug="support-notes" />}
            />
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              아래 항목은 기본 데모 화면만으로는 눈에 잘 드러나지 않지만, 현재
              <code>mycrm-ui</code> 소스에서 지원하는 입력 포맷, 접근성, 키보드,
              테스트 계약, DatePicker 역할입니다.
            </p>
            <SupportNotes />
          </section>

          <section className="mb-16" id="calendar-classnames">
            <SectionHeader
              icon="palette"
              title="CSS 커스터마이징"
              actions={<LlmGuideActions partSlug="css-classnames" />}
            />
            <div className="space-y-6 leading-relaxed text-on-surface-variant">
              <p>
                컴포넌트는 기본 inline style을 제공하지만, <code>classNames</code>와
                <code>calendarClassNames</code>로 프로젝트 CSS를 우선 적용할 수 있습니다.
                외부 className이 있으면 주요 기본 스타일은 생략되도록 설계되어 있습니다.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4">
                  <p className="mb-1 font-semibold text-on-surface">Calendar</p>
                  <p className="text-sm">
                    <code>className</code>은 root에, <code>classNames</code>는 달력 내부 슬롯에 적용합니다.
                  </p>
                </div>
                <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4">
                  <p className="mb-1 font-semibold text-on-surface">DatePicker</p>
                  <p className="text-sm">
                    <code>classNames</code>는 trigger, clear 버튼, popover, 연도/월 선택 UI를 제어합니다.
                  </p>
                </div>
                <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4">
                  <p className="mb-1 font-semibold text-on-surface">내장 Calendar</p>
                  <p className="text-sm">
                    DatePicker 안의 달력은 <code>calendarClassNames</code>로 별도 스타일링합니다.
                  </p>
                </div>
              </div>
              <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
                <code>{`<Calendar
  className="w-80 rounded-xl border p-4"
  classNames={{
    weekdaySat: 'text-blue-600',
    weekdaySun: 'text-red-600',
    selectedDay: 'bg-blue-600 text-white',
    rangeInsideDay: 'bg-blue-100 text-blue-900',
    adjacentMonthDay: 'text-slate-400 opacity-60',
    disabledDay: 'text-slate-400 opacity-45',
    dayMarker: 'ring-1 ring-white',
  }}
/>

<DatePicker
  classNames={{
    root: 'w-64',
    trigger: 'w-full rounded-lg border px-3',
    triggerValue: 'truncate whitespace-nowrap',
    clearButton: 'rounded-lg border px-2.5',
    popover: 'rounded-xl bg-white shadow-xl',
    monthPickerOptionActive: 'bg-blue-600 text-white',
  }}
  calendarClassNames={{
    selectedDay: 'bg-blue-600 text-white',
    rangeInsideDay: 'bg-blue-100',
    disabledDay: 'opacity-40 text-slate-400',
  }}
/>`}</code>
              </pre>
              <div className="rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 text-sm">
                <p className="mb-2 font-semibold text-on-surface">적용 기준</p>
                <ul className="space-y-1">
                  <li>
                    <code>className</code>은 최외곽 root에 추가되는 단일 class입니다.
                  </li>
                  <li>
                    <code>classNames</code>는 컴포넌트가 노출하는 슬롯별 class입니다. 슬롯을 제공하면 해당 슬롯의 주요 기본 inline style이 생략되는 경우가 있어 프로젝트 CSS가 우선됩니다.
                  </li>
                  <li>
                    <code>DatePicker.classNames</code>와 <code>DatePicker.calendarClassNames</code>는 적용 대상이 다릅니다. trigger/popup shell은 <code>classNames</code>, 달력 날짜 셀은 <code>calendarClassNames</code>를 사용합니다.
                  </li>
                </ul>
              </div>
              <ClassNameSlotTable title="CalendarClassNames 슬롯" rows={calendarClassNameRows} />
              <ClassNameSlotTable title="DatePickerClassNames 슬롯" rows={datePickerClassNameRows} />
            </div>
          </section>
        </div>
      </main>
      <TocAside groups={TOC_GROUPS} />
    </>
  );
}
