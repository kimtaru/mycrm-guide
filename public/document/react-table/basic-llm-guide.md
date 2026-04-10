# @mycrm-ui/react-table LLM 가이드

## 1. 기본 사용

이 문서는 `@mycrm-ui/react-table`를 사용하는 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 정렬, 선택, 필터, 편집, 행 추가/삭제, 가상 스크롤, 컬럼 관리 같은 고급 기능 없이 데이터를 표 형태로 출력하려는 경우에 사용합니다.

## 목적

기본 사용 패턴은 테이블을 렌더링하기 위한 최소 구성입니다.

가장 먼저 아래 3가지만 준비합니다.

- `columns`
- `data`
- `rowKey`

사용자가 명시적으로 요구하지 않았다면 다른 기능 prop는 추가하지 않습니다.

## 필수 입력

### `columns`

테이블의 컬럼 구성을 정의합니다.

기본 사용에서는 각 컬럼에 보통 아래 항목이 들어갑니다.

- `key`
- `label`
- `render`

예시:

```tsx
const columns: ColumnDef<User>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
  { key: "role", label: "역할", render: (row) => row.role },
];
```

### `data`

행 데이터 배열입니다.

예시:

```tsx
const data: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
];
```

### `rowKey`

각 행의 안정적인 고유 키를 반환합니다.

규칙:

- 항상 고유하고 안정적인 값을 사용합니다.
- 가능하면 실제 도메인 ID를 사용합니다.
- 문자열로 변환해서 반환합니다.

권장 예시:

```tsx
rowKey={(row) => String(row.id)}
```

사용하지 말아야 하는 것:

- 배열 index
- 렌더링마다 바뀔 수 있는 계산값

## 최소 동작 패턴

```tsx
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
  { key: "role", label: "역할", render: (row) => row.role },
];

const data: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자" },
];

export default function UserTable() {
  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "기본 테이블을 보여줘"
- "리스트를 표로 출력해줘"
- "읽기 전용 데이터 테이블을 만들어줘"
- "일단 첫 버전 테이블부터 만들어줘"

이 경우 LLM은 아래 순서로 처리합니다.

1. 행 타입을 정의합니다.
2. `ColumnDef<T>[]`를 만듭니다.
3. `Table`에 `columns`, `data`, `rowKey`를 전달합니다.
4. 추가 요구사항이 나오기 전까지는 여기서 멈춥니다.

## 이 파트에서 추가해도 되는 것

- 사용자가 스타일을 원하면 `classNames`
- 셀 표시 로직을 위한 `render`
- 예제를 완결시키기 위한 최소 타입 정의

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 prop는 넣지 않습니다.

- `sorting`
- `selection`
- `filter`
- `editing`
- `rowActions`
- `loading`
- `scroll`
- `columnManager`
- `expand`
- `tooltip`
- `copyable`
- `headerMenuItems`
- `headerMenuIcon`

## 자주 하는 실수

### 실수 1. 불안정한 `rowKey` 사용

나쁜 예:

```tsx
rowKey={(_, index) => String(index)}
```

문제점:

- 데이터 순서가 바뀌면 행 식별자가 함께 바뀝니다.

좋은 예:

```tsx
rowKey={(row) => String(row.id)}
```

### 실수 2. 기본 예제에 고급 기능을 너무 일찍 추가

나쁜 예:

- 제품 요구사항이 없는데 `sorting`, `selection`, `filter`를 한꺼번에 추가함

문제점:

- 생성 코드가 불필요하게 복잡해지고 유지보수가 어려워집니다.

좋은 방식:

- 최소 테이블부터 시작합니다.
- 필요한 기능만 한 번에 하나씩 추가합니다.

### 실수 3. 기본 스타일이 충분하다고 가정

문제점:

- `@mycrm-ui/react-table`는 시각적으로 완성된 디자인 컴포넌트라기보다 헤드리스에 가까운 성격입니다.

좋은 방식:

- 사용자가 디자인이나 브랜드 스타일을 요구하면 `classNames`를 명시합니다.

## LLM 안전 출력 템플릿

고급 기능 요청이 없을 때는 아래 템플릿을 우선 사용합니다.

```tsx
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface Row {
  id: number;
  name: string;
  email: string;
}

const columns: ColumnDef<Row>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
];

export default function ExampleTable({ rows }: { rows: Row[] }) {
  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구사항이 명시되면 이 기본 가이드만으로는 부족하므로 다음 파트 가이드를 사용해야 합니다.

- 헤더 정렬
- 체크박스 선택
- 필터
- 인라인 편집
- 행 추가 / 삭제
- 로딩 / 빈 상태
- 가상 스크롤
- 컬럼 숨김 / 순서 변경 / 고정 / 리사이즈
- 확장 행
- 툴팁 / 복사
- 헤더 메뉴 액션

## 이 저장소에서 참고할 파일

- 데모 페이지: `mycrm-guide/app/document/react-table/page.tsx`
- 기본 데모: `mycrm-guide/app/document/react-table/basic-demo.tsx`
- 라이브러리 구현: `mycrm-ui/packages/react-table/src/Table.tsx`
- 타입 정의: `mycrm-ui/packages/react-table/src/types.ts`
