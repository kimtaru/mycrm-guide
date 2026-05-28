# @mycrm-ui/components DatePicker LLM 가이드

이 문서는 제품 화면에서 Calendar를 input-like trigger, popover, clear 버튼, form hidden input과 함께 사용할 때 참고한다.

## DatePicker의 역할

`DatePicker`는 단순히 `Calendar`를 반환하는 wrapper가 아니다. 현재 구현은 다음 UI와 동작을 포함한다.

- input처럼 보이는 trigger 버튼
- Calendar popover
- 지우기 버튼
- form submit용 hidden input
- 이전/다음 월 이동 버튼
- 연도/월 선택 내부 popover
- single, range, multiple 선택 모드

## 핵심 import

```tsx
import { DatePicker } from "@mycrm-ui/components";
import type {
  CalendarDateSelectValue,
  DatePickerRangeValue,
  DatePickerMultipleValue,
} from "@mycrm-ui/components";
```

## Single 예시

```tsx
import { useState } from "react";
import { DatePicker } from "@mycrm-ui/components";
import type { CalendarDateSelectValue } from "@mycrm-ui/components";

export function SingleDatePicker() {
  const [value, setValue] = useState<CalendarDateSelectValue | null>(null);

  return (
    <DatePicker
      name="eventDate"
      value={value}
      onChange={setValue}
      placeholder="날짜 선택"
      clearLabel="지우기"
      weekdayLabelType="ko"
      dateSelectValueType="yyyy-MM-dd"
    />
  );
}
```

## Range 예시

```tsx
const [range, setRange] = useState<DatePickerRangeValue>({
  startDate: null,
  endDate: null,
});

<DatePicker
  range
  name="period"
  rangeStart={range.startDate}
  rangeEnd={range.endDate}
  onRangeDraftChange={setRange}
  onRangeChange={setRange}
  placeholder="기간 선택"
  weekdayLabelType="ko"
/>;
```

## Multiple 예시

```tsx
const [multiple, setMultiple] = useState<DatePickerMultipleValue>({
  selectedDates: [],
});

<DatePicker
  multi
  selectedDates={multiple.selectedDates}
  maxSelectedDates={3}
  onMultipleChange={setMultiple}
  placeholder="여러 날짜 선택"
  weekdayLabelType="ko"
/>;
```

## 주요 props

- `selectionMode`: `"single"`, `"range"`, `"multiple"` 중 하나다.
- `range`: range shorthand다. `selectionMode` 대신 사용할 수 있다.
- `multi`: multiple shorthand다. `range`가 있으면 `range`가 우선한다.
- `value`, `defaultValue`, `onChange`: single 모드 값 제어다.
- `rangeStart`, `rangeEnd`, `onRangeDraftChange`, `onRangeChange`: range 모드 값 제어다.
- `selectedDates`, `defaultSelectedDates`, `onMultipleChange`: multiple 모드 값 제어다.
- `name`: hidden input 이름이다. range 모드는 시작/종료 hidden input을 만든다.
- `clearable`: 지우기 버튼 표시 여부다. 기본값은 `true`다.
- `closeOnSelect`: 선택 후 popover를 닫을지 결정한다. 기본 동작은 single/range는 닫고 multiple은 닫지 않는다.
- `dateSelectValueType`: DatePicker 기본값은 `"yyyy-MM-dd"`다.

## 기본값

- `placeholder`: `"Select date"`
- `clearLabel`: `"Clear"`
- `popoverLabel`: `"Choose date"`
- `theme`: `"light"`
- `weekdayLabelType`: `"en"`
- `weekStartsOn`: `0`
- `showAdjacentMonthDays`: `true`
- `showToday`: `true`
- `showHover`: `true`

## LLM 구현 체크리스트

- 제품 화면의 날짜 입력은 Calendar보다 DatePicker를 우선 고려한다.
- form submit이 필요하면 `name`을 지정한다.
- 기간 선택은 `range`, 다중 선택은 `multi` shorthand를 사용하면 된다.
- 길이가 긴 range 텍스트는 기본 triggerValue 스타일에서 한 줄 말줄임으로 처리된다.
