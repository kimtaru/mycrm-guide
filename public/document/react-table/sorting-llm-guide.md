# @mycrm-ui/react-table LLM 가이드

## 2. 정렬

이 문서는 `@mycrm-ui/react-table`에서 정렬 기능이 필요한 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 컬럼 헤더 클릭으로 정렬 순서를 바꾸길 원하거나, 초기 정렬 상태를 지정해야 하거나, 여러 컬럼 기준 정렬이 필요한 경우에 사용합니다.

## 목적

정렬 파트의 목적은 아래 두 가지를 정확히 구분하는 것입니다.

- 단일 정렬: `sorting.sort`
- 멀티 정렬: `sorting.sorts`

LLM은 사용자 요구가 어느 쪽인지 먼저 판단하고, 그에 맞는 상태 구조와 핸들러를 선택해야 합니다.

## 필수 입력

### `sortable: true`

정렬 가능한 컬럼에는 반드시 `sortable: true`를 설정합니다.

예시:

```tsx
const columns: ColumnDef<User>[] = [
  { key: "name", label: "이름", sortable: true, render: (row) => row.name },
  { key: "email", label: "이메일", sortable: true, render: (row) => row.email },
  { key: "age", label: "나이", sortable: true, render: (row) => row.age },
];
```

`sortable: true`가 없으면 정렬 UI가 기대대로 동작하지 않습니다.

### 단일 정렬 상태

단일 정렬은 `SortState | null` 형태를 사용합니다.

예시:

```tsx
const [sort, setSort] = useState<SortState | null>({
  key: "age",
  direction: "asc",
});
```

`Table`에는 아래처럼 전달합니다.

```tsx
sorting={{ sort, onSortChange: setSort }}
```

### 멀티 정렬 상태

멀티 정렬은 `SortState[]` 형태를 사용합니다.

예시:

```tsx
const [sorts, setSorts] = useState<SortState[]>([
  { key: "category", direction: "asc" },
  { key: "price", direction: "desc" },
]);
```

`Table`에는 아래처럼 전달합니다.

```tsx
sorting={{ sorts, onSortsChange: setSorts }}
```

## 최소 동작 패턴

### 단일 정렬

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, SortState } from "@mycrm-ui/react-table";

interface User {
  id: number;
  name: string;
  age: number;
}

const columns: ColumnDef<User>[] = [
  { key: "name", label: "이름", sortable: true, render: (row) => row.name },
  { key: "age", label: "나이", sortable: true, render: (row) => row.age },
];

export default function UserTable({ data }: { data: User[] }) {
  const [sort, setSort] = useState<SortState | null>({
    key: "age",
    direction: "asc",
  });

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      sorting={{ sort, onSortChange: setSort }}
    />
  );
}
```

### 멀티 정렬

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, SortState } from "@mycrm-ui/react-table";

interface Product {
  id: number;
  category: string;
  brand: string;
  price: number;
}

const columns: ColumnDef<Product>[] = [
  { key: "category", label: "카테고리", sortable: true, render: (row) => row.category },
  { key: "brand", label: "브랜드", sortable: true, render: (row) => row.brand },
  { key: "price", label: "가격", sortable: true, render: (row) => row.price },
];

export default function ProductTable({ data }: { data: Product[] }) {
  const [sorts, setSorts] = useState<SortState[]>([
    { key: "category", direction: "asc" },
    { key: "price", direction: "desc" },
  ]);

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      sorting={{ sorts, onSortsChange: setSorts }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "헤더 클릭으로 정렬되게 해줘"
- "기본 정렬을 나이 오름차순으로 시작해줘"
- "카테고리 우선, 가격 차순으로 정렬해줘"
- "여러 컬럼 기준 정렬이 필요해"

이 경우 LLM은 아래 순서로 처리합니다.

1. 어떤 컬럼이 정렬 가능해야 하는지 정합니다.
2. 해당 컬럼에 `sortable: true`를 추가합니다.
3. 단일 정렬인지 멀티 정렬인지 판단합니다.
4. `sort` 또는 `sorts` 상태를 선언합니다.
5. `sorting` prop에 적절한 핸들러를 연결합니다.

## 이 파트에서 추가해도 되는 것

- 초기 정렬 상태
- 단일 정렬용 `sort`
- 멀티 정렬용 `sorts`
- 멀티 정렬 안내 문구

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `selection`
- `filter`
- `editing`
- `rowActions`
- `loading`
- `scroll`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. `sortable: true` 없이 `sorting`만 추가

문제점:

- 정렬 상태는 있어도 컬럼 헤더 상호작용이 기대대로 보이지 않을 수 있습니다.

좋은 방식:

- 정렬 가능한 컬럼마다 `sortable: true`를 명시합니다.

### 실수 2. 단일 정렬인데 `sorts`를 사용

문제점:

- 요구사항보다 구조가 복잡해집니다.

좋은 방식:

- 하나의 기준만 필요하면 `sort`와 `onSortChange`를 사용합니다.

### 실수 3. 멀티 정렬인데 `sort` 하나만 사용

문제점:

- 여러 우선순위 정렬을 표현할 수 없습니다.

좋은 방식:

- 복수 기준이 필요하면 `sorts`와 `onSortsChange`를 사용합니다.

### 실수 4. 정렬과 데이터 가공 책임을 섞음

문제점:

- 렌더링 전에 임의로 데이터를 정렬하고, 동시에 `sorting` prop도 주면 의도가 흐려집니다.

좋은 방식:

- 정렬 동작은 `Table`의 `sorting` prop 기준으로 우선 구성합니다.

## LLM 안전 출력 템플릿

정렬 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, SortState } from "@mycrm-ui/react-table";

interface Row {
  id: number;
  name: string;
  age: number;
}

const columns: ColumnDef<Row>[] = [
  { key: "name", label: "이름", sortable: true, render: (row) => row.name },
  { key: "age", label: "나이", sortable: true, render: (row) => row.age },
];

export default function ExampleTable({ rows }: { rows: Row[] }) {
  const [sort, setSort] = useState<SortState | null>({
    key: "age",
    direction: "asc",
  });

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      sorting={{ sort, onSortChange: setSort }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 체크박스 선택이 필요함
- 검색이나 조건 필터가 필요함
- 인라인 편집이 필요함
- 행 추가/삭제가 필요함
