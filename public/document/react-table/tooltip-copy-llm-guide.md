# @mycrm-ui/react-table LLM 가이드

## 12. 툴팁 / 복사

이 문서는 `@mycrm-ui/react-table`에서 셀 호버 툴팁과 우클릭 복사 메뉴를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 긴 텍스트를 호버 툴팁으로 확인해야 하거나, 특정 셀 값을 우클릭 메뉴로 복사해야 하거나, 복사 이벤트를 로깅해야 할 때 사용합니다.

## 목적

툴팁 / 복사 파트의 목적은 아래 두 기능을 분리해서 이해하는 것입니다.

- `tooltip`: hover 시 내용 표시
- `copyable`: 우클릭 복사 메뉴

LLM은 “툴팁을 켠다”와 “복사가 가능한 셀을 지정한다”를 같은 설정으로 보지 말아야 합니다.

## 필수 입력

### `tooltip`

셀 호버 시 툴팁 표시를 켭니다.

예시:

```tsx
tooltip={true}
```

긴 텍스트가 잘리는 열에서 자주 사용합니다.

### 전역 `copyable`

복사 기능 자체를 활성화합니다.

예시:

```tsx
copyable={true}
```

### 컬럼별 `copyable: true`

실제로 복사 가능한 열은 컬럼 단위로 지정해야 합니다.

예시:

```tsx
const columns: ColumnDef<Product>[] = [
  {
    key: "name",
    label: "상품명",
    copyable: true,
    render: (row) => row.name,
  },
];
```

중요 규칙:

- 전역 `copyable={true}`만으로는 충분하지 않습니다.
- 복사 대상 열에는 컬럼별 `copyable: true`도 필요합니다.

### `onCellCopy`

복사 이벤트를 수신합니다.

예시:

```tsx
onCellCopy={(rowKey, colKey, value) => {
  console.log(rowKey, colKey, value);
}}
```

### `cellContextMenuItems`

복사 메뉴에 사용자 정의 항목을 추가할 수 있습니다.

예시:

```tsx
cellContextMenuItems={[
  {
    label: "값 로그 남기기",
    onClick: ({ rowKey, colKey, value }) => {
      console.log(rowKey, colKey, value);
    },
  },
]}
```

## 최소 동작 패턴

```tsx
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Product {
  id: number;
  name: string;
  sku: string;
}

const columns: ColumnDef<Product>[] = [
  {
    key: "name",
    label: "상품명",
    copyable: true,
    render: (row) => row.name,
  },
  {
    key: "sku",
    label: "SKU",
    copyable: true,
    render: (row) => row.sku,
  },
];

export default function ProductTable({ rows }: { rows: Product[] }) {
  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      tooltip={true}
      copyable={true}
      onCellCopy={(rowKey, colKey, value) => {
        console.log(rowKey, colKey, value);
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "긴 셀 값은 호버하면 전체가 보여야 해"
- "SKU를 우클릭해서 복사하고 싶어"
- "복사 이벤트를 기록하고 싶어"
- "복사 메뉴에 커스텀 항목을 넣고 싶어"

이 경우 LLM은 아래 순서로 처리합니다.

1. 툴팁만 필요한지, 복사도 필요한지 판단합니다.
2. hover 가시성이 필요하면 `tooltip={true}`를 켭니다.
3. 복사가 필요하면 전역 `copyable={true}`를 켭니다.
4. 실제 복사 가능 열에만 `copyable: true`를 넣습니다.
5. 복사 후 동작이 필요하면 `onCellCopy`를 연결합니다.
6. 메뉴 커스터마이징이 필요하면 `cellContextMenuItems`를 추가합니다.

## 이 파트에서 추가해도 되는 것

- 복사 로그 UI
- 툴팁 스타일 커스터마이징
- 컨텍스트 메뉴 스타일 커스터마이징
- 커스텀 메뉴 항목

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `filter`
- `editing`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. 전역 `copyable={true}`만 넣고 컬럼별 `copyable: true`를 안 넣음

문제점:

- 어떤 열이 복사 대상인지 명확하지 않아 기대한 셀에서 복사 메뉴가 안 열릴 수 있습니다.

좋은 방식:

- 전역 옵션과 컬럼 옵션을 함께 설정합니다.

### 실수 2. 툴팁과 복사를 같은 기능처럼 설명

문제점:

- hover 시 표시와 우클릭 메뉴가 섞여서 요구사항 해석이 흐려집니다.

좋은 방식:

- 툴팁은 `tooltip`
- 복사는 `copyable`

로 구분합니다.

### 실수 3. 긴 텍스트를 잘라 놓고 툴팁을 빼먹음

문제점:

- 사용자가 전체 값을 확인할 수 없습니다.

좋은 방식:

- `text-ellipsis`나 `whitespace-nowrap`를 쓰는 열이면 `tooltip` 적용 여부를 먼저 검토합니다.

### 실수 4. 복사 이벤트를 써야 하는데 `onCellCopy`를 놓침

문제점:

- 로그, 토스트, 후속 액션 연결이 불가능합니다.

좋은 방식:

- 복사 후 처리 요구가 있으면 `onCellCopy`를 연결합니다.

## LLM 안전 출력 템플릿

툴팁 / 복사 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

```tsx
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
    copyable: true,
    render: (row) => row.name,
  },
];

export default function ExampleTable({ rows }: { rows: Row[] }) {
  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      tooltip={true}
      copyable={true}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 헤더 메뉴와 함께 액션을 설계해야 함
- CSS 슬롯을 세밀하게 커스터마이징해야 함
- 문서화가 끝나고 전체 옵션 테이블과 연결해야 함
