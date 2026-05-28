# @mycrm-ui/components Calendar Pending / API 연동 LLM 가이드

이 문서는 월 변경 시 API를 호출하고, 응답에 따라 비활성 날짜나 marker를 갱신하는 구조를 만들 때 참고한다.

## 현재 pending UI

- 현재 `pending` UI는 skeleton이 아니다.
- 달력 위에 dimmed overlay가 올라가고 중앙에 원형 spinner가 표시된다.
- `pending=true` 동안 날짜 선택과 날짜 focus 상호작용이 차단된다.
- root에는 busy 상태가 전달되어 로딩 상태를 접근성 속성으로 표현한다.

## Calendar에서 API 연동하기

`Calendar` 자체는 월 이동 헤더나 API 호출을 내장하지 않는다. 호출 화면에서 `year`, `month`, `pending`, API 응답 상태를 관리한다.

```tsx
import { useEffect, useState } from "react";
import { Calendar } from "@mycrm-ui/components";
import type { CalendarMonthChangeValue } from "@mycrm-ui/components";

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function ApiCalendar() {
  const [calendarMonth, setCalendarMonth] = useState<CalendarMonthChangeValue>({
    year: 2026,
    month: 9,
  });
  const [pending, setPending] = useState(false);
  const [disabledDates, setDisabledDates] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;
    setPending(true);

    window.setTimeout(() => {
      if (!alive) return;
      setDisabledDates(
        calendarMonth.month === 9
          ? ["2026-09-09", "2026-09-16", "2026-09-23"]
          : [],
      );
      setPending(false);
    }, 700);

    return () => {
      alive = false;
    };
  }, [calendarMonth]);

  const moveMonth = (offset: number) => {
    const next = new Date(
      calendarMonth.year,
      calendarMonth.month - 1 + offset,
      1,
    );
    setCalendarMonth({
      year: next.getFullYear(),
      month: next.getMonth() + 1,
    });
  };

  return (
    <>
      <button type="button" onClick={() => moveMonth(-1)}>
        이전 달
      </button>
      <button type="button" onClick={() => moveMonth(1)}>
        다음 달
      </button>

      <Calendar
        year={calendarMonth.year}
        month={calendarMonth.month}
        pending={pending}
        weekdayLabelType="ko"
        isDateDisabled={(date) => disabledDates.includes(formatDateKey(date))}
      />
    </>
  );
}
```

## DatePicker에서 API 연동하기

`DatePicker`는 내부 월 이동과 연도/월 선택 UI가 있으므로 `onMonthChange`를 사용한다.

```tsx
<DatePicker
  value={value}
  onChange={setValue}
  onMonthChange={({ year, month }) => {
    setPending(true);
    fetchDisabledDates({ year, month }).then((dates) => {
      setDisabledDates(dates);
      setPending(false);
    });
  }}
  pending={pending}
  isDateDisabled={(date) => disabledDates.includes(formatDate(date))}
/>
```

## 주요 props

- `pending`: 로딩 overlay와 spinner를 표시하고 날짜 상호작용을 막는다.
- `isDateDisabled`: API 응답을 기준으로 특정 날짜를 비활성화한다.
- `markedDates`: API 응답 이벤트를 dot marker로 표시한다.
- `onMonthChange`: DatePicker 내부 월 변경 시 호출된다. Calendar에는 월 변경 UI가 없으므로 호출 화면에서 직접 월 상태를 바꾼다.

## LLM 구현 체크리스트

- Calendar 단독 사용 시 월 이동 UI와 API 호출 상태는 호출 화면이 소유한다.
- DatePicker 사용 시 월 이동 이벤트는 `onMonthChange`에서 잡는다.
- 로딩 중 선택을 막아야 하면 `pending`을 반드시 넘긴다.
- API 응답 이벤트를 선택 콜백으로 돌려받아야 하면 `markedDates[].meta`에 원본 이벤트를 넣는다.
