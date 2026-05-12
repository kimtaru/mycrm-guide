# @mycrm-ui/react-table LLM 가이드

## 행 순서 변경

이 문서는 `@mycrm-ui/react-table`에서 flat table 행을 드래그앤드롭으로 재정렬하는 기능을 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 "행 순서를 바꾸고 싶다", "순서 변경 컬럼을 드래그 핸들로 쓰고 싶다", "드래그앤드롭으로 목록 우선순위를 조정하고 싶다"고 요청할 때 사용합니다.

## 목적

행 순서 변경의 목적은 `rowReorder` 옵션으로 드래그 가능한 핸들 컬럼을 지정하고, 변경된 row key 순서를 외부 상태에 반영하는 것입니다.

v1 기준 규칙:

- 행 순서 변경은 flat table에서 사용합니다.
- `rowKey`는 안정적인 문자열을 반환해야 합니다.
- 테이블 내부가 데이터를 직접 바꾸지 않습니다. `onOrderChange`에서 소비자가 `data` 배열을 재정렬해야 합니다.
- `expand` 또는 `rowPinning`과 동시에 사용하지 않습니다.

## 필수 입력

### `handleColumnKey`

드래그 핸들로 사용할 컬럼의 key입니다.

```tsx
const columns: ColumnDef<Row>[] = [
  { key: "reorder", label: "순서", render: () => "⋮⋮" },
  { key: "name", label: "이름", render: (row) => row.name },
];
```

```tsx
rowReorder={{
  enabled: true,
  handleColumnKey: "reorder",
  onOrderChange: handleOrderChange,
}}
```

### `onOrderChange`

드롭 후 변경된 row key 순서를 받는 콜백입니다.

중요 규칙:

- 콜백 인자는 `rowKey`가 반환한 문자열 배열입니다.
- 이 배열을 기준으로 기존 `data`를 재정렬합니다.
- 없는 key는 방어적으로 제외합니다.

## 최소 동작 패턴

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Task {
  id: number;
  title: string;
  owner: string;
}

const columns: ColumnDef<Task>[] = [
  {
    key: "reorder",
    label: "순서",
    width: "64px",
    align: "center",
    render: () => "⋮⋮",
  },
  { key: "title", label: "업무", render: (row) => row.title },
  { key: "owner", label: "담당자", render: (row) => row.owner },
];

const initialRows: Task[] = [
  { id: 1, title: "계약 검토", owner: "김하늘" },
  { id: 2, title: "견적 발송", owner: "박서준" },
  { id: 3, title: "후속 미팅", owner: "이유진" },
];

export default function TaskTable() {
  const [rows, setRows] = useState(initialRows);

  const handleOrderChange = (order: string[]) => {
    setRows((prev) => {
      const rowMap = new Map(prev.map((row) => [String(row.id), row]));
      return order
        .map((key) => rowMap.get(key))
        .filter((row): row is Task => row !== undefined);
    });
  };

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      rowReorder={{
        enabled: true,
        handleColumnKey: "reorder",
        onOrderChange: handleOrderChange,
      }}
    />
  );
}
```

## 선택 입력

### `dragOverColor`

드래그 중 삽입 위치 표시 색상을 바꾸고 싶을 때 사용합니다.

```tsx
rowReorder={{
  enabled: true,
  handleColumnKey: "reorder",
  onOrderChange: handleOrderChange,
  dragOverColor: "rgba(79, 70, 229, 0.8)",
}}
```

### `classNames`

행 순서 변경 상태를 스타일링할 수 있습니다.

```tsx
classNames={{
  trDragging: "opacity-50",
  trDragOver: "bg-primary/5",
  tdRowDragHandle: "cursor-grab active:cursor-grabbing",
}}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "행 순서를 드래그해서 바꾸고 싶어"
- "순서 변경 컬럼을 잡고 row를 이동하게 해줘"
- "우선순위 목록을 드래그앤드롭으로 정렬하고 싶어"

이 경우 LLM은 아래 순서로 처리합니다.

1. 대상이 flat table인지 확인합니다.
2. 안정적인 `rowKey`를 사용합니다.
3. 드래그 핸들 전용 컬럼을 추가합니다.
4. `rowReorder.enabled`, `handleColumnKey`, `onOrderChange`를 연결합니다.
5. `onOrderChange`에서 `data` 상태를 재정렬합니다.
6. 필요하면 `tdRowDragHandle`, `trDragging`, `trDragOver` 스타일을 추가합니다.

## 이 파트에서 추가해도 되는 것

- `selection`
- `editing`
- `rowActions`
- `tooltip`
- `copyable`
- 기본적인 `classNames`

단, 여러 상호작용이 있을 때는 드래그 핸들 컬럼에서만 드래그가 시작되도록 구성합니다.

## 이 파트에서 주의할 것

- `expand`와 함께 사용하지 않습니다.
- `rowPinning`과 함께 사용하지 않습니다.
- 정렬이나 필터가 켜진 상태에서는 화면 순서와 원본 데이터 순서의 의미가 달라질 수 있습니다.
- 서버 저장이 필요하다면 `onOrderChange` 이후 별도 저장 API를 호출합니다.

## 자주 하는 실수

### 실수 1. `onOrderChange`에서 상태를 바꾸지 않음

문제점:

- 드롭 이벤트는 발생하지만 화면 순서가 돌아옵니다.

좋은 방식:

- 전달받은 key 배열로 `data` 상태를 즉시 재정렬합니다.

### 실수 2. 배열 index를 `rowKey`로 사용함

문제점:

- 순서 변경 후 key가 함께 바뀌어 React 렌더링과 DnD 결과가 불안정해집니다.

좋은 방식:

- 실제 도메인 ID를 문자열로 변환해서 사용합니다.

### 실수 3. 모든 셀을 드래그 가능하게 만들려고 함

문제점:

- 클릭, 편집, 선택, 컨텍스트 메뉴와 충돌합니다.

좋은 방식:

- `handleColumnKey`로 지정한 전용 컬럼만 드래그 핸들로 사용합니다.
