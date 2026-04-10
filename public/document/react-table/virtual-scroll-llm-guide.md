# @mycrm-ui/react-table LLM 가이드

## 8. 가상 스크롤

이 문서는 `@mycrm-ui/react-table`에서 대용량 데이터용 가상 스크롤과 무한 로딩을 구성하는 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 많은 행을 성능 저하 없이 렌더링하고 싶어 하거나, 스크롤 끝에서 추가 데이터를 불러오는 무한 스크롤이 필요할 때 사용합니다.

## 목적

가상 스크롤 파트의 목적은 아래 조건들을 함께 만족시키는 것입니다.

- `scroll.virtual: true`
- 고정된 `rowHeight`
- 실제 스크롤 컨테이너 높이
- 무한 로딩용 `onLoadMore`, `hasMore`, `loadingMore`

LLM은 가상 스크롤을 단순 옵션 하나로 보지 말고, 레이아웃 조건과 로딩 상태까지 함께 맞춰야 합니다.

## 필수 입력

### `scroll.virtual`

가상 스크롤을 활성화하려면 `virtual: true`를 설정합니다.

예시:

```tsx
scroll={{
  virtual: true,
}}
```

### `scroll.rowHeight`

가상 스크롤에서는 각 행의 높이를 고정값으로 알려줘야 합니다.

예시:

```tsx
scroll={{
  virtual: true,
  rowHeight: 48,
}}
```

중요 규칙:

- `rowHeight`는 가상 스크롤 사용 시 필수입니다.

### `classNames.wrap`

실제 스크롤이 일어날 컨테이너 높이를 지정해야 합니다.

예시:

```tsx
classNames={{
  wrap: "h-[380px] overflow-y-auto",
}}
```

중요 규칙:

- 고정 높이와 `overflow-y-auto` 또는 `overflow-y-scroll`이 필요합니다.

### `scroll.stickyHeader`

스크롤 중 헤더 고정이 필요하면 설정합니다.

예시:

```tsx
scroll={{
  virtual: true,
  rowHeight: 48,
  stickyHeader: true,
}}
```

### `scroll.onLoadMore`

스크롤 끝 도달 시 다음 데이터를 불러옵니다.

예시:

```tsx
scroll={{
  virtual: true,
  rowHeight: 48,
  onLoadMore: handleLoadMore,
  hasMore,
  loadingMore,
}}
```

무한 로딩에서는 보통 아래 상태를 함께 둡니다.

- `hasMore`
- `loadingMore`

## 최소 동작 패턴

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

export default function ExampleTable({ initialRows }: { initialRows: Row[] }) {
  const [rows, setRows] = useState(initialRows);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    // 추가 데이터 로드
    setLoadingMore(false);
  };

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      scroll={{
        virtual: true,
        rowHeight: 48,
        stickyHeader: true,
        onLoadMore: handleLoadMore,
        hasMore,
        loadingMore,
      }}
      classNames={{
        wrap: "h-[380px] overflow-y-auto",
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "행이 많아도 부드럽게 스크롤되게 해줘"
- "대용량 테이블이라 성능 최적화가 필요해"
- "스크롤 끝에서 다음 데이터를 불러오고 싶어"
- "헤더는 고정하고 본문만 스크롤되게 해줘"

이 경우 LLM은 아래 순서로 처리합니다.

1. 행 수가 많아 가상 스크롤이 필요한지 판단합니다.
2. `scroll.virtual: true`와 `rowHeight`를 설정합니다.
3. `classNames.wrap`에 고정 높이와 `overflow-y-*`를 추가합니다.
4. 헤더 고정이 필요하면 `stickyHeader`를 켭니다.
5. 무한 로딩이 필요하면 `onLoadMore`, `hasMore`, `loadingMore`를 연결합니다.
6. 중복 로딩 방지 조건을 `handleLoadMore` 안에 넣습니다.

## 이 파트에서 추가해도 되는 것

- `overscan`
- `renderLoadingMore`
- 초기화 버튼
- 현재 로드된 행 수 표시

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `filter`
- `editing`
- `rowActions`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. `virtual: true`만 넣고 `rowHeight`를 빼먹음

문제점:

- 가상 스크롤 계산이 깨지거나 의도와 다르게 동작할 수 있습니다.

좋은 방식:

- 가상 스크롤 사용 시 항상 `rowHeight`를 함께 지정합니다.

### 실수 2. `classNames.wrap`에 높이나 스크롤 설정이 없음

문제점:

- 실제 스크롤 컨테이너가 생기지 않아 가상 스크롤이 의미 있게 동작하지 않습니다.

좋은 방식:

- `h-[...]`와 `overflow-y-auto` 또는 `overflow-y-scroll`을 함께 설정합니다.

### 실수 3. `onLoadMore`에서 중복 호출 방지 조건이 없음

문제점:

- 스크롤 끝에서 연속 호출이 발생해 중복 요청이 생길 수 있습니다.

좋은 방식:

- `if (loadingMore || !hasMore) return;` 같은 가드를 둡니다.

### 실수 4. `hasMore` 갱신을 빼먹음

문제점:

- 더 불러올 데이터가 없는데도 계속 로딩이 시도될 수 있습니다.

좋은 방식:

- 새 데이터 수를 기준으로 `hasMore`를 갱신합니다.

## LLM 안전 출력 템플릿

가상 스크롤 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

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
  const [data, setData] = useState(rows);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setLoadingMore(false);
  };

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      scroll={{
        virtual: true,
        rowHeight: 48,
        onLoadMore: handleLoadMore,
        hasMore,
        loadingMore,
      }}
      classNames={{
        wrap: "h-[380px] overflow-y-auto",
      }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 컬럼 숨김, 고정, 순서 변경이 필요함
- 확장 행과 가상 스크롤을 같이 써야 함
- 스크롤 안에서 편집, 선택, 툴팁까지 같이 다뤄야 함
- 서버 페이지네이션과 가상 스크롤 전략을 함께 설계해야 함
