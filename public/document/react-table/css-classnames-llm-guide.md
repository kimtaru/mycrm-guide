# @mycrm-ui/react-table LLM 가이드

## 14. CSS 커스터마이징

이 문서는 `@mycrm-ui/react-table`의 시각적 표현을 `classNames` 슬롯으로 커스터마이징하는 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 테이블의 여백, 배경색, hover 상태, 헤더 스타일, 필터 입력, 컬럼 관리 모달, 툴팁 같은 시각적 요소를 바꾸고 싶어 할 때 사용합니다.

## 목적

CSS 커스터마이징 파트의 목적은 아래 원칙을 명확히 지키는 것입니다.

- 동작은 props로 제어한다.
- 스타일은 `classNames`로 제어한다.

LLM은 정렬, 필터, 편집 같은 기능 자체를 바꾸는 요청과 “겉모양만 바꾸는 요청”을 구분해야 합니다.

## 필수 입력

### `classNames`

`Table`의 시각적 슬롯 표면입니다.

예시:

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  classNames={{
    table: "w-full text-sm",
    thead: "bg-surface-container-low text-on-surface-variant",
    th: "px-4 py-3 text-left font-semibold",
    tr: "border-t border-outline-variant/20 hover:bg-surface-container-lowest",
    td: "px-4 py-3 text-on-surface",
  }}
/>
```

### 기본 슬롯

가장 자주 쓰는 기본 슬롯:

- `wrap`
- `table`
- `thead`
- `th`
- `tbody`
- `tr`
- `td`

### 기능별 슬롯

필요할 때 함께 쓰는 슬롯 예시:

- 선택: `checkbox`, `checkboxChecked`
- 필터: `filterRow`, `filterCell`, `filterInput`, `filterSelect`
- 편집: `tdEditing`, `editError`, `tdFocused`
- 행 추가: `addRow`, `addInput`, `addConfirmBtn`, `addCancelBtn`
- 헤더 메뉴: `headerMenuBtn`, `headerMenuDropdown`, `headerMenuItem`
- 컬럼 관리: `columnManager*`, `columnToggle*`
- 툴팁 / 복사: `tooltip`, `cellCopyMenu`, `cellCopyMenuItem`
- 확장 행: `groupRow`, `groupCell`, `expandIcon`, `childRow`, `childTd`, `childIndent`
- 로딩 / 빈 상태: `skeletonRow`, `skeletonCell`, `skeletonBar`, `emptyRow`, `emptyCell`

## 최소 동작 패턴

```tsx
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, TableClassNames } from "@mycrm-ui/react-table";

interface Employee {
  id: number;
  name: string;
}

const columns: ColumnDef<Employee>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
];

const classNames: TableClassNames = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20 hover:bg-surface-container-lowest transition-colors",
  td: "px-4 py-3 text-on-surface",
};

export default function EmployeeTable({ rows }: { rows: Employee[] }) {
  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      classNames={classNames}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "테이블을 더 촘촘하게 보여줘"
- "헤더 배경을 브랜드 색으로 바꿔줘"
- "hover 스타일을 더 강조해줘"
- "컬럼 관리 모달 스타일을 손보고 싶어"
- "Tailwind 기준으로 classNames를 만들어줘"

이 경우 LLM은 아래 순서로 처리합니다.

1. 사용자가 바꾸고 싶은 것이 기능인지 스타일인지 먼저 구분합니다.
2. 스타일 요청이면 `classNames` 슬롯부터 검토합니다.
3. 어떤 UI 요소를 바꾸고 싶은지 대응 슬롯을 찾습니다.
4. 기본 레이아웃 슬롯과 기능별 슬롯을 구분해서 제안합니다.
5. 기능 동작은 그대로 두고 className만 바꿉니다.

## 이 파트에서 추가해도 되는 것

- 기본형 / 컴팩트 / 스트라이프 같은 테마 변형
- Tailwind 예시
- CSS 예시
- 기능별 슬롯 일부만 선택 적용

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 변경은 함께 넣지 않습니다.

- `sorting`
- `filter`
- `editing`
- `rowActions`
- `expand`

## 자주 하는 실수

### 실수 1. 스타일 요청인데 기능 prop를 같이 바꿔버림

문제점:

- 사용자는 색상이나 간격만 바꾸고 싶은데 동작까지 달라질 수 있습니다.

좋은 방식:

- 기능은 유지하고 `classNames`만 조정합니다.

### 실수 2. 너무 많은 슬롯을 한 번에 덮어씀

문제점:

- 최소 변경이 어려워지고 어떤 클래스가 영향을 주는지 추적하기 힘들어집니다.

좋은 방식:

- 필요한 슬롯만 우선 덮어씁니다.

### 실수 3. 기능별 슬롯 이름을 잘못 추정함

문제점:

- 클래스가 적용되지 않거나 의도와 다른 요소에 들어갑니다.

좋은 방식:

- 문서의 슬롯 표면이나 실제 타입 정의를 기준으로 정확한 키를 사용합니다.

### 실수 4. 스크롤/가상 스크롤 레이아웃인데 `wrap`을 빼먹음

문제점:

- 높이와 overflow 설정이 빠져 레이아웃이 깨질 수 있습니다.

좋은 방식:

- 스크롤 컨테이너가 필요하면 `wrap` 슬롯을 먼저 확인합니다.

## LLM 안전 출력 템플릿

CSS 커스터마이징 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

```tsx
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, TableClassNames } from "@mycrm-ui/react-table";

interface Row {
  id: number;
  name: string;
}

const columns: ColumnDef<Row>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
];

const classNames: TableClassNames = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20 hover:bg-surface-container-lowest",
  td: "px-4 py-3 text-on-surface",
};

export default function ExampleTable({ rows }: { rows: Row[] }) {
  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      classNames={classNames}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- `ColumnDef` 전체 옵션까지 함께 설명해야 함
- 패키지 전체 스타일 시스템이나 토큰 설계를 같이 다뤄야 함
