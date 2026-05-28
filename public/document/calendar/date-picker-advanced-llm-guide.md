# @mycrm-ui/components DatePicker 고급 옵션 LLM 가이드

이 문서는 DatePicker에 API 호출, 비활성 날짜, marker, 테마, 연도/월 선택 동작을 조합할 때 참고한다.

## 고급 옵션 예시

```tsx
import { useState } from "react";
import { DatePicker } from "@mycrm-ui/components";
import type {
  CalendarDateSelectValue,
  CalendarMarkedDate,
  CalendarMonthChangeValue,
} from "@mycrm-ui/components";

const markedDates: CalendarMarkedDate[] = [
  {
    date: "2026-09-20",
    color: "#dc2626",
    meta: { title: "창립5주년행사" },
  },
];

function isDisabled(date: Date) {
  return date.getFullYear() === 2026
    && date.getMonth() === 8
    && date.getDay() === 3;
}

export function AdvancedDatePicker() {
  const [value, setValue] = useState<CalendarDateSelectValue | null>(null);
  const [month, setMonth] = useState<CalendarMonthChangeValue>({
    year: 2026,
    month: 9,
  });
  const [pending, setPending] = useState(false);
  const [events, setEvents] = useState<unknown[]>([]);

  return (
    <DatePicker
      value={value}
      onChange={(date, markers) => {
        setValue(date);
        setEvents(markers.map((marker) => marker.meta ?? marker.date));
      }}
      onMonthChange={(nextMonth) => {
        setMonth(nextMonth);
        setPending(true);
      }}
      pending={pending}
      theme="light"
      weekdayLabelType="ko"
      previousMonthLabel="이전 달"
      nextMonthLabel="다음 달"
      clearLabel="지우기"
      placeholder="행사일 선택"
      selectableStartDate="2026-09-01"
      selectableEndDate="2026-09-30"
      markedDates={markedDates}
      isDateDisabled={isDisabled}
      getDayClassName={(date) =>
        date.getFullYear() === 2026 &&
        date.getMonth() === 8 &&
        date.getDate() === 20
          ? "font-extrabold"
          : undefined
      }
    />
  );
}
```

## 월 변경과 API 호출

- `DatePicker`의 내부 이전/다음 월 버튼은 `onMonthChange`를 호출한다.
- 연도/월 선택 popover에서 값을 바꿔도 `onMonthChange`가 호출된다.
- API 요청 중에는 `pending=true`로 내장 Calendar를 잠근다.
- API 응답은 `markedDates`와 `isDateDisabled`로 다시 주입한다.

## 연도/월 선택 popover

- trigger 중앙의 연도/월 텍스트를 클릭하면 내부 popover가 열린다.
- 연도 목록은 현재 연도를 기준으로 앞뒤 50년 범위를 제공한다.
- 연도 목록은 세로 스크롤 가능한 영역이다.
- 월 목록은 1월부터 12월까지 제공한다.
- `yearSelectLabel`, `monthSelectLabel`을 지정하지 않으면 `weekdayLabelType`에 따라 `Year/Month` 또는 `연도/월` 라벨을 사용한다.

## theme

- `theme="light"` 또는 `theme="dark"`를 받는다.
- DatePicker trigger, Calendar popover, 연도/월 선택 popover의 내장 테마에 영향을 준다.
- 프로젝트 CSS를 더 우선 적용하려면 `classNames`와 `calendarClassNames`를 사용한다.

## marker와 이벤트 반환

- `markedDates` item은 `Date`, 날짜 문자열, `{ date, color, meta }` 형태를 지원한다.
- `color`가 있으면 해당 dot 색상으로 사용한다.
- `meta`는 보관됐다가 날짜 선택 콜백의 `markers` 배열로 전달된다.
- 같은 날짜에 여러 marker가 있으면 모두 렌더링되고 모두 반환된다.

## 비활성 날짜

- `selectableStartDate`, `selectableEndDate`는 전체 선택 가능 경계를 제한한다.
- `isDateDisabled(date)`는 개별 날짜 비활성 규칙을 주입한다.
- range 모드는 개별 날짜 비활성보다 선택 가능 기간 제한을 중심으로 동작하므로, range에서 강한 경계가 필요하면 `selectableStartDate`, `selectableEndDate`를 우선 사용한다.

## LLM 구현 체크리스트

- API 기반 DatePicker는 `onMonthChange`, `pending`, `markedDates`, `isDateDisabled` 조합으로 만든다.
- 연도/월 선택 UI는 별도로 만들지 말고 기본 popover를 사용한다.
- 내부 popover 테마만 조절하려면 `theme`을 사용한다.
- 세밀한 시각 스타일은 `classNames`와 `calendarClassNames`로 나눈다.
