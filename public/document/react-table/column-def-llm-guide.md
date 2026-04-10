# @mycrm-ui/react-table LLM 가이드

## 15. ColumnDef 옵션

이 문서는 `@mycrm-ui/react-table`의 `ColumnDef`를 기준으로 컬럼 옵션을 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 “이 컬럼을 정렬 가능하게 해줘”, “이 컬럼만 편집 가능해야 해”, “이 컬럼은 복사 가능해야 해”처럼 컬럼 단위 속성을 요청할 때 사용합니다.

## 목적

`ColumnDef` 파트의 목적은 개별 옵션을 외우는 것이 아니라, 요청에 맞는 옵션 묶음을 정확히 고르는 것입니다.

LLM은 `ColumnDef`를 단순 타입 목록으로 보지 말고, 아래처럼 기능별 묶음으로 해석해야 합니다.

- 기본 표시
- 정렬 / 필터
- 편집 / 행 추가
- 정렬 / 너비 / 정렬 방식
- 복사 / 검증 / 커스텀 렌더러

## 필수 입력

### 기본 표시 옵션

항상 자주 쓰는 기본 옵션:

- `key`
- `label`
- `render`

예시:

```tsx
{
  key: "name",
  label: "이름",
  render: (row) => row.name,
}
```

### 레이아웃 옵션

- `width`
- `minWidth`
- `align`

예시:

```tsx
{
  key: "price",
  label: "가격",
  width: "120px",
  minWidth: 80,
  align: "right",
  render: (row) => row.price,
}
```

### 정렬 / 필터 옵션

- `sortable`
- `filterType`
- `filterOptions`
- `filterPlaceholder`

예시:

```tsx
{
  key: "role",
  label: "역할",
  sortable: true,
  filterType: "select",
  filterOptions: [
    { label: "관리자", value: "관리자" },
    { label: "사용자", value: "사용자" },
  ],
  render: (row) => row.role,
}
```

### 편집 / 추가 옵션

- `editable`
- `insertable`
- `validate`
- `renderEditCell`
- `renderInsertCell`
- `onValidationError`

예시:

```tsx
{
  key: "email",
  label: "이메일",
  editable: true,
  insertable: true,
  validate: (value) =>
    value.trim() ? null : "필수 항목입니다.",
  render: (row) => row.email,
}
```

중요 규칙:

- `renderEditCell`은 `editing.renderCell`보다 우선합니다.
- inline error UI가 필요하면 `onValidationError`는 신중히 써야 합니다.

### 복사 옵션

- `copyable`

예시:

```tsx
{
  key: "sku",
  label: "SKU",
  copyable: true,
  render: (row) => row.sku,
}
```

## 최소 동작 패턴

```tsx
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
    width: "160px",
    sortable: true,
    filterType: "text",
    editable: true,
    render: (row) => row.name,
    validate: (value) => (value.trim() ? null : "필수 항목입니다."),
  },
  {
    key: "role",
    label: "역할",
    render: (row) => row.role,
  },
];
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "이 컬럼은 정렬 가능해야 해"
- "이 컬럼은 select 필터가 필요해"
- "이 컬럼만 편집 가능하게 해줘"
- "이 컬럼은 복사 가능해야 해"
- "이메일 컬럼은 validate가 필요해"

이 경우 LLM은 아래 순서로 처리합니다.

1. 사용자의 요구가 “테이블 전체 기능”인지 “특정 컬럼 옵션”인지 판단합니다.
2. 컬럼 단위 요구라면 `ColumnDef`에서 해결 가능한지 먼저 봅니다.
3. 필요한 옵션 묶음을 선택합니다.
4. 옵션 간 전제 조건을 확인합니다.

대표 전제:

- 정렬: `sortable`
- 필터: `filterType` + 필요 시 `filterOptions`
- 편집: `editable` + 필요 시 `validate`
- 추가: `insertable`
- 복사: `copyable`

## 이 파트에서 추가해도 되는 것

- 기능별 옵션 조합 예시
- 컬럼별 최소 옵션 템플릿
- 같은 컬럼에 여러 옵션을 함께 적용한 예시

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래는 한꺼번에 다 넣지 않습니다.

- `sortable`
- `filterType`
- `editable`
- `insertable`
- `copyable`

좋은 방식:

- 필요한 옵션만 추가합니다.

## 자주 하는 실수

### 실수 1. 컬럼 요청인데 테이블 전역 props를 먼저 건드림

문제점:

- 요구사항이 컬럼 단위인데 범위가 불필요하게 커집니다.

좋은 방식:

- 먼저 `ColumnDef`에서 해결 가능한지 확인합니다.

### 실수 2. `filterType: "select"`인데 `filterOptions`를 안 넣음

문제점:

- 선택지가 없어 필터 UI가 불완전합니다.

좋은 방식:

- select 필터에는 `filterOptions`를 함께 넣습니다.

### 실수 3. `insertable: true`가 필요한데 `editable`만 넣음

문제점:

- 인라인 편집은 가능하지만 행 추가 입력에는 참여하지 않습니다.

좋은 방식:

- 행 추가 요구면 `insertable`을 별도로 판단합니다.

### 실수 4. `renderEditCell`과 `onValidationError`를 같이 쓰면서 inline error UI를 기대

문제점:

- 검증 실패 흐름이 의도와 다르게 보일 수 있습니다.

좋은 방식:

- 에러 UI 전달 경로를 먼저 확인하고 옵션을 조합합니다.

## LLM 안전 출력 템플릿

컬럼 옵션 요청이 있을 때는 아래 템플릿을 우선 사용합니다.

```tsx
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
  },
];
```

필요한 옵션만 점진적으로 추가합니다.

예시:

```tsx
{
  key: "name",
  label: "이름",
  sortable: true,
  editable: true,
  render: (row) => row.name,
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 각 기능별 가이드로 이동합니다.

- 기본 사용
- 정렬
- 체크박스 선택
- 필터
- 행 삭제 / 추가
- 인라인 편집
- 툴팁 / 복사
