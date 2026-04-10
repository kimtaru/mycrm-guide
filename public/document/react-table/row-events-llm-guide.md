# @mycrm-ui/react-table LLM 가이드

## 11. 행 클릭 / 키보드 내비게이션

이 문서는 `@mycrm-ui/react-table`에서 행 클릭, 더블클릭, 키보드 포커스 이동, Enter 기반 편집 진입 같은 상호작용을 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 행 클릭 이벤트를 받아야 하거나, 키보드 화살표로 셀 포커스를 이동해야 하거나, 포커스된 셀에서 Enter로 편집을 시작해야 할 때 사용합니다.

## 목적

행 클릭 / 키보드 내비게이션 파트의 목적은 아래 두 흐름을 분리해서 다루는 것입니다.

- 행 상호작용: 클릭, 더블클릭
- 셀 포커스 이동: 키보드 내비게이션, 포커스 셀 추적

LLM은 마우스 이벤트와 키보드 이벤트를 같은 것으로 취급하지 말고, 각각 어떤 상태와 콜백을 써야 하는지 명확히 나눠야 합니다.

## 필수 입력

### `onRowClick`

행 클릭 시 호출됩니다.

예시:

```tsx
onRowClick={(row, rowKey) => {
  console.log("클릭:", row.name, rowKey);
}}
```

### `onRowDoubleClick`

행 더블클릭 시 호출됩니다.

예시:

```tsx
onRowDoubleClick={(row, rowKey) => {
  console.log("더블클릭:", row.name, rowKey);
}}
```

### `keyboardNavigation`

키보드 셀 이동을 켜려면 `true`로 설정합니다.

예시:

```tsx
keyboardNavigation={true}
```

이 옵션이 켜지면 보통 화살표 키로 포커스 셀을 이동할 수 있습니다.

### `onFocusedCellChange`

현재 포커스된 셀 정보를 추적합니다.

예시:

```tsx
const [focusedCell, setFocusedCell] = useState<{
  rowKey: string;
  colKey: string;
} | null>(null);

onFocusedCellChange={(cell) => {
  setFocusedCell(cell);
}}
```

### `rowKey`

클릭, 포커스, 편집 연동은 모두 안정적인 `rowKey`에 의존합니다.

예시:

```tsx
rowKey={(row) => String(row.id)}
```

## 최소 동작 패턴

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Employee {
  id: number;
  name: string;
  role: string;
}

const columns: ColumnDef<Employee>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "role", label: "직책", render: (row) => row.role },
];

export default function EmployeeTable({ rows }: { rows: Employee[] }) {
  const [focusedCell, setFocusedCell] = useState<{
    rowKey: string;
    colKey: string;
  } | null>(null);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      onRowClick={(row, rowKey) => {
        console.log("click", rowKey, row.name);
      }}
      onRowDoubleClick={(row, rowKey) => {
        console.log("dblclick", rowKey, row.name);
      }}
      keyboardNavigation={true}
      onFocusedCellChange={setFocusedCell}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "행 클릭 이벤트를 받고 싶어"
- "더블클릭하면 상세 화면으로 보내고 싶어"
- "키보드로 셀 이동이 가능해야 해"
- "포커스된 셀 정보를 상태로 알고 싶어"
- "Enter로 편집 시작되게 해줘"

이 경우 LLM은 아래 순서로 처리합니다.

1. 클릭만 필요한지, 더블클릭도 필요한지 구분합니다.
2. `rowKey`를 안정적으로 정의합니다.
3. `onRowClick`, `onRowDoubleClick`을 연결합니다.
4. 키보드 이동이 필요하면 `keyboardNavigation={true}`를 추가합니다.
5. 포커스 추적이 필요하면 `onFocusedCellChange`와 상태를 연결합니다.
6. Enter로 편집까지 필요하면 editable 컬럼과 `editing`을 함께 연결합니다.

## 이 파트에서 추가해도 되는 것

- 이벤트 로그 UI
- 포커스 셀 표시
- 클릭 가능한 행 스타일
- 팀장 행 강조 등 `rowClassName`
- 키보드 이동과 편집의 결합

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `filter`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. `keyboardNavigation` 없이 포커스 셀 상태만 기대

문제점:

- 키보드 이동이 켜지지 않아 `onFocusedCellChange` 흐름이 기대와 다를 수 있습니다.

좋은 방식:

- 키보드 포커스 이동이 필요하면 `keyboardNavigation={true}`를 함께 설정합니다.

### 실수 2. `rowKey`가 불안정함

문제점:

- 클릭 이벤트 로그, 포커스 셀 추적, 편집 저장 대상이 꼬일 수 있습니다.

좋은 방식:

- 항상 안정적인 ID 기반 `rowKey`를 사용합니다.

### 실수 3. 클릭 이벤트와 편집 이벤트를 구분하지 않음

문제점:

- 클릭은 행 수준 상호작용인데, 편집은 셀 수준 상호작용이라 의도가 섞일 수 있습니다.

좋은 방식:

- 행 클릭은 `onRowClick`
- 셀 편집은 `editable`, `editing`

으로 분리합니다.

### 실수 4. 포커스 상태만 저장하고 실제 행 정보를 다시 찾지 않음

문제점:

- 로그나 UI에 사용자 친화적인 정보를 보여주기 어렵습니다.

좋은 방식:

- `rowKey`로 원본 row를 다시 찾아 이름, 컬럼 키 등을 함께 표시합니다.

## LLM 안전 출력 템플릿

행 클릭 / 키보드 내비게이션 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

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
  const [focusedCell, setFocusedCell] = useState<{
    rowKey: string;
    colKey: string;
  } | null>(null);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      onRowClick={(row, rowKey) => {
        console.log(rowKey);
      }}
      keyboardNavigation={true}
      onFocusedCellChange={setFocusedCell}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 툴팁과 복사 액션을 함께 써야 함
- 헤더 메뉴와 이벤트를 같이 설계해야 함
- CSS 슬롯을 통해 hover/focus 스타일을 세밀하게 조정해야 함
