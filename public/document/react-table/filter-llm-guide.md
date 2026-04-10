# @mycrm-ui/react-table LLM 가이드

## 4. 필터

이 문서는 `@mycrm-ui/react-table`에서 컬럼 단위 필터 기능이 필요한 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 이름 검색, 역할 선택, 다중 조건 검색처럼 테이블 데이터를 컬럼 기준으로 좁혀 보고 싶어 할 때 사용합니다.

## 목적

필터 파트의 목적은 아래 두 층위를 정확히 나누는 것입니다.

- 컬럼 정의에 들어가는 필터 메타데이터
- `filter` prop으로 제어하는 현재 필터 상태

LLM은 "필터 UI를 보이게 하는 설정"과 "현재 입력값을 저장하는 상태"를 함께 맞춰야 합니다.

## 필수 입력

### 컬럼별 필터 설정

필터를 붙일 컬럼에는 컬럼 정의 단계에서 필터 타입을 먼저 지정합니다.

주요 항목:

- `filterType`
- `filterPlaceholder`
- `filterOptions`

예시:

```tsx
const columns: ColumnDef<User>[] = [
  {
    key: "name",
    label: "이름",
    render: (row) => row.name,
    filterType: "text",
    filterPlaceholder: "이름 검색...",
  },
  {
    key: "role",
    label: "역할",
    render: (row) => row.role,
    filterType: "select",
    filterOptions: [
      { label: "관리자", value: "관리자" },
      { label: "사용자", value: "사용자" },
    ],
  },
];
```

판단 기준:

- 자유 입력 검색이면 `filterType: "text"`
- 정해진 옵션 중 선택이면 `filterType: "select"`

### `filter.enabled`

필터 행을 표시하려면 `enabled: true`가 필요합니다.

예시:

```tsx
filter={{ enabled: true }}
```

### `filter.values`

현재 컬럼별 필터 입력값을 저장합니다.

예시:

```tsx
const [filterValues, setFilterValues] = useState<Record<string, string>>({});
```

### `filter.onChange`

컬럼 키와 값을 받아 상태를 갱신합니다.

예시:

```tsx
filter={{
  enabled: true,
  values: filterValues,
  onChange: (colKey, value) =>
    setFilterValues((prev) => ({ ...prev, [colKey]: value })),
}}
```

### `filter.debounce`

텍스트 입력 반응을 늦춰야 하면 `debounce`를 추가합니다.

예시:

```tsx
filter={{
  enabled: true,
  values: filterValues,
  onChange: handleFilterChange,
  debounce: 300,
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
  role: string;
}

const columns: ColumnDef<User>[] = [
  {
    key: "name",
    label: "이름",
    render: (row) => row.name,
    filterType: "text",
    filterPlaceholder: "이름 검색...",
  },
  {
    key: "role",
    label: "역할",
    render: (row) => row.role,
    filterType: "select",
    filterOptions: [
      { label: "관리자", value: "관리자" },
      { label: "사용자", value: "사용자" },
    ],
  },
];

export default function UserTable({ rows }: { rows: User[] }) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      filter={{
        enabled: true,
        values: filterValues,
        onChange: (colKey, value) =>
          setFilterValues((prev) => ({ ...prev, [colKey]: value })),
        debounce: 300,
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "컬럼별 검색을 넣어줘"
- "이름으로 검색하고 역할로 좁힐 수 있어야 해"
- "헤더 아래에 필터 입력창이 필요해"
- "드롭다운 필터와 텍스트 필터를 같이 쓰고 싶어"

이 경우 LLM은 아래 순서로 처리합니다.

1. 어떤 컬럼이 필터 대상인지 정합니다.
2. 컬럼별로 `text` 또는 `select` 등 적절한 필터 타입을 고릅니다.
3. 컬럼 정의에 `filterType`, `filterPlaceholder`, `filterOptions`를 추가합니다.
4. `Record<string, string>` 형태의 필터 상태를 선언합니다.
5. `filter.enabled`, `filter.values`, `filter.onChange`를 연결합니다.
6. 텍스트 입력이 많으면 `debounce`를 추가합니다.

## 이 파트에서 추가해도 되는 것

- 활성 필터 개수 표시
- 현재 필터 값 요약 UI
- 필터 표시/숨김 토글
- 헤더 메뉴를 통한 필터 토글
- `filterInput`, `filterSelect`, `filterRow`, `filterCell` 스타일 커스터마이징

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `selection`
- `editing`
- `rowActions`
- `loading`
- `scroll`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. 컬럼에 `filterType` 없이 `filter` prop만 추가

문제점:

- 필터 상태는 있어도 어떤 입력 UI를 렌더링해야 하는지 불명확합니다.

좋은 방식:

- 필터 대상 컬럼마다 `filterType`을 먼저 정의합니다.

### 실수 2. `select` 필터인데 `filterOptions`를 빼먹음

문제점:

- 셀렉트 UI에 보여줄 선택지가 없습니다.

좋은 방식:

- `filterType: "select"`를 썼다면 `filterOptions`를 함께 넣습니다.

### 실수 3. 필터 상태를 컬럼과 무관한 단일 문자열로 관리

문제점:

- 여러 컬럼 필터를 동시에 표현하기 어렵습니다.

좋은 방식:

- `Record<string, string>` 형태로 컬럼 키별 값을 저장합니다.

### 실수 4. 필터 기능과 정렬/선택/편집을 한 번에 과도하게 섞음

문제점:

- 예제가 지나치게 무거워지고 판단 기준이 흐려집니다.

좋은 방식:

- 먼저 필터 기능만 정확히 연결합니다.
- 다른 기능은 별도 요구가 나왔을 때 추가합니다.

## LLM 안전 출력 템플릿

필터 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

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
    render: (row) => row.name,
    filterType: "text",
    filterPlaceholder: "이름 검색...",
  },
];

export default function ExampleTable({ rows }: { rows: Row[] }) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      filter={{
        enabled: true,
        values: filterValues,
        onChange: (colKey, value) =>
          setFilterValues((prev) => ({ ...prev, [colKey]: value })),
      }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 선택과 필터를 함께 써야 함
- 필터된 행에 대해 일괄 액션이 필요함
- 필터 결과를 편집 상태와 연동해야 함
- 로딩, 빈 상태, 서버 연동 조건까지 같이 다뤄야 함
