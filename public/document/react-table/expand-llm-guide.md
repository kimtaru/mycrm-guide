# @mycrm-ui/react-table LLM 가이드

## 10. 확장 행

이 문서는 `@mycrm-ui/react-table`에서 그룹형 데이터와 자식 행을 펼쳐 보여주는 확장 행 기능을 생성하거나 수정해야 하는 AI 에이전트를 위한 가이드입니다.

이 파트는 사용자가 부서 → 팀 → 멤버처럼 계층형 데이터를 테이블로 보여주고 싶어 하거나, 부모 행을 펼쳐 자식 행을 확인하고 자식 행 선택/삭제까지 처리해야 할 때 사용합니다.

## 목적

확장 행 파트의 목적은 아래 구조를 정확히 분리하는 것입니다.

- 부모 행 타입
- 자식 행 타입
- `ExpandDef<TParent, TChild>`
- 필요 시 `childExpandDef`를 통한 재귀 중첩

LLM은 단순히 `expand` prop만 넣는 것이 아니라, 계층 데이터 모델과 각 단계의 rowKey, columns, children 매핑을 함께 맞춰야 합니다.

## 필수 입력

### `ExpandDef`

확장 행의 핵심은 `ExpandDef<TParent, TChild>`입니다.

기본 요소:

- `children`
- `childRowKey`
- `childColumns`
- `renderGroupLabel`

예시:

```tsx
const teamExpandDef: ExpandDef<Team, Member> = {
  children: (team) => team.members,
  childRowKey: (member) => String(member.id),
  childColumns: memberColumns,
  renderGroupLabel: (team) => <strong>{team.name}</strong>,
};
```

### `childExpandDef`

자식도 다시 그룹을 가지면 `childExpandDef`로 재귀 연결합니다.

예시:

```tsx
const deptExpandDef: ExpandDef<Department, Team> = {
  children: (dept) => dept.teams,
  childRowKey: (team) => team.name,
  childColumns: [] as ColumnDef<Team>[],
  childExpandDef: teamExpandDef,
};
```

### `expand.keys`

현재 펼쳐진 그룹 키 목록입니다.

예시:

```tsx
const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

expand={{
  def: deptExpandDef,
  keys: expandedKeys,
  onKeysChange: setExpandedKeys,
}}
```

### `expand.icon`

확장/축소 아이콘을 커스터마이징할 수 있습니다.

예시:

```tsx
expand={{
  def: deptExpandDef,
  keys: expandedKeys,
  onKeysChange: setExpandedKeys,
  icon: {
    expanded: <ChevronDownIcon />,
    collapsed: <ChevronRightIcon />,
  },
}}
```

### 자식 행 선택 / 삭제

확장 구조 안에서도 자식 행 선택과 삭제를 다룰 수 있습니다.

예시:

```tsx
expand={{
  def: deptExpandDef,
  keys: expandedKeys,
  onKeysChange: setExpandedKeys,
  childSelection: {
    enabled: true,
    keys: selectedChildKeys,
    onChange: setSelectedChildKeys,
  },
  childDeletable: true,
  onChildDelete: (groupKey, childKey) => {
    // 자식 삭제 처리
  },
}}
```

## 최소 동작 패턴

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, ExpandDef } from "@mycrm-ui/react-table";

interface Member {
  id: number;
  name: string;
}

interface Team {
  name: string;
  members: Member[];
}

const memberColumns: ColumnDef<Member>[] = [
  { key: "name", label: "이름", render: (member) => member.name },
];

const teamExpandDef: ExpandDef<Team, Member> = {
  children: (team) => team.members,
  childRowKey: (member) => String(member.id),
  childColumns: memberColumns,
  renderGroupLabel: (team) => <strong>{team.name}</strong>,
};

export default function TeamTable({ rows }: { rows: Team[] }) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  return (
    <Table<Team>
      columns={[] as ColumnDef<Team>[]}
      data={rows}
      rowKey={(team) => team.name}
      expand={{
        def: teamExpandDef,
        keys: expandedKeys,
        onKeysChange: setExpandedKeys,
      }}
    />
  );
}
```

## LLM 판단 규칙

사용자 요청이 아래 의미에 가깝다면 이 가이드를 사용합니다.

- "부서 아래 팀, 팀 아래 멤버를 펼쳐 보고 싶어"
- "트리형 데이터를 테이블로 보여줘"
- "부모 행을 펼치면 자식 목록이 보여야 해"
- "자식 행도 선택하거나 삭제할 수 있어야 해"

이 경우 LLM은 아래 순서로 처리합니다.

1. 데이터가 몇 단계 계층인지 파악합니다.
2. 각 단계의 타입을 나눕니다.
3. 가장 안쪽 자식 단계부터 `ExpandDef`를 작성합니다.
4. 상위 단계에서 `childExpandDef`로 재귀 연결합니다.
5. `expandedKeys` 상태를 연결합니다.
6. 필요하면 자식 선택, 자식 삭제, 아이콘 커스터마이징을 추가합니다.

## 이 파트에서 추가해도 되는 것

- 전체 펼치기 / 전체 접기 버튼
- 확장 아이콘 커스터마이징
- 자식 행 선택
- 자식 행 삭제
- 그룹 라벨에 개수 표시

## 이 파트에서 추가하지 말아야 하는 것

사용자가 명시적으로 요구하지 않았다면 아래 기능은 함께 넣지 않습니다.

- `filter`
- `editing`
- `columnManager`

## 자주 하는 실수

### 실수 1. 부모/자식 타입을 하나로 뭉쳐서 처리

문제점:

- 어떤 단계가 그룹이고 어떤 단계가 실제 리프 행인지 흐려집니다.

좋은 방식:

- 단계별 타입을 분리합니다.

### 실수 2. `childRowKey`를 안정적으로 만들지 않음

문제점:

- 자식 선택, 삭제, 확장 상태 추적이 꼬일 수 있습니다.

좋은 방식:

- 각 자식 단계에 맞는 안정적인 키를 지정합니다.

### 실수 3. 다단계 구조인데 `childExpandDef`를 빼먹음

문제점:

- 한 단계까지만 확장되고 중첩 구조가 끊깁니다.

좋은 방식:

- 자식도 그룹이면 `childExpandDef`로 재귀 연결합니다.

### 실수 4. 일반 컬럼과 확장 행 구조를 같은 방식으로 렌더링하려 함

문제점:

- 부모 그룹 행은 일반 데이터 행과 역할이 다르기 때문에 컬럼 정의가 어색해질 수 있습니다.

좋은 방식:

- 그룹 단계는 `renderGroupLabel` 중심으로 설명하고, 실제 리프 행은 `childColumns`로 정의합니다.

## LLM 안전 출력 템플릿

확장 행 요구가 있을 때는 아래 템플릿을 우선 사용합니다.

```tsx
import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, ExpandDef } from "@mycrm-ui/react-table";

interface ChildRow {
  id: number;
  name: string;
}

interface GroupRow {
  name: string;
  children: ChildRow[];
}

const childColumns: ColumnDef<ChildRow>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
];

const expandDef: ExpandDef<GroupRow, ChildRow> = {
  children: (group) => group.children,
  childRowKey: (row) => String(row.id),
  childColumns,
  renderGroupLabel: (group) => <strong>{group.name}</strong>,
};

export default function ExampleTable({ rows }: { rows: GroupRow[] }) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  return (
    <Table<GroupRow>
      columns={[] as ColumnDef<GroupRow>[]}
      data={rows}
      rowKey={(row) => row.name}
      expand={{
        def: expandDef,
        keys: expandedKeys,
        onKeysChange: setExpandedKeys,
      }}
    />
  );
}
```

## 다음 가이드로 넘어가야 하는 조건

아래 요구가 나오면 다음 파트로 넘어갑니다.

- 행 클릭과 키보드 내비게이션을 함께 다뤄야 함
- 셀 툴팁, 복사, 컨텍스트 메뉴를 같이 써야 함
- 헤더 메뉴와 확장 행 액션을 함께 설계해야 함
- CSS 슬롯 전체를 세밀하게 커스터마이징해야 함
