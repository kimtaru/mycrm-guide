# Getting Started — @mycrm-ui


## @mycrm-ui/core

### 타입

```ts
import type { ID, Key, Nullable, DeepPartial, DeepReadonly, CSSProps } from '@mycrm-ui/core'

type UserId = ID               // string | number
type Config = DeepPartial<{ a: { b: string } }>  // 중첩 옵셔널
type Readonly = DeepReadonly<{ a: { b: string } }>
```

### 유틸리티 함수

```ts
import { deepClone, deepMerge, flatten, groupBy, pick, omit } from '@mycrm-ui/core'

// 깊은 복사
const copy = deepClone(obj)

// 깊은 병합 (target에 source를 덮어씀)
const merged = deepMerge(defaults, overrides)

// 2차원 배열 평탄화
const flat = flatten([[1, 2], [3, 4]])  // [1, 2, 3, 4]

// 배열을 키 기준으로 그룹화
const grouped = groupBy(users, 'role')
const grouped2 = groupBy(users, (u) => u.name[0])

// 객체에서 특정 키만 추출/제외
const picked = pick(obj, ['id', 'name'])
const omitted = omit(obj, ['password'])
```

### 포맷터

```ts
import { formatDate, formatNumber, formatCurrency, formatPhoneNumber } from '@mycrm-ui/core'

// 날짜 포맷
formatDate(new Date(), 'YYYY-MM-DD')          // '2026-03-24'
formatDate('2026-03-24', 'YYYY년 MM월 DD일')  // '2026년 03월 24일'
formatDate(new Date(), undefined, 'en-US')    // Intl 기본 포맷

// 숫자 포맷
formatNumber(1234567)                          // '1,234,567'
formatNumber(0.1234, { style: 'percent' })     // '12%'

// 통화 포맷
formatCurrency(50000)                          // '₩50,000'
formatCurrency(100, 'USD', 'en-US')            // '$100.00'

// 전화번호 포맷 (KR)
formatPhoneNumber('01012345678')               // '010-1234-5678'
formatPhoneNumber('0212345678')                // '02-1234-5678'
```

### 에러 클래스

```ts
import { MycrmError, ValidationError, NotFoundError, createError } from '@mycrm-ui/core'

throw new ValidationError('이메일 형식이 올바르지 않습니다.', { field: 'email' })
throw new NotFoundError('사용자를 찾을 수 없습니다.')

// 팩토리 함수
const err = createError('PERMISSION_DENIED', '권한이 없습니다.')

// 에러 판별
if (err instanceof MycrmError) {
  console.log(err.code, err.message, err.details)
}
```

---

## @mycrm-ui/react

공통 React 컴포넌트, 컨텍스트, 훅 모음입니다.

### 컴포넌트

```tsx
import { Portal, ErrorBoundary } from '@mycrm-ui/react'

// Portal: 특정 DOM 노드에 자식을 렌더링
<Portal container={document.body}>
  <Modal />
</Portal>

// ErrorBoundary: 컴포넌트 에러 경계
<ErrorBoundary
  fallback={(error) => <div>오류 발생: {error.message}</div>}
  onError={(error, info) => console.error(error, info)}
>
  <App />
</ErrorBoundary>
```

### 컨텍스트

```tsx
import { ThemeProvider, useTheme, LocaleProvider, useLocale } from '@mycrm-ui/react'

// 테마
<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>

function MyComponent() {
  const { theme, setTheme } = useTheme()
  return <button onClick={() => setTheme('dark')}>다크 모드</button>
}

// 로케일
<LocaleProvider defaultLocale="ko-KR">
  <App />
</LocaleProvider>

function MyComponent() {
  const { locale, setLocale } = useLocale()
}
```

### 훅

```ts
import { useDebounce, useClickOutside, useResizeObserver, useId } from '@mycrm-ui/react'

// 값 디바운스
const debouncedSearch = useDebounce(searchTerm, 300)

// 외부 클릭 감지
const ref = useRef<HTMLDivElement>(null)
useClickOutside(ref, () => setOpen(false))

// 엘리먼트 크기 감지
const size = useResizeObserver(ref)  // { width, height } | null

// 고유 ID 생성
const id = useId('input')  // 'input-abc123'
```

---

## @mycrm-ui/react-table

React 19 / React 18 에서 사용 가능한 테이블 컴포넌트입니다.

### 기본 사용

```tsx
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  { key: 'name', label: '이름', render: (row) => row.name },
  { key: 'email', label: '이메일', render: (row) => row.email },
  { key: 'role', label: '역할', render: (row) => row.role },
]

const data: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자' },
  { id: 2, name: '김철수', email: 'kim@example.com', role: '사용자' },
]

export default function UserTable() {
  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
    />
  )
}
```

### 정렬

단일 정렬과 멀티 정렬을 모두 지원합니다.

```tsx
import { useState } from 'react'
import type { SortState } from '@mycrm-ui/react-table'

// 단일 정렬
const [sort, setSort] = useState<SortState | null>(null)

<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  sorting={{
    sort,
    onSortChange: setSort,
  }}
/>

// 멀티 정렬
const [sorts, setSorts] = useState<SortState[]>([])

<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  sorting={{
    sorts,
    onSortsChange: setSorts,
    icons: {
      none: <SortIcon />,
      asc: <AscIcon />,
      desc: <DescIcon />,
    },
  }}
/>
```

### 체크박스 선택

```tsx
const [selectedKeys, setSelectedKeys] = useState<string[]>([])

<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  selection={{
    enabled: true,
    keys: selectedKeys,
    onChange: setSelectedKeys,
  }}
/>
```

### 필터

```tsx
const [filterValues, setFilterValues] = useState<Record<string, string>>({})

// ColumnDef에서 filterType 지정
const columns: ColumnDef<User>[] = [
  { key: 'name', label: '이름', render: (row) => row.name, filterType: 'text' },
  {
    key: 'role', label: '역할', render: (row) => row.role,
    filterType: 'select',
    filterOptions: [
      { label: '관리자', value: 'admin' },
      { label: '사용자', value: 'user' },
    ],
  },
]

<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  filter={{
    enabled: true,
    values: filterValues,
    onChange: (colKey, value) =>
      setFilterValues((prev) => ({ ...prev, [colKey]: value })),
    debounce: 300,
  }}
/>
```

### 행 삭제 / 추가

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  rowActions={{
    deletable: true,
    onDelete: (rowKey) => console.log('삭제:', rowKey),
    deleteIcon: <TrashIcon />,
    adding: true,
    onAdd: (values) => console.log('추가:', values),
    onAddCancel: () => console.log('추가 취소'),
    addIcon: <PlusIcon />,
  }}
/>
```

### 인라인 편집

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  editing={{
    onCellChange: (rowKey, colKey, value) =>
      console.log('변경:', rowKey, colKey, value),
    icon: <EditIcon />,
    onValidationError: (error, rowKey, colKey) =>
      console.error('검증 오류:', error, rowKey, colKey),
  }}
/>
```

커스텀 편집 셀은 `ColumnDef`에서 설정합니다.

```tsx
const columns: ColumnDef<User>[] = [
  {
    key: 'name',
    label: '이름',
    render: (row) => row.name,
    editable: true,
    validate: (value) => value.trim() ? null : '이름은 필수입니다.',
    renderEditCell: ({ value, onChange, onSave, onCancel, error }) => (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onSave}
        onKeyDown={(e) => e.key === 'Escape' && onCancel()}
      />
    ),
  },
]
```

### 로딩 / 빈 상태

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  loading={{
    enabled: isLoading,
    rowCount: 5,          // 스켈레톤 행 수
    emptyText: '데이터가 없습니다.',
    renderEmpty: () => <EmptyState />,
    render: () => <CustomSkeleton />,
  }}
/>
```

### 가상 스크롤 (대용량 데이터)

```tsx
<Table
  columns={columns}
  data={largeData}
  rowKey={(row) => String(row.id)}
  scroll={{
    virtual: true,
    rowHeight: 48,
    overscan: 5,
    stickyHeader: true,
    onLoadMore: fetchNextPage,
    hasMore: true,
    loadingMore: isFetchingNextPage,
    renderLoadingMore: () => <Spinner />,
    threshold: 200,       // 하단에서 몇 px 남았을 때 onLoadMore 호출
  }}
/>
```

### 컬럼 관리 (숨김 / 순서 / 고정 / 리사이즈)

```tsx
const [hiddenKeys, setHiddenKeys] = useState<string[]>([])
const [order, setOrder] = useState<string[]>([])
const [pinned, setPinned] = useState<{ left?: string[]; right?: string[] }>({})
const [widths, setWidths] = useState<Record<string, number>>({})

<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  columnManager={{
    hiddenKeys,
    onHiddenKeysChange: setHiddenKeys,
    order,
    onOrderChange: setOrder,
    pinned,
    onPinnedChange: setPinned,
    resizable: true,
    widths,
    onWidthChange: (colKey, width) =>
      setWidths((prev) => ({ ...prev, [colKey]: width })),
    pinnedBg: { header: '#f0f0f0', body: '#ffffff' },
    noHeaderMenu: false,  // true로 설정 시 헤더 컨텍스트 메뉴 비활성화
  }}
/>
```

### 확장 행 (그룹 데이터)

`ExpandDef`는 그룹(부모)과 자식 행을 구분합니다.

```tsx
import type { ExpandDef } from '@mycrm-ui/react-table'

interface Order {
  id: number
  customer: string
  items: OrderItem[]
}
interface OrderItem {
  id: number
  product: string
  qty: number
}

const expandDef: ExpandDef<Order, OrderItem> = {
  renderGroupLabel: (group) => <strong>{group.customer}</strong>,
  children: (group) => group.items,
  childRowKey: (item) => String(item.id),
  childColumns: [
    { key: 'product', label: '상품', render: (item) => item.product },
    { key: 'qty', label: '수량', render: (item) => item.qty },
  ],
}

const [expandedKeys, setExpandedKeys] = useState<string[]>([])

<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  expand={{
    def: expandDef,
    keys: expandedKeys,
    onKeysChange: setExpandedKeys,
    icon: {
      expanded: <ChevronDownIcon />,
      collapsed: <ChevronRightIcon />,
    },
    childSelection: {
      enabled: true,
      keys: selectedChildKeys,
      onChange: setSelectedChildKeys,
    },
    childDeletable: true,
    onChildDelete: (groupKey, childKey) =>
      console.log('자식 삭제:', groupKey, childKey),
  }}
/>
```

### 행 클릭 / 키보드 내비게이션

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  onRowClick={(row, rowKey, event) => console.log('클릭:', row)}
  onRowDoubleClick={(row, rowKey, event) => console.log('더블클릭:', row)}
  rowClassName={(row, rowKey) => row.role === 'admin' ? 'admin-row' : undefined}
  keyboardNavigation={true}
  onFocusedCellChange={(cell) => console.log('포커스:', cell)}
/>
```

### 툴팁 / 복사

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  tooltip={true}
  copyable={true}
  onCellCopy={(rowKey, colKey, value) => console.log('복사:', value)}
  cellContextMenuItems={[
    {
      label: '클립보드에 복사',
      onClick: (rowKey, colKey, value) => navigator.clipboard.writeText(value),
    },
  ]}
/>
```

### 헤더 메뉴

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  headerMenuItems={[
    { label: 'CSV 내보내기', onClick: () => exportCsv() },
    { label: '새로고침', onClick: () => refetch() },
  ]}
  headerMenuIcon={<MenuIcon />}
/>
```

### CSS 커스터마이징 (`classNames`)

모든 시각적 요소에 className 슬롯이 제공됩니다.

```tsx
<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  classNames={{
    table: 'my-table',
    thead: 'my-thead',
    th: 'my-th',
    tr: 'my-row',
    td: 'my-cell',
    tdEditing: 'my-cell--editing',
    checkbox: 'my-checkbox',
    filterRow: 'my-filter-row',
    filterInput: 'my-filter-input',
    groupRow: 'my-group-row',
    childRow: 'my-child-row',
    editError: 'my-edit-error',
    tdFocused: 'my-cell--focused',
  }}
/>
```

---

## ColumnDef 옵션

```ts
const columns: ColumnDef<User>[] = [
  {
    key: 'name',
    label: '이름',                      // 헤더 표시 텍스트
    render: (row) => row.name,
    width: '200px',                     // CSS 너비 (px, %, 등)
    minWidth: 80,                       // 최소 너비 (px)
    sortable: true,
    filterType: 'text',                 // 'text' | 'select' | 'dateRange' | 'numberRange'
    filterOptions: [                    // filterType: 'select' 일 때
      { label: '관리자', value: 'admin' },
    ],
    filterPlaceholder: '이름 검색...',
    editable: true,
    insertable: true,                   // 행 추가 시 입력 가능 여부
    align: 'left',                      // 'left' | 'center' | 'right'
    copyable: true,                     // 셀 복사 가능
    validate: (value) => value.trim() ? null : '필수 항목입니다.',
    renderEditCell: (props) => <CustomInput {...props} />,
    onValidationError: (error) => console.warn(error),
  },
]
```
