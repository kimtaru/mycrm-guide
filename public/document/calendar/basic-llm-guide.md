# @mycrm-ui/components Calendar 기본 사용 LLM 가이드

이 문서는 `Calendar`를 월간 달력 grid와 단일 날짜 선택 UI로 사용할 때 참고한다.

## 언제 사용하나

- `year`, `month`로 특정 월을 렌더링한다.
- `selectedDate`와 `onDateSelect`로 단일 날짜 선택을 제어한다.
- `markedDates`로 날짜 하단 dot marker를 표시한다.
- 선택된 날짜와 같은 날짜의 marker metadata를 호출 화면으로 전달한다.
- `Date`, `yyyyMMdd`, `yyyy-MM-dd`, `yyyy.MM.dd` 입력값을 섞어 받아야 한다.

## 핵심 import

```tsx
import { Calendar } from "@mycrm-ui/components";
import type {
  CalendarDateSelectValue,
  CalendarMarkedDate,
} from "@mycrm-ui/components";
```

## 최소 예시

```tsx
import { useState } from "react";
import { Calendar } from "@mycrm-ui/components";
import type {
  CalendarDateSelectValue,
  CalendarMarkedDate,
} from "@mycrm-ui/components";

const markedDates: CalendarMarkedDate[] = [
  { date: "2026-09-10", color: "#2563eb", meta: { label: "상담 예약" } },
  { date: "2026-09-20", color: "#dc2626", meta: { label: "창립5주년행사" } },
  { date: "2026-09-20", color: "#16a34a", meta: { label: "VIP 미팅" } },
];

export function BasicCalendar() {
  const [selectedDate, setSelectedDate] =
    useState<CalendarDateSelectValue | null>("2026-09-10");
  const [events, setEvents] = useState<unknown[]>([]);

  return (
    <Calendar
      year={2026}
      month={9}
      selectedDate={selectedDate}
      weekdayLabelType="ko"
      weekStartsOn={1}
      markedDates={markedDates}
      dateSelectValueType="yyyy-MM-dd"
      onDateSelect={(date, markers) => {
        setSelectedDate(date);
        setEvents(markers.map((marker) => marker.meta ?? marker.date));
      }}
    />
  );
}
```

## 주요 props

- `year`: 렌더링할 연도. 정수여야 한다.
- `month`: 렌더링할 월. `1~12` 값이어야 한다.
- `selectionMode`: 기본값은 `"single"`이다.
- `selectedDate`: single 모드의 controlled 선택값이다.
- `onDateSelect`: 날짜 선택 시 호출된다. 첫 번째 인자는 선택 날짜, 두 번째 인자는 해당 날짜의 marker 목록이다.
- `dateSelectValueType`: 콜백 반환 포맷이다. `"date"`, `"yyyyMMdd"`, `"yyyy-MM-dd"`, `"yyyy.MM.dd"`를 지원한다. Calendar 기본값은 `"date"`다.
- `weekdayLabelType`: `"en"` 또는 `"ko"` 요일 라벨을 사용한다. 기본값은 `"en"`이다.
- `weekStartsOn`: `0`은 일요일 시작, `1`은 월요일 시작이다. 기본값은 `0`이다.
- `markedDates`: 날짜별 dot marker 목록이다. 같은 날짜에 여러 marker를 줄 수 있다.
- `showAdjacentMonthDays`: 이전/다음 달 날짜 표시 여부다. 기본값은 `true`다.

## 구현 규칙

- `Calendar`는 월 이동 버튼이나 헤더를 내장하지 않는다. 월 변경 UI는 호출 화면에서 만든다.
- `showAdjacentMonthDays=true`여도 현재 월이 아닌 날짜는 선택 대상이 아니다.
- 같은 날짜에 marker가 여러 개 있으면 dot도 여러 개 표시되고, 선택 콜백의 `markers` 배열에도 모두 전달된다.
- 날짜 입력은 `Date`, `yyyyMMdd`, `yyyy-MM-dd`, `yyyy.MM.dd`를 지원한다.
- invalid date 문자열은 선택값 비교나 marker 매칭에서 유효한 날짜로 취급하지 않는다.

## LLM 구현 체크리스트

- 달력만 필요하면 `Calendar`를 사용한다.
- input, trigger, popover, clear 버튼, form hidden input이 필요하면 `DatePicker`를 사용한다.
- 선택 콜백 반환 타입이 문자열이어야 하면 `dateSelectValueType`을 명시한다.
- 업무 이벤트를 함께 반환해야 하면 `markedDates[].meta`에 원본 데이터를 넣는다.
