# @mycrm-ui/react-table LLM 가이드

## 7. 로딩 / 빈 상태

이 문서는 `@mycrm-ui/react-table`에서 로딩 상태와 빈 상태를 처리하는 코드를 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 데이터를 불러오는 동안 스켈레톤 UI를 보여주고 싶어 하거나, 데이터가 없을 때 별도 빈 상태 메시지를 보여줘야 할 때 사용합니다.

## 목적

로딩 / 빈 상태 파트의 목적은 아래 두 상태를 분리해서 다루는 것입니다.

- 로딩 중: `loading.enabled`
- 데이터 없음: `renderEmpty`

LLM은 "데이터가 아직 안 왔다"와 "데이터가 비어 있다"를 같은 상태로 처리하지 말아야 합니다.

## 필수 입력

### `loading.enabled`

로딩 중일 때 `true`로 설정합니다.

예시:

```tsx
const [isLoading, setIsLoading] = useState(false);

loading={{
  enabled: isLoading,
}}
```

이 값이 `true`이면 실제 데이터 대신 스켈레톤 행이 렌더링됩니다.

### `rowCount`

표시할 스켈레톤 행 개수를 지정합니다.

예시:

```tsx
loading={{
  enabled: isLoading,
  rowCount: 5,
}}
```

### `render`

기본 shimmer 대신 커스텀 로딩 UI가 필요하면 사용합니다.

예시:

```tsx
loading={{
  enabled: isLoading,
  render: () => <CustomSkeletonRows />,
}}
```

### `renderEmpty`

데이터가 없을 때 렌더링할 빈 상태 UI를 지정합니다.

예시:

```tsx
loading={{
  enabled: isLoading,
  renderEmpty: () => (
    <tr>
      <td colSpan={4}>데이터가 없습니다</td>
    </tr>
  ),
}}
```

중요 규칙:

- `renderEmpty`는 테이블 문맥에 맞게 보통 `<tr>` / `<td>` 구조를 반환합니다.

## 최소 동작 패턴

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface User {
  id: number;
  name: string;
}

const columns: ColumnDef<User>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
];

export default function UserTable({ rows }: { rows: User[] }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      loading={{
        enabled: isLoading,
        rowCount: 5,
        renderEmpty: () => (
          <tr>
            <td colSpan={1}>데이터가 없습니다</td>
          </tr>
        ),
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "불러오는 동안 skeleton을 보여줘"
- "데이터가 없을 때 빈 상태 문구가 필요해"
- "API 응답 전까지 로딩 UI가 보여야 해"
- "빈 테이블일 때 별도 안내 문구를 보여줘"

이 경우 LLM은 아래 순서로 처리합니다.

1. 로딩 상태와 빈 상태를 별도로 판단합니다.
2. 비동기 로딩 중이면 `loading.enabled`를 연결합니다.
3. 스켈레톤 개수가 중요하면 `rowCount`를 지정합니다.
4. 기본 스켈레톤으로 충분하지 않으면 `render`를 사용합니다.
5. 데이터가 비었을 때는 `renderEmpty`를 추가합니다.

## 이 파트에서 추가해도 되는 것

- 로딩 시뮬레이션 버튼
- 빈 상태 토글
- 커스텀 아이콘이 들어간 빈 상태 UI
- 커스텀 스켈레톤 UI

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `filter`
- `editing`
- `rowActions`
- `scroll`
- `columnManager`
- `expand`

## 자주 하는 실수

### 실수 1. 로딩 중과 빈 상태를 같은 조건으로 처리

문제점:

- 아직 데이터를 불러오는 중인데 "데이터가 없습니다"가 먼저 보일 수 있습니다.

좋은 방식:

- 로딩 상태는 `loading.enabled`
- 빈 상태는 데이터 길이와 `renderEmpty`

로 분리합니다.

### 실수 2. `renderEmpty`에서 테이블 구조와 맞지 않는 마크업 반환

문제점:

- 테이블 레이아웃이 깨질 수 있습니다.

좋은 방식:

- 보통 `<tr>`와 `<td colSpan={...}>` 형태로 반환합니다.

### 실수 3. 컬럼 수에 맞지 않는 `colSpan` 사용

문제점:

- 빈 상태 셀이 일부 컬럼만 덮고 어색하게 보입니다.

좋은 방식:

- 실제 표시 컬럼 수에 맞춰 `colSpan`을 설정합니다.

### 실수 4. 긴 로딩인데 `rowCount`를 너무 적게 둠

문제점:

- 실제 표 높이와 로딩 높이가 많이 달라져 레이아웃이 출렁일 수 있습니다.

좋은 방식:

- 예상 행 수나 레이아웃 높이에 맞춰 `rowCount`를 조정합니다.

## LLM 안전 출력 템플릿

로딩 / 빈 상태 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

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
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Table
      columns={columns}
      data={rows}
      rowKey={(row) => String(row.id)}
      loading={{
        enabled: isLoading,
        rowCount: 3,
        renderEmpty: () => (
          <tr>
            <td colSpan={1}>데이터가 없습니다</td>
          </tr>
        ),
      }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 대용량 데이터와 가상 스크롤을 함께 써야 함
- 무한 로딩이 필요함
- 로딩 중에도 편집이나 선택 상태를 유지해야 함
- 컬럼 관리, 확장 행과 함께 상태 표시가 필요함
