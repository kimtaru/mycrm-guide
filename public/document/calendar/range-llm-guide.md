# @mycrm-ui/components Calendar Range 선택 LLM 가이드

이 문서는 `Calendar`로 시작일과 종료일을 선택하는 기간 선택 UI를 만들 때 참고한다.

## 언제 사용하나

- 달력 본문에서 날짜 범위를 선택한다.
- 첫 번째 클릭으로 시작일을 만들고 두 번째 클릭으로 종료일을 확정한다.
- 선택 중인 draft 상태와 확정된 range 상태를 분리한다.
- hover 날짜를 기준으로 range preview를 보여준다.

## 핵심 import

```tsx
import { Calendar } from "@mycrm-ui/components";
import type {
  CalendarRangeDraftValue,
  CalendarRangeSelectValue,
} from "@mycrm-ui/components";
```

## 예시

```tsx
import { useState } from "react";
import { Calendar } from "@mycrm-ui/components";
import type {
  CalendarRangeDraftValue,
  CalendarRangeSelectValue,
} from "@mycrm-ui/components";

export function RangeCalendar() {
  const [draft, setDraft] = useState<CalendarRangeDraftValue>({
    startDate: null,
    endDate: null,
  });
  const [selectedRange, setSelectedRange] =
    useState<CalendarRangeSelectValue | null>(null);

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
        setDraft(value);
        if (value.endDate === null) {
          setSelectedRange(null);
        }
      }}
      onRangeSelect={setSelectedRange}
    />
  );
}
```

## 주요 props

- `selectionMode="range"`: range 선택 모드를 켠다.
- `rangeStart`: controlled 시작일이다.
- `rangeEnd`: controlled 종료일이다.
- `onRangeDraftChange`: 시작일만 선택된 상태와 종료일 확정 상태 모두에서 호출된다.
- `onRangeSelect`: 시작일과 종료일이 모두 확정되면 호출된다.
- `selectableStartDate`, `selectableEndDate`: 선택 가능한 기간 경계를 제한한다.
- `showHover`: hover preview 표시 여부다. 기본값은 `true`다.
- `hoveredDate`, `onHoverDateChange`: hover 날짜를 외부 상태로 제어할 때 사용한다.

## 동작 규칙

- 사용자가 종료일을 시작일보다 앞 날짜로 선택하면 시작/종료 순서가 자동 정규화된다.
- `rangeStart`와 `rangeEnd`가 같은 날짜면 하루짜리 range로 표시된다.
- 시작일만 선택된 상태에서는 hover 날짜까지 preview 범위가 표시된다.
- 현재 구현에서 range 모드는 개별 날짜 비활성 함수보다 선택 가능 기간 제한을 중심으로 동작한다. 특정 기간 외 선택을 막으려면 `selectableStartDate`, `selectableEndDate`를 우선 사용한다.

## 스타일 슬롯

- `rangeStartDay`: 시작일 content
- `rangeEndDay`: 종료일 content
- `rangeInsideDay`: 확정된 기간 내부 날짜 content
- `rangePreviewDay`: hover preview 날짜 content
- `rangeSingleDay`: 시작일과 종료일이 같은 날짜 content

## LLM 구현 체크리스트

- range UI는 `selectionMode="range"`를 반드시 지정한다.
- 선택 중 상태를 UI에 보여주려면 `onRangeDraftChange`를 사용한다.
- 확정된 기간으로 검색/API 호출을 하려면 `onRangeSelect` 또는 `DatePicker`의 `onRangeChange`를 사용한다.
- 텍스트 input 형태의 기간 선택이 필요하면 `DatePicker range`를 사용한다.
