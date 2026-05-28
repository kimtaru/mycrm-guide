"use client";

import { useEffect, useState } from "react";
import { Calendar, DatePicker } from "@mycrm-ui/components";
import type {
  CalendarDateSelectValue,
  CalendarMarkedDate,
  CalendarMonthChangeValue,
  CalendarRangeDraftValue,
  CalendarRangeSelectValue,
} from "@mycrm-ui/components";
import CodeToggle from "../code-toggle";

interface DemoDatePickerRangeValue {
  startDate: CalendarDateSelectValue | null;
  endDate: CalendarDateSelectValue | null;
}

interface DemoDatePickerMultipleValue {
  selectedDates: CalendarDateSelectValue[];
}

const calendarClassNames = {
  root: "rounded-xl border border-outline-variant/25 bg-surface-container-lowest p-4 text-sm text-on-surface shadow-sm",
  grid: "text-sm",
  weekday: "font-semibold text-on-surface-variant",
  weekdaySun: "text-error",
  weekdaySat: "text-primary",
  day: "min-h-10",
  dayContent: "font-medium",
  daySun: "text-error",
  daySat: "text-primary",
  selectedDay: "bg-primary text-on-primary shadow-sm",
  todayDay: "text-primary underline underline-offset-4",
  adjacentMonthDay: "text-on-surface-variant/35",
  disabledDay: "text-on-surface-variant/35",
  dayHover: "rounded-full bg-primary/10 text-primary",
  rangeStartDay: "bg-primary text-on-primary",
  rangeEndDay: "bg-primary text-on-primary",
  rangeInsideDay: "bg-primary/15 text-on-surface",
  rangePreviewDay: "bg-primary/10 text-primary",
  rangeSingleDay: "bg-primary text-on-primary",
  dayMarker: "ring-1 ring-surface",
};

const datePickerClassNames = {
  root: "w-full max-w-[360px] min-w-0",
  field: "w-full min-w-0",
  trigger: "w-full min-w-0",
  triggerValue: "min-w-0 flex-1 truncate whitespace-nowrap text-left",
  icon: "shrink-0",
  clearButton:
    "shrink-0 border-outline-variant/30 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low disabled:text-on-surface-variant",
  popover: "z-50 text-sm",
};

const datePickerCalendarClassNames = {
  ...calendarClassNames,
  root: "rounded-lg bg-transparent text-sm text-inherit",
  selectedDay: "bg-primary text-on-primary shadow-sm",
};

const markedDates: CalendarMarkedDate[] = [
  { date: "2026-09-10", color: "#2563eb", meta: "상담 예약" },
  { date: "2026-09-20", color: "#dc2626", meta: "창립5주년행사" },
  { date: "2026-09-20", color: "#16a34a", meta: "VIP 미팅" },
  "2026-09-25",
];

function formatValue(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function isSeptemberWednesday(date: Date) {
  return date.getFullYear() === 2026 && date.getMonth() === 8 && date.getDay() === 3;
}

function DemoShell({
  children,
  codeHtml,
}: {
  children: React.ReactNode;
  codeHtml: string;
}) {
  return (
    <div className="rounded-xl border border-outline-variant/25">
      <div className="rounded-t-xl bg-surface-container-lowest p-6">{children}</div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}

function DemoField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
        {label}
      </p>
      {children}
    </div>
  );
}

export function BasicCalendarDemo({ codeHtml }: { codeHtml: string }) {
  const [selectedDate, setSelectedDate] = useState<CalendarDateSelectValue | null>("2026-09-10");
  const [selectedMarkers, setSelectedMarkers] = useState<unknown[]>([]);

  return (
    <DemoShell codeHtml={codeHtml}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,320px)_1fr]">
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
          classNames={calendarClassNames}
          onDateSelect={(date, markers) => {
            setSelectedDate(date);
            setSelectedMarkers(markers);
          }}
        />
        <div className="rounded-xl bg-surface-container-low p-4 text-sm text-on-surface-variant">
          <p className="mb-2 font-semibold text-on-surface">선택된 날짜</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-inverse-surface p-3 text-xs text-inverse-on-surface">
            {formatValue({ selectedDate, selectedMarkers })}
          </pre>
        </div>
      </div>
    </DemoShell>
  );
}

export function RangeCalendarDemo({ codeHtml }: { codeHtml: string }) {
  const [draft, setDraft] = useState<CalendarRangeDraftValue>({
    startDate: "2026-09-10",
    endDate: null,
  });
  const [selectedRange, setSelectedRange] = useState<CalendarRangeSelectValue | null>(null);

  return (
    <DemoShell codeHtml={codeHtml}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,320px)_1fr]">
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
          classNames={calendarClassNames}
          onRangeDraftChange={(value) => {
            setDraft(value);
            if (value.endDate === null) {
              setSelectedRange(null);
            }
          }}
          onRangeSelect={setSelectedRange}
        />
        <div className="rounded-xl bg-surface-container-low p-4 text-sm text-on-surface-variant">
          <p className="mb-2 font-semibold text-on-surface">범위 선택 상태</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-inverse-surface p-3 text-xs text-inverse-on-surface">
            {formatValue({ draft, selectedRange })}
          </pre>
        </div>
      </div>
    </DemoShell>
  );
}

export function MultipleCalendarDemo({ codeHtml }: { codeHtml: string }) {
  const [selectedDates, setSelectedDates] = useState<CalendarDateSelectValue[]>([
    "2026-09-10",
    "2026-09-20",
  ]);

  return (
    <DemoShell codeHtml={codeHtml}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,320px)_1fr]">
        <Calendar
          year={2026}
          month={9}
          selectionMode="multiple"
          selectedDates={selectedDates}
          maxSelectedDates={3}
          weekdayLabelType="ko"
          dateSelectValueType="yyyy-MM-dd"
          classNames={calendarClassNames}
          onDateSelect={(date) => {
            setSelectedDates((current) =>
              current.includes(date)
                ? current.filter((item) => item !== date)
                : [...current, date],
            );
          }}
        />
        <div className="rounded-xl bg-surface-container-low p-4 text-sm text-on-surface-variant">
          <p className="mb-2 font-semibold text-on-surface">다중 선택 날짜</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-inverse-surface p-3 text-xs text-inverse-on-surface">
            {formatValue({ selectedDates })}
          </pre>
        </div>
      </div>
    </DemoShell>
  );
}

export function PendingCalendarDemo({ codeHtml }: { codeHtml: string }) {
  const [month, setMonth] = useState<CalendarMonthChangeValue>({ year: 2026, month: 9 });
  const [pending, setPending] = useState(true);
  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDisabledDates(month.month === 9 ? ["2026-09-09", "2026-09-16", "2026-09-23"] : []);
      setPending(false);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [month]);

  const goMonth = (offset: number) => {
    const next = new Date(month.year, month.month - 1 + offset, 1);
    setPending(true);
    setMonth({ year: next.getFullYear(), month: next.getMonth() + 1 });
  };

  return (
    <DemoShell codeHtml={codeHtml}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,320px)_1fr]">
        <div>
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              className="rounded-lg border border-outline-variant/30 px-3 py-1.5 text-sm text-on-surface"
              onClick={() => goMonth(-1)}
            >
              이전 달
            </button>
            <strong className="text-on-surface">
              {month.year}.{String(month.month).padStart(2, "0")}
            </strong>
            <button
              type="button"
              className="rounded-lg border border-outline-variant/30 px-3 py-1.5 text-sm text-on-surface"
              onClick={() => goMonth(1)}
            >
              다음 달
            </button>
          </div>
          <Calendar
            year={month.year}
            month={month.month}
            pending={pending}
            weekdayLabelType="ko"
            dateSelectValueType="yyyy-MM-dd"
            isDateDisabled={(date) =>
              disabledDates.includes(
                `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
              )
            }
            classNames={calendarClassNames}
          />
        </div>
        <div className="rounded-xl bg-surface-container-low p-4 text-sm text-on-surface-variant">
          <p className="mb-2 font-semibold text-on-surface">API 연동 예시</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-inverse-surface p-3 text-xs text-inverse-on-surface">
            {formatValue({ month, pending, disabledDates })}
          </pre>
        </div>
      </div>
    </DemoShell>
  );
}

export function DatePickerDemo({ codeHtml }: { codeHtml: string }) {
  const [single, setSingle] = useState<CalendarDateSelectValue | null>("2026-09-10");
  const [range, setRange] = useState<DemoDatePickerRangeValue>({
    startDate: "2026-09-10",
    endDate: "2026-09-20",
  });
  const [multiple, setMultiple] = useState<DemoDatePickerMultipleValue>({
    selectedDates: ["2026-09-10", "2026-09-20"],
  });

  return (
    <DemoShell codeHtml={codeHtml}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div className="min-w-0 space-y-4">
          <DemoField label="Single">
            <DatePicker
              value={single}
              onChange={(date) => setSingle(date)}
              placeholder="날짜 선택"
              weekdayLabelType="ko"
              previousMonthLabel="이전 달"
              nextMonthLabel="다음 달"
              clearLabel="지우기"
              classNames={datePickerClassNames}
              calendarClassNames={datePickerCalendarClassNames}
            />
          </DemoField>
          <DemoField label="Range">
            <DatePicker
              range
              rangeStart={range.startDate}
              rangeEnd={range.endDate}
              onRangeDraftChange={setRange}
              onRangeChange={setRange}
              placeholder="기간 선택"
              weekdayLabelType="ko"
              previousMonthLabel="이전 달"
              nextMonthLabel="다음 달"
              clearLabel="지우기"
              classNames={datePickerClassNames}
              calendarClassNames={datePickerCalendarClassNames}
            />
          </DemoField>
          <DemoField label="Multiple">
            <DatePicker
              multi
              selectedDates={multiple.selectedDates}
              maxSelectedDates={3}
              onMultipleChange={setMultiple}
              placeholder="여러 날짜 선택"
              weekdayLabelType="ko"
              previousMonthLabel="이전 달"
              nextMonthLabel="다음 달"
              clearLabel="지우기"
              classNames={datePickerClassNames}
              calendarClassNames={datePickerCalendarClassNames}
            />
          </DemoField>
        </div>
        <div className="min-w-0 rounded-xl bg-surface-container-low p-4 text-sm text-on-surface-variant">
          <p className="mb-2 font-semibold text-on-surface">DatePicker 선택 상태</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-inverse-surface p-3 text-xs text-inverse-on-surface">
            {formatValue({ single, range, multiple })}
          </pre>
        </div>
      </div>
    </DemoShell>
  );
}

export function DatePickerAdvancedDemo({ codeHtml }: { codeHtml: string }) {
  const [value, setValue] = useState<CalendarDateSelectValue | null>("2026-09-01");
  const [events, setEvents] = useState<unknown[]>([]);
  const [month, setMonth] = useState<CalendarMonthChangeValue>({ year: 2026, month: 9 });
  const [pending, setPending] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const timer = window.setTimeout(() => setPending(false), 700);

    return () => window.clearTimeout(timer);
  }, [month]);

  return (
    <DemoShell codeHtml={codeHtml}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,360px)_1fr]">
        <DemoField label="Advanced">
          <div className="mb-3 inline-flex rounded-lg border border-outline-variant/30 bg-surface-container-low p-1 text-sm">
            {(["light", "dark"] as const).map((option) => (
              <button
                key={option}
                type="button"
                className={[
                  "rounded-md px-3 py-1.5 font-semibold transition",
                  theme === option
                    ? "bg-primary text-on-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high",
                ].join(" ")}
                onClick={() => setTheme(option)}
              >
                {option === "light" ? "Light" : "Dark"}
              </button>
            ))}
          </div>
          <DatePicker
            value={value}
            onChange={(date, markers) => {
              setValue(date);
              setEvents(markers.map((marker) => marker.meta ?? marker.date));
            }}
            onMonthChange={(nextMonth) => {
              setPending(true);
              setMonth(nextMonth);
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
                ? "font-extrabold"
                : undefined
            }
            classNames={datePickerClassNames}
            calendarClassNames={datePickerCalendarClassNames}
          />
        </DemoField>
        <div className="min-w-0 rounded-xl bg-surface-container-low p-4 text-sm text-on-surface-variant">
          <p className="mb-2 font-semibold text-on-surface">고급 옵션 선택 상태</p>
          <pre className="whitespace-pre-wrap rounded-lg bg-inverse-surface p-3 text-xs text-inverse-on-surface">
            {formatValue({ value, events, month, pending, theme })}
          </pre>
        </div>
      </div>
    </DemoShell>
  );
}
