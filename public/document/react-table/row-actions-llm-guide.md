# @mycrm-ui/react-table LLM 가이드

## 5. 행 삭제 / 추가

이 문서는 `@mycrm-ui/react-table`에서 행 삭제나 신규 행 추가 기능이 필요한 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 각 행을 삭제해야 하거나, 상단 버튼으로 새 행 입력을 시작해야 하거나, 체크박스 선택과 조합해서 일괄 삭제를 구현해야 할 때 사용합니다.

## 목적

행 삭제 / 추가 파트의 목적은 아래 관계를 정확히 맞추는 것입니다.

- `rowActions.deletable`
- `rowActions.adding`
- 컬럼별 `insertable: true`

LLM은 삭제 버튼만 보이게 하거나 추가 행만 띄우는 수준에서 멈추지 말고, 실제 데이터 상태 갱신과 입력 가능 컬럼 범위까지 함께 설계해야 합니다.

## 필수 입력

### `rowActions.deletable`

각 행에 삭제 액션을 표시하려면 `deletable: true`를 설정합니다.

예시:

```tsx
rowActions={{
  deletable: true,
  onDelete: (rowKey) => {
    setData((prev) => prev.filter((row) => String(row.id) !== rowKey));
  },
}}
```

`deletable: true`만 넣고 `onDelete`를 빠뜨리면 실제 삭제 동작이 완결되지 않습니다.

### `rowActions.adding`

추가 입력 행을 표시할지 여부를 제어합니다.

예시:

```tsx
const [isAdding, setIsAdding] = useState(false);

rowActions={{
  adding: isAdding,
  onAdd: handleAdd,
  onAddCancel: () => setIsAdding(false),
}}
```

### 컬럼의 `insertable: true`

행 추가 시 입력 필드를 렌더링할 컬럼에는 반드시 `insertable: true`가 필요합니다.

예시:

```tsx
const columns: ColumnDef<User>[] = [
  {
    key: "name",
    label: "이름",
    insertable: true,
    render: (row) => row.name,
  },
  {
    key: "email",
    label: "이메일",
    insertable: true,
    render: (row) => row.email,
  },
];
```

이 속성이 없으면 `adding: true`를 켜도 해당 컬럼에 입력 UI가 나오지 않습니다.

### `renderInsertCell`

기본 입력 UI 대신 컬럼별 커스텀 입력 UI가 필요하면 `renderInsertCell`을 사용합니다.

예시:

```tsx
renderInsertCell: ({ value, onChange, onConfirm }) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") onConfirm();
    }}
  />
)
```

## 최소 동작 패턴

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: ColumnDef<User>[] = [
  {
    key: "name",
    label: "이름",
    insertable: true,
    render: (row) => row.name,
  },
  {
    key: "email",
    label: "이메일",
    insertable: true,
    render: (row) => row.email,
  },
];

export default function UserTable() {
  const [rows, setRows] = useState<User[]>([]);
  const [nextId, setNextId] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      rowActions={{
        deletable: true,
        onDelete: (rowKey) => {
          setRows((prev) => prev.filter((row) => String(row.id) !== rowKey));
        },
        adding: isAdding,
        onAdd: (values) => {
          setRows((prev) => [
            ...prev,
            {
              id: nextId,
              name: values.name,
              email: values.email,
            },
          ]);
          setNextId((prev) => prev + 1);
          setIsAdding(false);
        },
        onAddCancel: () => {
          setIsAdding(false);
        },
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "행 삭제 버튼을 넣어줘"
- "상단에서 새 항목을 추가할 수 있어야 해"
- "입력 행을 테이블 안에서 바로 보여줘"
- "선택한 행을 일괄 삭제하고 싶어"

이 경우 LLM은 아래 순서로 처리합니다.

1. 삭제만 필요한지, 추가만 필요한지, 둘 다 필요한지 판단합니다.
2. 삭제라면 `deletable`과 `onDelete`를 연결합니다.
3. 추가라면 `adding`, `onAdd`, `onAddCancel`을 설계합니다.
4. 입력이 필요한 컬럼에만 `insertable: true`를 넣습니다.
5. 기본 입력 UI로 충분한지, `renderInsertCell`이 필요한지 판단합니다.
6. 유효성 검증이 있으면 `onAdd` 안에서 처리합니다.

## 이 파트에서 추가해도 되는 것

- 선택 행 기반 일괄 삭제
- 추가 버튼과 취소 버튼
- 입력 유효성 검증
- `renderInsertCell`을 통한 컬럼별 커스텀 입력 UI
- `addRow`, `addInput`, `addConfirmBtn`, `addCancelBtn` 스타일 커스터마이징

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `filter`
- `editing`
- `loading`
- `scroll`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. `adding: true`만 넣고 컬럼에 `insertable: true`를 안 넣음

문제점:

- 추가 행이 열려도 실제 입력 필드가 기대대로 나오지 않습니다.

좋은 방식:

- 신규 입력을 받아야 하는 컬럼마다 `insertable: true`를 넣습니다.

### 실수 2. `onAdd`에서 새 row의 고유 키를 만들지 않음

문제점:

- 추가된 행이 기존 데이터와 충돌하거나 렌더링 안정성이 깨질 수 있습니다.

좋은 방식:

- `nextId` 같은 안정적인 증가값이나 실제 고유 ID를 사용합니다.

### 실수 3. 삭제 후 선택 상태를 정리하지 않음

문제점:

- 이미 지워진 rowKey가 `selectedKeys`에 남을 수 있습니다.

좋은 방식:

- 삭제 시 선택 상태도 함께 정리합니다.

### 실수 4. 유효성 검증이 필요한데 `onAdd`를 바로 성공 처리

문제점:

- 빈 값이나 잘못된 형식의 값이 그대로 추가됩니다.

좋은 방식:

- `onAdd` 안에서 필수값, 형식, 선택값을 검증합니다.
- 오류가 있으면 추가를 중단하고 메시지를 표시합니다.

## LLM 안전 출력 템플릿

행 삭제 / 추가 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Row {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [
  {
    key: "name",
    label: "이름",
    insertable: true,
    render: (row) => row.name,
  },
];

export default function ExampleTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [nextId, setNextId] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      rowActions={{
        deletable: true,
        onDelete: (rowKey) => {
          setRows((prev) => prev.filter((row) => String(row.id) !== rowKey));
        },
        adding: isAdding,
        onAdd: (values) => {
          setRows((prev) => [
            ...prev,
            { id: nextId, name: values.name },
          ]);
          setNextId((prev) => prev + 1);
          setIsAdding(false);
        },
        onAddCancel: () => setIsAdding(false),
      }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 추가된 행을 바로 인라인 편집해야 함
- 삭제와 로딩/빈 상태를 함께 다뤄야 함
- 추가 행이 가상 스크롤이나 확장 행과 함께 동작해야 함
- 컬럼 관리와 함께 입력 필드 노출 조건을 제어해야 함
