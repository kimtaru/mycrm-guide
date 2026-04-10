# @mycrm-ui/react-table LLM 가이드

## 13. 헤더 메뉴

이 문서는 `@mycrm-ui/react-table`에서 헤더 우상단 액션 메뉴를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 테이블 상단에서 필터 표시/숨기기, 필터 초기화, 정렬 초기화 같은 테이블 단위 액션을 메뉴로 실행해야 할 때 사용합니다.

## 목적

헤더 메뉴 파트의 목적은 아래 두 요소를 분리해서 이해하는 것입니다.

- 메뉴 트리거: `headerMenuIcon`
- 메뉴 액션 목록: `headerMenuItems`

LLM은 메뉴 아이콘만 렌더링하는 것과 실제 실행할 액션 목록을 제공하는 것을 같은 단계로 취급하지 말아야 합니다.

## 필수 입력

### `headerMenuIcon`

헤더 우상단에 표시할 메뉴 버튼 아이콘입니다.

예시:

```tsx
headerMenuIcon={
  <span className="material-symbols-outlined">more_horiz</span>
}
```

### `headerMenuItems`

메뉴에 표시할 액션 목록입니다.

예시:

```tsx
headerMenuItems={[
  {
    label: "필터 표시",
    onClick: () => setShowFilter(true),
  },
  {
    label: "정렬 초기화",
    onClick: () => setSorts([]),
  },
]}
```

각 항목은 보통 아래 구조를 가집니다.

- `label`
- `onClick`

### `columnManager`와의 연동

중요 규칙:

- `columnManager`를 함께 설정하면 헤더 메뉴에 `컬럼 관리` 항목이 자동으로 추가됩니다.

즉, 헤더 메뉴는 단독 기능으로도 쓰고, 컬럼 관리 진입점으로도 쓸 수 있습니다.

## 최소 동작 패턴

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, SortState } from "@mycrm-ui/react-table";

interface Employee {
  id: number;
  name: string;
}

const columns: ColumnDef<Employee>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
];

export default function EmployeeTable({ rows }: { rows: Employee[] }) {
  const [sorts, setSorts] = useState<SortState[]>([]);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      sorting={{ sorts, onSortsChange: setSorts }}
      headerMenuItems={[
        {
          label: "정렬 초기화",
          onClick: () => setSorts([]),
        },
      ]}
      headerMenuIcon={
        <span className="material-symbols-outlined">more_horiz</span>
      }
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "테이블 우상단에 액션 메뉴가 필요해"
- "필터 토글과 초기화를 메뉴로 넣고 싶어"
- "정렬 초기화 버튼을 헤더 메뉴로 옮기고 싶어"
- "컬럼 관리도 같은 메뉴에서 열고 싶어"

이 경우 LLM은 아래 순서로 처리합니다.

1. 헤더 메뉴가 필요한지 판단합니다.
2. 트리거 아이콘으로 `headerMenuIcon`을 정의합니다.
3. 실행할 액션들을 `headerMenuItems`에 넣습니다.
4. 기존 상태와 연결되는 `onClick` 함수를 작성합니다.
5. 컬럼 관리도 필요하면 `columnManager`를 함께 설정합니다.

## 이 파트에서 추가해도 되는 것

- 필터 표시/숨기기
- 필터 초기화
- 정렬 초기화
- 마지막 실행 메뉴 로그
- `columnManager` 연동

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `editing`
- `expand`
- `tooltip`

## 자주 하는 실수

### 실수 1. `headerMenuIcon`만 넣고 `headerMenuItems`를 안 넣음

문제점:

- 메뉴 버튼은 보이지만 실제 실행 가능한 액션이 없습니다.

좋은 방식:

- 아이콘과 메뉴 항목을 함께 구성합니다.

### 실수 2. 메뉴 액션이 기존 상태와 연결되지 않음

문제점:

- 클릭은 되지만 필터, 정렬, 표시 상태가 실제로 바뀌지 않습니다.

좋은 방식:

- `onClick`에서 기존 `useState` 상태를 갱신합니다.

### 실수 3. `columnManager`와 헤더 메뉴를 별개로만 생각함

문제점:

- 컬럼 관리 진입점을 중복 구현할 수 있습니다.

좋은 방식:

- `columnManager`가 있으면 헤더 메뉴에 자동 항목이 추가된다는 점을 활용합니다.

### 실수 4. 헤더 메뉴를 행 단위 액션처럼 설계

문제점:

- 헤더 메뉴는 테이블 전역 액션인데 행 삭제 같은 로우 단위 액션과 섞이면 의미가 어색해집니다.

좋은 방식:

- 헤더 메뉴에는 필터, 정렬, 표시 옵션 같은 테이블 단위 액션을 우선 넣습니다.

## LLM 안전 출력 템플릿

헤더 메뉴 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

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
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      headerMenuItems={[
        {
          label: "새로고침",
          onClick: () => setLastAction("새로고침"),
        },
      ]}
      headerMenuIcon={
        <span className="material-symbols-outlined">more_horiz</span>
      }
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 전체 CSS 슬롯 커스터마이징이 필요함
- `ColumnDef` 전체 옵션 표와 연결해야 함
