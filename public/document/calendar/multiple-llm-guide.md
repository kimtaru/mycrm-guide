# @mycrm-ui/components Calendar Multiple 선택 LLM 가이드

이 문서는 `Calendar`로 여러 날짜를 선택하는 UI를 만들 때 참고한다.

## 언제 사용하나

- 일정 후보일 여러 개를 선택한다.
- 선택한 날짜를 다시 클릭해 해제한다.
- 최대 선택 개수를 제한한다.
- 선택 날짜 목록을 호출 화면에서 직접 관리한다.

## 핵심 import

```tsx
import { Calendar } from "@mycrm-ui/components";
import type { CalendarDateSelectValue } from "@mycrm-ui/components";
```

## 예시

```tsx
import { useState } from "react";
import { Calendar } from "@mycrm-ui/components";
import type { CalendarDateSelectValue } from "@mycrm-ui/components";

export function MultipleCalendar() {
  const [selectedDates, setSelectedDates] = useState<CalendarDateSelectValue[]>([
    "2026-09-10",
    "2026-09-20",
  ]);

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
        );
      }}
    />
  );
}
```

## 주요 props

- `selectionMode="multiple"`: 다중 선택 모드를 켠다.
- `selectedDates`: controlled 선택 날짜 목록이다.
- `maxSelectedDates`: 선택 가능한 최대 개수다.
- `onDateSelect`: 날짜 클릭 시 호출된다. 호출 화면에서 추가/제거 상태를 반영한다.
- `dateSelectValueType`: 선택 콜백의 날짜 포맷을 정한다.

## 동작 규칙

- 이미 선택된 날짜를 다시 선택하면 해제 흐름으로 사용할 수 있다.
- `maxSelectedDates`는 새 날짜 추가를 제한한다. 이미 선택된 날짜 해제는 가능해야 한다.
- `maxSelectedDates`가 정수가 아니거나 `0` 이하이면 제한하지 않는다.
- 다중 선택에서도 같은 날짜의 marker 목록은 `onDateSelect` 두 번째 인자로 전달된다.

## DatePicker에서 쓰는 경우

```tsx
<DatePicker
  multi
  selectedDates={selectedDates}
  maxSelectedDates={3}
  onMultipleChange={({ selectedDates }) => setSelectedDates(selectedDates)}
/>
```

## LLM 구현 체크리스트

- 달력 본문만 필요하면 `Calendar selectionMode="multiple"`을 사용한다.
- popover input UI가 필요하면 `DatePicker multi`를 사용한다.
- 서버 전송값이 필요하면 `dateSelectValueType="yyyy-MM-dd"` 같은 문자열 포맷을 명시한다.
