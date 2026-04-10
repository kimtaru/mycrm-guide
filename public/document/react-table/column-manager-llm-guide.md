# @mycrm-ui/react-table LLM 가이드

## 9. 컬럼 관리

이 문서는 `@mycrm-ui/react-table`에서 컬럼 숨김, 순서 변경, 고정(pin), 리사이즈를 제어하는 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 표시 컬럼을 선택해야 하거나, 컬럼 순서를 바꿔야 하거나, 특정 컬럼을 좌우에 고정해야 하거나, 폭을 조절할 수 있어야 할 때 사용합니다.

## 목적

컬럼 관리 파트의 목적은 `columnManager` 안의 상태들을 서로 다른 책임으로 구분하는 것입니다.

- `hiddenKeys`
- `order`
- `pinned`
- `widths`

LLM은 이 값들을 하나의 복잡한 객체로 뭉뚱그리지 말고, 기능별 상태와 변경 핸들러를 분리해서 연결해야 합니다.

## 필수 입력

### `hiddenKeys`

숨길 컬럼 키 목록입니다.

예시:

```tsx
const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

columnManager={{
  hiddenKeys,
  onHiddenKeysChange: setHiddenKeys,
}}
```

### `order`

컬럼 표시 순서를 제어합니다.

예시:

```tsx
const [order, setOrder] = useState<string[]>([]);

columnManager={{
  order,
  onOrderChange: setOrder,
}}
```

### `pinned`

좌우 고정 컬럼 키를 관리합니다.

예시:

```tsx
const [pinned, setPinned] = useState<{ left?: string[]; right?: string[] }>({});

columnManager={{
  pinned,
  onPinnedChange: setPinned,
}}
```

### `resizable`와 `widths`

컬럼 리사이즈가 필요하면 `resizable: true`와 폭 상태를 함께 둡니다.

예시:

```tsx
const [widths, setWidths] = useState<Record<string, number>>({});

columnManager={{
  resizable: true,
  widths,
  onWidthChange: (colKey, width) =>
    setWidths((prev) => ({ ...prev, [colKey]: width })),
}}
```

### `headerMenuIcon`

컬럼 관리 UI 진입점을 헤더 메뉴로 제공하려면 `headerMenuIcon`을 함께 둡니다.

중요 규칙:

- `columnManager`를 설정하면 헤더 메뉴에 `컬럼 관리` 항목이 자동 추가됩니다.

## 최소 동작 패턴

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Employee {
  id: number;
  name: string;
  email: string;
}

const columns: ColumnDef<Employee>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
];

export default function EmployeeTable({ rows }: { rows: Employee[] }) {
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [pinned, setPinned] = useState<{ left?: string[]; right?: string[] }>({});
  const [widths, setWidths] = useState<Record<string, number>>({});

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      columnManager={{
        hiddenKeys,
        onHiddenKeysChange: setHiddenKeys,
        order,
        onOrderChange: setOrder,
        pinned,
        onPinnedChange: setPinned,
        resizable: true,
        widths,
        onWidthChange: (colKey, width) =>
          setWidths((prev) => ({ ...prev, [colKey]: width })),
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "사용자가 컬럼을 숨기고 보이게 할 수 있어야 해"
- "컬럼 순서를 바꾸고 싶어"
- "이름 컬럼을 왼쪽에 고정해줘"
- "컬럼 폭을 드래그로 조절하고 싶어"

이 경우 LLM은 아래 순서로 처리합니다.

1. 어떤 컬럼 관리 기능이 필요한지 판단합니다.
2. 숨김이 필요하면 `hiddenKeys`를 연결합니다.
3. 순서 변경이 필요하면 `order`를 연결합니다.
4. 고정이 필요하면 `pinned`를 연결합니다.
5. 리사이즈가 필요하면 `resizable`, `widths`, `onWidthChange`를 추가합니다.
6. 사용자가 UI 진입점을 직접 다루길 원하면 `headerMenuIcon`까지 구성합니다.

## 이 파트에서 추가해도 되는 것

- `pinnedBg`
- 컬럼 관리 모달 스타일 커스터마이징
- 헤더 메뉴 버튼 스타일 커스터마이징
- 전체 초기화 버튼
- 현재 상태 요약 UI

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `filter`
- `editing`
- `rowActions`
- `expand`

## 자주 하는 실수

### 실수 1. `columnManager`는 넣었지만 상태를 하나도 연결하지 않음

문제점:

- UI는 떠도 실제 숨김/순서/고정/폭 변경 결과가 유지되지 않습니다.

좋은 방식:

- 필요한 상태와 대응 핸들러를 함께 연결합니다.

### 실수 2. `pinned` 구조를 배열 하나로만 관리

문제점:

- 좌측 고정과 우측 고정을 구분할 수 없습니다.

좋은 방식:

- `{ left?: string[]; right?: string[] }` 구조를 사용합니다.

### 실수 3. 리사이즈 기능인데 `widths` 상태를 저장하지 않음

문제점:

- 사용자가 폭을 바꿔도 반영이 유지되지 않습니다.

좋은 방식:

- `widths`와 `onWidthChange`를 함께 연결합니다.

### 실수 4. 헤더 메뉴 없이 컬럼 관리 진입 경로를 설명하지 않음

문제점:

- 사용자가 컬럼 관리 기능을 어떻게 여는지 알기 어렵습니다.

좋은 방식:

- `headerMenuIcon`을 같이 제공하거나, 별도 버튼 진입점을 명시합니다.

## LLM 안전 출력 템플릿

컬럼 관리 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Row {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
];

export default function ExampleTable({ rows }: { rows: Row[] }) {
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [pinned, setPinned] = useState<{ left?: string[]; right?: string[] }>({});

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      columnManager={{
        hiddenKeys,
        onHiddenKeysChange: setHiddenKeys,
        order,
        onOrderChange: setOrder,
        pinned,
        onPinnedChange: setPinned,
      }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 확장 행과 컬럼 관리를 함께 써야 함
- 클릭/키보드 내비게이션을 같이 다뤄야 함
- 컬럼 관리와 툴팁/복사, 헤더 메뉴를 함께 설계해야 함
- CSS 슬롯 커스터마이징을 자세히 다뤄야 함
