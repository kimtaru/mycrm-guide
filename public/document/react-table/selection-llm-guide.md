# @mycrm-ui/react-table LLM 가이드

## 3. 체크박스 선택

이 문서는 `@mycrm-ui/react-table`에서 체크박스 기반 행 선택 기능이 필요한 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 여러 행을 선택해야 하거나, 선택된 행 ID 목록을 상태로 관리해야 하거나, 헤더 체크박스로 전체 선택/해제가 필요할 때 사용합니다.

## 목적

체크박스 선택 파트의 목적은 아래 3가지를 정확히 연결하는 것입니다.

- 안정적인 `rowKey`
- 선택 상태 배열 `keys`
- `selection` prop

LLM은 체크박스 UI만 추가하는 것이 아니라, 어떤 값이 선택 상태로 저장되는지까지 일관되게 맞춰야 합니다.

## 필수 입력

### `rowKey`

선택 기능은 각 행의 고유 키를 기준으로 동작합니다.

규칙:

- 항상 고유하고 안정적인 값을 사용합니다.
- 가능하면 실제 도메인 ID를 문자열로 변환해서 사용합니다.

권장 예시:

```tsx
rowKey={(row) => String(row.id)}
```

### `selection.enabled`

체크박스 선택 UI를 활성화하려면 `enabled: true`가 필요합니다.

예시:

```tsx
selection={{ enabled: true }}
```

### `keys`

현재 선택된 행 키 목록입니다.

예시:

```tsx
const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
```

### `onChange`

선택 상태가 바뀔 때 `keys`를 갱신합니다.

예시:

```tsx
selection={{
  enabled: true,
  keys: selectedKeys,
  onChange: setSelectedKeys,
}}
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
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
];

export default function UserTable({ rows }: { rows: User[] }) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      selection={{
        enabled: true,
        keys: selectedKeys,
        onChange: setSelectedKeys,
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "행 앞에 체크박스를 넣어줘"
- "여러 개를 선택할 수 있어야 해"
- "선택한 항목 ID 목록이 필요해"
- "헤더 체크박스로 전체 선택되게 해줘"

이 경우 LLM은 아래 순서로 처리합니다.

1. 선택 기준이 되는 고유 키를 정합니다.
2. `rowKey`를 안정적으로 설정합니다.
3. `string[]` 형태의 선택 상태를 선언합니다.
4. `selection.enabled`, `selection.keys`, `selection.onChange`를 연결합니다.
5. 필요하면 선택된 키 목록을 후속 UI나 액션에서 사용합니다.

## 이 파트에서 추가해도 되는 것

- 선택 상태 표시용 요약 UI
- 선택된 개수 표시
- 선택된 키 배열 출력
- 체크박스 스타일 조정을 위한 `classNames.checkbox`

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `sorting`
- `filter`
- `editing`
- `rowActions`
- `loading`
- `scroll`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. `enabled: true` 없이 `keys`만 전달

문제점:

- 선택 상태는 준비됐지만 체크박스 UI가 활성화되지 않습니다.

좋은 방식:

- `selection.enabled: true`를 함께 넣습니다.

### 실수 2. 불안정한 `rowKey` 사용

나쁜 예:

```tsx
rowKey={(_, index) => String(index)}
```

문제점:

- 데이터 순서가 바뀌면 선택 상태가 엉킬 수 있습니다.

좋은 예:

```tsx
rowKey={(row) => String(row.id)}
```

### 실수 3. `keys` 타입을 데이터 원본과 다르게 섞음

문제점:

- `rowKey`는 문자열을 반환하는데 `keys`를 숫자 배열로 관리하면 비교가 꼬일 수 있습니다.

좋은 방식:

- `rowKey`와 `keys` 타입을 같은 기준으로 유지합니다.
- 이 문서 기준에서는 `string[]`를 사용합니다.

### 실수 4. 선택 기능과 삭제/편집 기능을 한 번에 과도하게 결합

문제점:

- 선택만 필요한 예제가 불필요하게 복잡해집니다.

좋은 방식:

- 먼저 선택 상태만 정확히 연결합니다.
- 이후 별도 요구가 나오면 삭제, 일괄 액션, 편집 기능을 추가합니다.

## LLM 안전 출력 템플릿

체크박스 선택 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      selection={{
        enabled: true,
        keys: selectedKeys,
        onChange: setSelectedKeys,
      }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 선택한 행만 필터링해야 함
- 선택 후 일괄 삭제나 추가 액션이 필요함
- 선택과 편집을 함께 써야 함
- 선택된 행을 확장 행이나 다른 패널과 연동해야 함
