# @mycrm-ui/react-table LLM 가이드

## 10. 행 상단 고정

이 문서는 `@mycrm-ui/react-table`에서 flat table 행을 상단에 고정하는 행 상단 고정 기능을 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 특정 행을 우클릭해서 상단 고정하고, 스크롤 중에도 중요한 행을 계속 보이게 유지하고 싶을 때 사용합니다.

## 목적

행 상단 고정 파트의 목적은 `rowPinning` 상태를 테이블 외부에서 제어하고, 우클릭 컨텍스트 메뉴를 통해 pin/unpin 흐름을 연결하는 것입니다.

v1 기준 규칙:

- 행 상단 고정은 flat table에서만 지원합니다.
- `expand`가 활성화된 트리 테이블에서는 사용하지 않습니다.
- pin된 행은 본문에서 중복 렌더링되지 않고 상단 영역으로 이동합니다.

## 필수 입력

### `enabled`

기능 사용 여부입니다.

```tsx
rowPinning={{
  enabled: true,
}}
```

### `keys`

현재 상단 고정된 row key 목록입니다.

```tsx
const [pinnedKeys, setPinnedKeys] = useState<string[]>([]);

rowPinning={{
  enabled: true,
  keys: pinnedKeys,
  onKeysChange: setPinnedKeys,
}}
```

### `onKeysChange`

pin/unpin 결과를 반영하는 변경 핸들러입니다.

중요 규칙:

- 내부 상태를 기대하지 말고 controlled state로 연결합니다.
- `rowKey`가 반환하는 문자열과 `keys`의 값 형식을 일치시킵니다.

## 최소 동작 패턴

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Ticket {
  id: number;
  customer: string;
  owner: string;
}

const columns: ColumnDef<Ticket>[] = [
  { key: "customer", label: "고객", render: (row) => row.customer },
  { key: "owner", label: "담당자", render: (row) => row.owner },
];

const data: Ticket[] = [
  { id: 101, customer: "네오커머스", owner: "김하늘" },
  { id: 102, customer: "미래물산", owner: "박서준" },
];

export default function TicketTable() {
  const [pinnedKeys, setPinnedKeys] = useState<string[]>([]);

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      rowPinning={{
        enabled: true,
        keys: pinnedKeys,
        onKeysChange: setPinnedKeys,
      }}
    />
  );
}
```

## 선택 입력

### `menuLabels`

우클릭 컨텍스트 메뉴 문구를 바꿔야 할 때 사용합니다.

```tsx
rowPinning={{
  enabled: true,
  keys: pinnedKeys,
  onKeysChange: setPinnedKeys,
  menuLabels: {
    pin: "행 고정",
    unpin: "행 고정 해제",
  },
}}
```

### `pinnedClassName`

고정 행에 별도 스타일을 주고 싶을 때 사용합니다.

```tsx
rowPinning={{
  enabled: true,
  keys: pinnedKeys,
  onKeysChange: setPinnedKeys,
  pinnedClassName: "bg-yellow-50",
}}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "중요한 행을 위에 고정하고 싶어"
- "우클릭 메뉴로 행 고정 기능을 넣어줘"
- "스크롤 내려도 특정 고객 row를 계속 보여줘"

이 경우 LLM은 아래 순서로 처리합니다.

1. 대상이 flat table인지 먼저 판단합니다.
2. `rowKey`가 안정적인 문자열을 반환하는지 확인합니다.
3. `pinnedKeys` 상태를 분리합니다.
4. `rowPinning.enabled`, `keys`, `onKeysChange`를 연결합니다.
5. 필요하면 `menuLabels`, `pinnedClassName`을 추가합니다.

## 이 파트에서 추가해도 되는 것

- `tooltip`
- `copyable`
- `selection`
- `sorting`
- `filter`
- `columnManager`

즉, 행 상단 고정은 일반적인 flat table 기능들과 함께 조합해도 됩니다.

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 설명하지 않습니다.

- `expand`
- 그룹 row pinning
- tree table leaf pinning
- 서버 영속 저장
- drag-and-drop 기반 pin 순서 재정렬

## 자주 하는 실수

### 실수 1. `keys`는 주지만 `onKeysChange`를 연결하지 않음

문제점:

- 메뉴는 보여도 실제 pin/unpin이 동작하지 않습니다.

### 실수 2. `rowKey`와 `keys`의 값 형식이 다름

문제점:

- pin된 행이 찾히지 않거나 메뉴 상태가 어긋납니다.

좋은 방식:

- 둘 다 문자열 기준으로 통일합니다.

### 실수 3. 트리 테이블에도 그대로 적용하려고 함

문제점:

- v1 정책과 다르며 UX와 렌더링 규칙이 불분명해집니다.

좋은 방식:

- `expand`가 있는 경우는 별도 기능으로 분리합니다.

## LLM 안전 출력 템플릿

행 상단 고정 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

```tsx
const [pinnedKeys, setPinnedKeys] = useState<string[]>([]);

<Table
  columns={columns}
  data={rows}
  rowKey={(row) => String(row.id)}
  rowPinning={{
    enabled: true,
    keys: pinnedKeys,
    onKeysChange: setPinnedKeys,
  }}
/>
```

## 다음 가이드로 넘어가야 하는 조건

아래 조건이면 다른 가이드를 함께 확인합니다.

- 컬럼 숨김/고정/리사이즈도 같이 필요함
  - `column-manager-llm-guide.md`
- 가상 스크롤과 무한 로딩이 같이 필요함
  - `virtual-scroll-llm-guide.md`
- 툴팁/우클릭 복사 메뉴도 같이 설계해야 함
  - `tooltip-copy-llm-guide.md`
