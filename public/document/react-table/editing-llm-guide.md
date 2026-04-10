# @mycrm-ui/react-table LLM 가이드

## 6. 인라인 편집

이 문서는 `@mycrm-ui/react-table`에서 셀 단위 인라인 편집 기능이 필요한 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 테이블 셀을 클릭해 바로 값을 수정해야 하거나, 저장 전 유효성 검증이 필요하거나, 컬럼별로 다른 편집 UI를 써야 할 때 사용합니다.

## 목적

인라인 편집 파트의 목적은 아래 세 층위를 정확히 분리하는 것입니다.

- 컬럼별 편집 가능 여부
- 편집 저장 시 데이터 갱신
- 공통 편집 UI와 컬럼별 커스텀 편집 UI 우선순위

LLM은 단순히 `editable: true`만 추가하는 데서 멈추지 말고, 값 저장 흐름과 검증 실패 UI까지 함께 설계해야 합니다.

## 필수 입력

### `editable: true`

편집 가능한 컬럼에는 반드시 `editable: true`를 설정합니다.

예시:

```tsx
const columns: ColumnDef<User>[] = [
  {
    key: "name",
    label: "이름",
    editable: true,
    render: (row) => row.name,
  },
];
```

### `validate`

저장 전 유효성 검증이 필요하면 컬럼 단위로 `validate`를 정의합니다.

예시:

```tsx
validate: (value) => (value.trim() ? null : "이름은 필수입니다.")
```

반환 규칙:

- 성공이면 `null`
- 실패면 에러 문자열

### `editing.onCellChange`

편집 완료 시 실제 데이터 상태를 갱신합니다.

예시:

```tsx
editing={{
  onCellChange: (rowKey, colKey, value) => {
    setData((prev) =>
      prev.map((row) =>
        String(row.id) === rowKey
          ? { ...row, [colKey]: value }
          : row,
      ),
    );
  },
}}
```

### `editing.renderCell`

모든 editable 컬럼에 공통으로 적용할 편집 UI를 지정합니다.

예시:

```tsx
editing={{
  onCellChange: handleCellChange,
  renderCell: renderEditCellUI,
}}
```

### `renderEditCell`

특정 컬럼만 별도 편집 UI를 써야 하면 컬럼 단위 `renderEditCell`을 사용합니다.

예시:

```tsx
{
  key: "role",
  label: "역할",
  editable: true,
  renderEditCell: ({ value, onChange, onSave, onCancel }) => (
    <select value={value} onChange={(e) => onChange(e.target.value)} />
  ),
}
```

중요 규칙:

- `renderEditCell`은 `editing.renderCell`보다 우선합니다.

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
    editable: true,
    render: (row) => row.name,
    validate: (value) => (value.trim() ? null : "이름은 필수입니다."),
  },
  {
    key: "email",
    label: "이메일",
    editable: true,
    render: (row) => row.email,
  },
];

export default function UserTable({ rows }: { rows: User[] }) {
  const [data, setData] = useState(rows);

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      editing={{
        onCellChange: (rowKey, colKey, value) => {
          setData((prev) =>
            prev.map((row) =>
              String(row.id) === rowKey
                ? { ...row, [colKey]: value }
                : row,
            ),
          );
        },
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "셀 클릭으로 바로 수정되게 해줘"
- "이름과 이메일을 테이블 안에서 편집하고 싶어"
- "저장 전에 값 검증이 필요해"
- "역할 컬럼은 input 말고 select로 편집하고 싶어"

이 경우 LLM은 아래 순서로 처리합니다.

1. 어떤 컬럼이 편집 가능해야 하는지 정합니다.
2. 해당 컬럼에 `editable: true`를 추가합니다.
3. 유효성 검증이 필요하면 `validate`를 추가합니다.
4. `editing.onCellChange`로 실제 데이터 상태를 갱신합니다.
5. 공통 편집 UI가 필요하면 `editing.renderCell`을 사용합니다.
6. 특정 컬럼만 다른 UI가 필요하면 `renderEditCell`을 추가합니다.

## 이 파트에서 추가해도 되는 것

- 편집 시작 아이콘
- 공통 입력 UI
- 컬럼별 select, textarea 등 커스텀 편집 UI
- 검증 에러 메시지 표시
- 편집 로그 표시

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `filter`
- `rowActions`
- `loading`
- `scroll`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. `editable: true`만 넣고 저장 상태 갱신을 연결하지 않음

문제점:

- 편집 UI는 열리지만 실제 데이터가 바뀌지 않습니다.

좋은 방식:

- `editing.onCellChange`로 상태를 갱신합니다.

### 실수 2. `validate`를 쓰면서 에러 UI 흐름을 고려하지 않음

문제점:

- 저장 실패는 발생하지만 사용자가 왜 실패했는지 보기 어렵습니다.

좋은 방식:

- `renderCell`에서 `error` prop을 받아 메시지를 표시합니다.

### 실수 3. `onValidationError`를 추가하면서 inline error UI를 기대함

문제점:

- `onValidationError`를 설정하면 `error` prop이 `renderCell`로 전달되지 않아 inline error 표시가 끊길 수 있습니다.

좋은 방식:

- inline error UI가 필요하면 `onValidationError`를 설정하지 않습니다.

### 실수 4. `renderEditCell`과 `editing.renderCell` 우선순위를 잘못 이해함

문제점:

- 특정 컬럼에 공통 UI가 적용될 거라고 생각했는데 실제로는 개별 UI가 우선 적용됩니다.

좋은 방식:

- 컬럼별 `renderEditCell`이 공통 `editing.renderCell`보다 우선한다고 전제합니다.

## LLM 안전 출력 템플릿

인라인 편집 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

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
    editable: true,
    render: (row) => row.name,
    validate: (value) => (value.trim() ? null : "필수 항목입니다."),
  },
];

export default function ExampleTable({ rows }: { rows: Row[] }) {
  const [data, setData] = useState(rows);

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      editing={{
        onCellChange: (rowKey, colKey, value) => {
          setData((prev) =>
            prev.map((row) =>
              String(row.id) === rowKey
                ? { ...row, [colKey]: value }
                : row,
            ),
          );
        },
      }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 편집과 로딩/빈 상태를 함께 다뤄야 함
- 편집 중 가상 스크롤을 써야 함
- 편집 가능한 컬럼을 동적으로 관리해야 함
- 편집과 확장 행 또는 툴팁/복사를 함께 써야 함
