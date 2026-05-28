# @mycrm-ui/components Calendar 추가 지원 기능 LLM 가이드

이 문서는 데모 화면만으로는 놓치기 쉬운 Calendar/DatePicker의 지원 기능을 확인할 때 참고한다.

## 날짜 입력 포맷

Calendar와 DatePicker는 다음 날짜 입력을 파싱한다.

- `Date`
- `yyyyMMdd`
- `yyyy-MM-dd`
- `yyyy.MM.dd`

선택 콜백 반환 포맷은 `dateSelectValueType`으로 정한다.

```tsx
<Calendar
  year={2026}
  month={9}
  selectedDate="20260910"
  dateSelectValueType="yyyy.MM.dd"
  onDateSelect={(date) => {
    // "2026.09.10"
  }}
/>
```

## Controlled hover

`hoveredDate`와 `onHoverDateChange`를 함께 쓰면 hover 상태를 외부에서 제어할 수 있다.

```tsx
<Calendar
  year={2026}
  month={9}
  selectionMode="range"
  hoveredDate={hoveredDate}
  onHoverDateChange={setHoveredDate}
/>
```

range 모드에서는 시작일만 선택된 상태에서 hover 날짜까지 preview 범위가 표시된다.

## 요일 라벨

- `weekdayLabelType="en"`: 기본 영어 요일 라벨
- `weekdayLabelType="ko"`: 기본 한글 요일 라벨
- `weekdayLabels`: 배열 기반 커스텀 라벨
- `weekdayLabelsJson`: `{ sun, mon, tue, wed, thu, fri, sat }` 형태 커스텀 라벨
- `weekStartsOn={0}`: 일요일 시작
- `weekStartsOn={1}`: 월요일 시작

## 접근성

Calendar는 grid 접근성 구조를 제공한다.

- 달력 root는 calendar component 식별 속성을 가진다.
- 날짜 영역은 `role="grid"` 구조를 사용한다.
- 날짜 cell은 선택, 비활성, 현재 날짜 상태를 접근성 속성으로 표현한다.
- pending 상태에서는 busy 상태를 표현한다.

## 키보드 조작

- `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`: 날짜 focus 이동
- `Home`: 현재 행의 시작 날짜로 이동
- `End`: 현재 행의 끝 날짜로 이동
- `Enter`, `Space`: focus된 날짜 선택

pending 상태이거나 비활성 날짜인 경우 선택 동작은 차단된다.

## 여러 Calendar 인스턴스

여러 Calendar를 같은 페이지에 렌더링해도 각 인스턴스의 focus 상태는 독립적으로 관리된다. 한 Calendar의 키보드 focus 이동이 다른 Calendar의 focus 상태를 직접 변경하지 않는다.

## 테스트용 data attribute

날짜 cell에는 테스트에서 특정 날짜를 찾기 위한 data attribute가 제공된다.

```tsx
container.querySelector(
  '[data-mycrm-ui-calendar-date="2026-09-10"]',
);
```

## DatePicker 현재 역할

현재 DatePicker는 pass-through wrapper가 아니다. 다음 기능을 포함한 실제 상위 컴포넌트다.

- trigger button
- Calendar popover
- clear button
- hidden input
- 이전/다음 월 이동
- 연도/월 선택 popover
- single/range/multiple 선택

## Pending UI 정정

현재 pending UI는 skeleton이 아니다.

- dimmed overlay
- 원형 spinner
- 날짜 선택 차단
- focus 상호작용 차단

## LLM 구현 체크리스트

- 날짜 입력은 네 가지 포맷을 모두 고려한다.
- hover preview가 필요한 range UI는 `showHover` 기본값을 유지한다.
- 키보드 접근성을 깨지 않도록 날짜 cell을 외부에서 임의로 제거하지 않는다.
- 테스트 코드는 날짜 텍스트보다 `data-mycrm-ui-calendar-date`를 우선 사용한다.
