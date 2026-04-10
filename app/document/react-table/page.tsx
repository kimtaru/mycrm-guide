import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import Link from "next/link";
import TocAside from "../toc-aside";
import type { TocGroup } from "../toc-aside";
import BasicDemo from "./basic-demo";
import { SingleSortDemo, MultiSortDemo } from "./sorting-demo";
import SelectionDemo from "./selection-demo";
import FilterDemo from "./filter-demo";
import RowActionsDemo from "./row-actions-demo";
import EditingDemo from "./editing-demo";
import LoadingDemo from "./loading-demo";
import VirtualScrollDemo from "./virtual-scroll-demo";
import ColumnManagerDemo from "./column-manager-demo";
import ExpandDemo from "./expand-demo";
import RowEventsDemo from "./row-events-demo";
import TooltipCopyDemo from "./tooltip-copy-demo";
import HeaderMenuDemo from "./header-menu-demo";
import CssCustomDemo from "./css-custom-demo";
import CssClassnamesTable from "./css-classnames-table";

const BASIC_CODE = `import { Table } from '@mycrm-ui/react-table'
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
  { id: 3, name: '이영희', email: 'lee@example.com', role: '사용자' },
]

export default function UserTable() {
  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
    />
  )
}`;

const SINGLE_SORT_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef, SortState } from '@mycrm-ui/react-table'

interface User {
  id: number
  name: string
  email: string
  role: string
  age: number
}

const columns: ColumnDef<User>[] = [
  { key: 'name', label: '이름', sortable: true, render: (row) => row.name },
  { key: 'email', label: '이메일', sortable: true, render: (row) => row.email },
  { key: 'role', label: '역할', sortable: true, render: (row) => row.role },
  { key: 'age', label: '나이', sortable: true, render: (row) => row.age },
]

const data: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자', age: 35 },
  { id: 2, name: '김철수', email: 'kim@example.com', role: '사용자', age: 28 },
  { id: 3, name: '이영희', email: 'lee@example.com', role: '사용자', age: 42 },
]

export default function SingleSortExample() {
  const [sort, setSort] = useState<SortState | null>(null)

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      sorting={{
        sort,
        onSortChange: setSort,
      }}
    />
  )
}`;

const MULTI_SORT_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef, SortState } from '@mycrm-ui/react-table'

interface Product {
  id: number
  category: string
  brand: string
  price: number
}

const columns: ColumnDef<Product>[] = [
  { key: 'category', label: '카테고리', sortable: true, render: (row) => row.category },
  { key: 'brand', label: '브랜드', sortable: true, render: (row) => row.brand },
  { key: 'price', label: '가격', sortable: true,
    render: (row) => \`\${row.price.toLocaleString()}원\` },
]

const data: Product[] = [
  { id: 1, category: '노트북', brand: '삼성', price: 1500000 },
  { id: 2, category: '노트북', brand: 'LG', price: 1500000 },
  { id: 3, category: '노트북', brand: '삼성', price: 1200000 },
  { id: 4, category: '모니터', brand: 'LG', price: 450000 },
  { id: 5, category: '모니터', brand: '삼성', price: 450000 },
  { id: 6, category: '모니터', brand: 'LG', price: 320000 },
]

export default function MultiSortExample() {
  // Shift + 헤더 클릭으로 멀티 정렬
  const [sorts, setSorts] = useState<SortState[]>([])

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      sorting={{
        sorts,
        onSortsChange: setSorts,
      }}
    />
  )
}`;

const SELECTION_CODE = `import { useState } from 'react'
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
  { id: 3, name: '이영희', email: 'lee@example.com', role: '사용자' },
  { id: 4, name: '박민수', email: 'park@example.com', role: '편집자' },
  { id: 5, name: '최지은', email: 'choi@example.com', role: '사용자' },
]

export default function SelectionExample() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  return (
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
  )
}`;

const FILTER_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const columns: ColumnDef<User>[] = [
  {
    key: 'name',
    label: '이름',
    render: (row) => row.name,
    filterType: 'text',
    filterPlaceholder: '이름 검색...',
  },
  {
    key: 'email',
    label: '이메일',
    render: (row) => row.email,
    filterType: 'text',
    filterPlaceholder: '이메일 검색...',
  },
  {
    key: 'role',
    label: '역할',
    render: (row) => row.role,
    filterType: 'select',
    filterOptions: [
      { label: '관리자', value: '관리자' },
      { label: '사용자', value: '사용자' },
      { label: '편집자', value: '편집자' },
    ],
  },
]

const data: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자' },
  { id: 2, name: '김철수', email: 'kim@example.com', role: '사용자' },
  { id: 3, name: '이영희', email: 'lee@example.com', role: '사용자' },
  { id: 4, name: '박민수', email: 'park@example.com', role: '편집자' },
  { id: 5, name: '최지은', email: 'choi@example.com', role: '사용자' },
]

export default function FilterExample() {
  const [filterEnabled, setFilterEnabled] = useState(true)
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      filter={{
        enabled: filterEnabled,
        values: filterValues,
        onChange: (colKey, value) =>
          setFilterValues((prev) => ({ ...prev, [colKey]: value })),
        debounce: 300,
      }}
      headerMenuItems={[
        {
          label: filterEnabled ? '필터 숨기기' : '필터 표시',
          onClick: () => setFilterEnabled((v) => !v),
        },
      ]}
      headerMenuIcon={<MoreHorizIcon />}
    />
  )
}`;

const ROW_ACTIONS_CODE = `import { useMemo, useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const ROLES = ['관리자', '편집자', '사용자']

const initialData: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자' },
  { id: 2, name: '김철수', email: 'kim@example.com', role: '사용자' },
  { id: 3, name: '이영희', email: 'lee@example.com', role: '사용자' },
]

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p style={{ color: 'red', fontSize: 11, marginTop: 2 }}>{message}</p>
}

export default function RowActionsExample() {
  const [data, setData] = useState<User[]>(initialData)
  const [nextId, setNextId] = useState(4)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [addErrors, setAddErrors] = useState<Record<string, string>>({})

  // 에러 상태를 renderInsertCell에서 참조하기 위해 useMemo로 정의
  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      key: 'name',
      label: '이름',
      insertable: true,
      render: (row) => row.name,
      renderInsertCell: ({ value, onChange, onConfirm }) => (
        <div>
          <input
            placeholder="이름"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              if (addErrors.name) setAddErrors((prev) => ({ ...prev, name: '' }))
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') onConfirm() }}
            style={{ borderColor: addErrors.name ? 'red' : undefined }}
          />
          <FieldError message={addErrors.name} />
        </div>
      ),
    },
    {
      key: 'email',
      label: '이메일',
      insertable: true,
      render: (row) => row.email,
      renderInsertCell: ({ value, onChange, onConfirm }) => (
        <div>
          <input
            placeholder="이메일"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              if (addErrors.email) setAddErrors((prev) => ({ ...prev, email: '' }))
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') onConfirm() }}
            style={{ borderColor: addErrors.email ? 'red' : undefined }}
          />
          <FieldError message={addErrors.email} />
        </div>
      ),
    },
    {
      key: 'role',
      label: '역할',
      insertable: true,
      render: (row) => row.role,
      renderInsertCell: ({ value, onChange }) => (
        <div>
          <select
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              if (addErrors.role) setAddErrors((prev) => ({ ...prev, role: '' }))
            }}
            style={{ borderColor: addErrors.role ? 'red' : undefined }}
          >
            <option value="" disabled>역할 선택</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <FieldError message={addErrors.role} />
        </div>
      ),
    },
  ], [addErrors])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setIsAdding(true)} disabled={isAdding}>추가</button>
        <button
          onClick={() => {
            setData((prev) =>
              prev.filter((r) => !selectedKeys.includes(String(r.id))))
            setSelectedKeys([])
          }}
          disabled={selectedKeys.length === 0}
        >
          삭제 ({selectedKeys.length})
        </button>
      </div>

      <Table
        columns={columns}
        data={data}
        rowKey={(row) => String(row.id)}
        selection={{
          enabled: true,
          keys: selectedKeys,
          onChange: setSelectedKeys,
        }}
        rowActions={{
          deletable: true,
          onDelete: (rowKey) =>
            setData((prev) => prev.filter((r) => String(r.id) !== rowKey)),
          adding: isAdding,
          onAdd: (values) => {
            const errors: Record<string, string> = {}
            if (!values.name?.trim()) errors.name = '이름을 입력해주세요.'
            if (!values.email?.trim()) {
              errors.email = '이메일을 입력해주세요.'
            } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email)) {
              errors.email = '올바른 이메일 형식을 입력해주세요.'
            }
            if (!values.role) errors.role = '역할을 선택해주세요.'

            if (Object.keys(errors).length > 0) {
              setAddErrors(errors)
              return
            }

            setAddErrors({})
            setData((prev) => [
              ...prev,
              { id: nextId, name: values.name, email: values.email, role: values.role },
            ])
            setNextId((n) => n + 1)
            setIsAdding(false)
          },
          onAddCancel: () => {
            setAddErrors({})
            setIsAdding(false)
          },
        }}
      />
    </>
  )
}`;

const EDITING_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef, EditCellProps } from '@mycrm-ui/react-table'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const initialData: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자' },
  { id: 2, name: '김철수', email: 'kim@example.com', role: '사용자' },
  { id: 3, name: '이영희', email: 'lee@example.com', role: '사용자' },
]

// 공통 편집 UI를 별도 함수로 분리
// validate 실패 시 error에 에러 메시지가 전달됨
function renderEditCellUI({ value, onChange, onSave, onCancel, error }: EditCellProps) {
  return (
    <div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <input value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSave()
            if (e.key === 'Escape') onCancel()
          }}
          style={{ borderColor: error ? 'red' : undefined }}
          autoFocus />
        <button onClick={onSave}>✓</button>
        <button onClick={onCancel}>✕</button>
      </div>
      {error && <p style={{ color: 'red', fontSize: 11 }}>{error}</p>}
    </div>
  )
}

const columns: ColumnDef<User>[] = [
  {
    key: 'name',
    label: '이름',
    render: (row) => row.name,
    editable: true,
    validate: (value) => value.trim() ? null : '이름은 필수입니다.',
  },
  {
    key: 'email',
    label: '이메일',
    render: (row) => row.email,
    editable: true,
    validate: (value) =>
      !value.trim()
        ? '이메일은 필수입니다.'
        : !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)
          ? '올바른 이메일 형식이 아닙니다.'
          : null,
  },
  {
    key: 'role',
    label: '역할',
    render: (row) => row.role,
    editable: true,
    // renderEditCell: 이 컬럼만 개별 편집 UI 적용 (editing.renderCell보다 우선)
    renderEditCell: ({ value, onChange, onSave, onCancel }) => (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <select value={value}
          onChange={(e) => onChange(e.target.value)} autoFocus>
          <option value="관리자">관리자</option>
          <option value="사용자">사용자</option>
          <option value="편집자">편집자</option>
        </select>
        <button onClick={onSave}>✓</button>
        <button onClick={onCancel}>✕</button>
      </div>
    ),
  },
]

export default function EditingExample() {
  const [data, setData] = useState<User[]>(initialData)

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      editing={{
        onCellChange: (rowKey, colKey, value) =>
          setData((prev) =>
            prev.map((r) =>
              String(r.id) === rowKey ? { ...r, [colKey]: value } : r)),
        icon: <EditIcon />,
        // renderCell에 함수 참조 전달 (인라인보다 깔끔)
        renderCell: renderEditCellUI,
      }}
    />
  )
}`;

const LOADING_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const data: User[] = [
  { id: 1, name: '홍길동', email: 'hong@example.com', role: '관리자' },
  { id: 2, name: '김철수', email: 'kim@example.com', role: '사용자' },
]

const columns: ColumnDef<User>[] = [
  { key: 'name', label: '이름', render: (row) => row.name },
  { key: 'email', label: '이메일', render: (row) => row.email },
  { key: 'role', label: '역할', render: (row) => row.role },
]

export default function LoadingExample() {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  const handleLoad = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <Table
      columns={columns}
      data={isEmpty ? [] : data}
      rowKey={(row) => String(row.id)}
      loading={{
        // enabled: true → 스켈레톤 행 표시
        enabled: isLoading,
        // rowCount: 스켈레톤 행 개수 (기본값 3)
        rowCount: 5,
        // renderEmpty: 데이터가 없을 때 렌더링 — <tr>/<td>로 반환해야 함
        renderEmpty: () => (
          <tr>
            <td colSpan={3} style={{ textAlign: 'center', padding: '48px 0', color: '#888' }}>
              데이터가 없습니다.
            </td>
          </tr>
        ),
        // render: 커스텀 스켈레톤 UI (생략 시 기본 shimmer 스켈레톤 사용)
        // render: () => <CustomSkeleton />,
      }}
    />
  )
}`;

const VIRTUAL_SCROLL_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

interface Item {
  id: number
  name: string
  email: string
  department: string
}

const columns: ColumnDef<Item>[] = [
  { key: 'name', label: '이름', render: (row) => row.name },
  { key: 'email', label: '이메일', render: (row) => row.email },
  { key: 'department', label: '부서', render: (row) => row.department },
]

export default function VirtualScrollExample() {
  const [data, setData] = useState<Item[]>(generateItems(50))
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    setTimeout(() => {
      setData((prev) => {
        const next = [...prev, ...generateItems(50, prev.length + 1)]
        setHasMore(next.length < 300)
        setLoadingMore(false)
        return next
      })
    }, 600)
  }

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      scroll={{
        // virtual: true → DOM에 보이는 행만 렌더링 (대용량 최적화)
        virtual: true,
        // rowHeight: 각 행의 고정 높이(px) — 가상 스크롤에 필수
        rowHeight: 48,
        // overscan: 뷰포트 밖 추가 렌더링 행 수 (기본값 5)
        overscan: 5,
        // stickyHeader: 스크롤 시 헤더 고정
        stickyHeader: true,
        // onLoadMore: 끝에 도달하면 호출 (무한 스크롤)
        onLoadMore: handleLoadMore,
        // hasMore: 추가 데이터 존재 여부
        hasMore,
        // loadingMore: 로딩 중 여부 (로딩 행 표시 + 중복 호출 방지)
        loadingMore,
        // renderLoadingMore: 로딩 중 표시할 커스텀 UI
        renderLoadingMore: () => (
          <div style={{ textAlign: 'center', padding: '8px', color: '#888', fontSize: '12px' }}>
            로딩 중...
          </div>
        ),
      }}
      classNames={{
        // wrap에 고정 높이 + overflow-y: auto 또는 scroll 필수
        wrap: 'h-[380px] overflow-y-auto',
        table: 'w-full text-sm',
        thead: 'bg-surface-container-low',
        th: 'px-4 py-3 text-left font-semibold',
        tr: 'border-t border-outline-variant/20',
        td: 'px-4 py-3',
      }}
    />
  )
}`;

const COLUMN_MANAGER_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

interface Employee {
  id: number
  name: string
  email: string
  department: string
  role: string
  joinDate: string
}

const columns: ColumnDef<Employee>[] = [
  { key: 'name', label: '이름', width: '120px', render: (row) => row.name },
  { key: 'email', label: '이메일', width: '200px', render: (row) => row.email },
  { key: 'department', label: '부서', width: '100px', render: (row) => row.department },
  { key: 'role', label: '직책', width: '100px', render: (row) => row.role },
  { key: 'joinDate', label: '입사일', width: '120px', render: (row) => row.joinDate },
]

export default function ColumnManagerExample() {
  // 숨김 컬럼 키 배열
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([])
  // 컬럼 순서 (빈 배열이면 기본 순서)
  const [order, setOrder] = useState<string[]>([])
  // 고정(pin) 컬럼 — left/right 각각 키 배열
  const [pinned, setPinned] = useState<{ left?: string[]; right?: string[] }>({})
  // 리사이즈된 컬럼 너비
  const [widths, setWidths] = useState<Record<string, number>>({})

  return (
    <Table
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      // columnManager를 설정하면 헤더 메뉴에 "컬럼 관리" 항목이 자동 추가됨
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
      }}
      // 헤더 메뉴 아이콘 — 클릭 시 드롭다운이 열리고,
      // columnManager가 설정되어 있으면 "컬럼 관리" 버튼이 자동 포함됨
      headerMenuIcon={
        <span className="material-symbols-outlined text-[14px]">more_horiz</span>
      }
      // 헤더 메뉴 드롭다운 및 컬럼 관리 모달 스타일링
      classNames={{
        // 헤더 메뉴 (⋯ 버튼 → 드롭다운)
        headerMenuBtn: 'header-menu-btn',
        headerMenuDropdown: 'header-menu-dropdown',
        headerMenuItem: 'header-menu-item',
        // 컬럼 관리 모달
        columnManagerBackdrop: 'column-manager-backdrop',
        columnManager: 'column-manager',
        columnManagerHeader: 'column-manager-header',
        columnManagerTitle: 'column-manager-title',
        columnManagerCloseBtn: 'column-manager-close-btn',
        columnManagerSelectAllBtn: 'column-manager-select-all-btn',
        columnManagerDeselectAllBtn: 'column-manager-deselect-all-btn',
        columnManagerBody: 'column-manager-body',
        // 컬럼 토글 항목 (체크박스 + 드래그 순서 변경)
        columnToggle: 'column-toggle',
        columnToggleActive: 'column-toggle-active',
        columnToggleCheckbox: 'column-toggle-checkbox',
      }}
    />
  )
}`;

const EXPAND_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef, ExpandDef } from '@mycrm-ui/react-table'

// 리프 행
interface Member {
  id: number
  name: string
  role: string
  email: string
}

// 2단계 그룹
interface Team {
  name: string
  members: Member[]
}

// 1단계 그룹
interface Department {
  name: string
  teams: Team[]
}

// 리프 행에 표시할 컬럼
const memberColumns: ColumnDef<Member>[] = [
  { key: 'name', label: '이름', width: '120px', render: (m) => m.name },
  { key: 'role', label: '직책', width: '100px', render: (m) => m.role },
  { key: 'email', label: '이메일', width: '200px', render: (m) => m.email },
]

// 2단계: 팀 → 멤버
const teamExpandDef: ExpandDef<Team, Member> = {
  children: (team) => team.members,
  childRowKey: (m) => String(m.id),
  childColumns: memberColumns,
  renderGroupLabel: (team) => (
    <><strong>{team.name}</strong> ({team.members.length}명)</>
  ),
}

// 1단계: 부서 → 팀 (childExpandDef로 다단계 연결)
const deptExpandDef: ExpandDef<Department, Team> = {
  children: (dept) => dept.teams,
  childRowKey: (team) => team.name,
  childColumns: [] as ColumnDef<Team>[],   // 팀은 그룹 행이므로 컬럼 불필요
  renderGroupLabel: (dept) => (
    <><strong>{dept.name}</strong> ({dept.teams.length}팀)</>
  ),
  childExpandDef: teamExpandDef,           // 재귀 연결
}

const departments: Department[] = [
  {
    name: '개발본부',
    teams: [
      {
        name: '프론트엔드',
        members: [
          { id: 1, name: '홍길동', role: '팀장', email: 'hong@example.com' },
          { id: 2, name: '김철수', role: '시니어', email: 'kim@example.com' },
          { id: 3, name: '박영희', role: '주니어', email: 'park@example.com' },
        ],
      },
      {
        name: '백엔드',
        members: [
          { id: 4, name: '이민호', role: '팀장', email: 'lee@example.com' },
          { id: 5, name: '최지은', role: '시니어', email: 'choi@example.com' },
        ],
      },
    ],
  },
  {
    name: '디자인본부',
    teams: [
      {
        name: 'UX',
        members: [
          { id: 6, name: '정수민', role: '팀장', email: 'jung@example.com' },
          { id: 7, name: '한예린', role: '시니어', email: 'han@example.com' },
        ],
      },
    ],
  },
]

export default function ExpandExample() {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const [selectedChildKeys, setSelectedChildKeys] = useState<string[]>([])

  return (
    <Table<Department>
      columns={[] as ColumnDef<Department>[]}
      data={departments}
      rowKey={(dept) => dept.name}
      expand={{
        def: deptExpandDef,
        keys: expandedKeys,
        onKeysChange: setExpandedKeys,
        icon: {
          expanded: <ChevronDownIcon />,
          collapsed: <ChevronRightIcon />,
        },
        // 리프 행 체크박스 선택
        childSelection: {
          enabled: true,
          keys: selectedChildKeys,
          onChange: setSelectedChildKeys,
        },
        // 리프 행 삭제 버튼
        childDeletable: true,
        onChildDelete: (groupKey, childKey) =>
          console.log('삭제:', groupKey, childKey),
      }}
    />
  )
}`;

const ROW_EVENTS_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

interface Employee {
  id: number
  name: string
  department: string
  role: string
}

const columns: ColumnDef<Employee>[] = [
  { key: 'name', label: '이름', width: '130px', render: (row) => row.name },
  { key: 'department', label: '부서', width: '120px', render: (row) => row.department },
  // editable: true — 포커스 후 Enter 키로 편집 시작
  { key: 'role', label: '직책', width: '140px', editable: true, render: (row) => row.role },
]

const data: Employee[] = [
  { id: 1, name: '홍길동', department: '개발', role: '팀장' },
  { id: 2, name: '김철수', department: '개발', role: '시니어' },
  { id: 3, name: '이영희', department: '디자인', role: '팀장' },
]

export default function RowEventsExample() {
  const [data, setData] = useState(initialData)
  const [focusedCell, setFocusedCell] = useState<{ rowKey: string; colKey: string } | null>(null)

  return (
    <Table<Employee>
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      // 행 단일 클릭 핸들러
      onRowClick={(row, rowKey, event) => console.log('클릭:', row.name)}
      // 행 더블클릭 핸들러
      onRowDoubleClick={(row, rowKey, event) => console.log('더블클릭:', row.name)}
      // 조건부 행 CSS 클래스
      rowClassName={(row) => row.role === '팀장' ? 'font-semibold' : undefined}
      // ↑↓ 키보드 내비게이션 활성화
      keyboardNavigation={true}
      // 포커스된 셀 변경 콜백
      onFocusedCellChange={(cell) => setFocusedCell(cell)}
      // Enter 키로 편집 — renderCell로 저장/취소 UI 커스터마이징
      editing={{
        onCellChange: (rowKey, colKey, value) => {
          setData((prev) =>
            prev.map((r) => String(r.id) === rowKey ? { ...r, [colKey]: value } : r)
          )
        },
        renderCell: ({ value, onChange, onSave, onCancel }) => (
          <div className="flex items-center gap-1.5">
            <input
              className="rounded border px-2 py-1 text-sm"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSave(); if (e.key === 'Escape') onCancel() }}
              autoFocus
            />
            <button onClick={onSave}>✓</button>
            <button onClick={onCancel}>✗</button>
          </div>
        ),
      }}
    />
  )
}`;

const TOOLTIP_COPY_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

interface Product {
  id: number
  name: string
  sku: string
  category: string
  price: string
}

const columns: ColumnDef<Product>[] = [
  {
    key: 'name', label: '상품명', width: '200px',
    // copyable: true — 우클릭 시 복사 메뉴 표시
    copyable: true,
    render: (row) => row.name,
  },
  { key: 'sku', label: 'SKU', width: '160px', copyable: true, render: (row) => row.sku },
  { key: 'category', label: '카테고리', width: '110px', render: (row) => row.category },
  { key: 'price', label: '가격', width: '120px', copyable: true, render: (row) => row.price },
]

const data: Product[] = [
  { id: 1, name: 'MacBook Pro 14인치 M3 Pro 칩 36GB RAM 512GB SSD', sku: 'MBP-14-M3PRO-36-512', category: '노트북', price: '2,990,000원' },
  { id: 2, name: 'iPhone 15 Pro Max 256GB 티타늄 내추럴', sku: 'IPH-15PROMAX-256-NT', category: '스마트폰', price: '1,890,000원' },
  { id: 3, name: 'iPad Air M2 256GB Wi-Fi + Cellular 스타라이트', sku: 'IPA-M2-256-CELL-SL', category: '태블릿', price: '1,149,000원' },
]

export default function TooltipCopyExample() {
  const [copyLog, setCopyLog] = useState<string[]>([])

  return (
    <Table<Product>
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      // 셀 호버 시 overflow 텍스트를 툴팁으로 표시
      tooltip={true}
      // copyable 열에서 우클릭 시 복사 메뉴 표시
      copyable={true}
      // 복사 발생 시 콜백
      onCellCopy={(rowKey, colKey, value) => {
        setCopyLog((prev) => [\`\${colKey}: \${value}\`, ...prev].slice(0, 5))
      }}
    />
  )
}`;

const HEADER_MENU_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef, SortState } from '@mycrm-ui/react-table'

interface Employee {
  id: number
  name: string
  role: string
  department: string
}

const columns: ColumnDef<Employee>[] = [
  { key: 'name', label: '이름', sortable: true, filterType: 'text', render: (row) => row.name },
  { key: 'role', label: '역할', sortable: true, filterType: 'text', render: (row) => row.role },
  { key: 'department', label: '부서', sortable: true, filterType: 'text', render: (row) => row.department },
]

const data: Employee[] = [
  { id: 1, name: '홍길동', role: '개발자', department: '개발팀' },
  { id: 2, name: '김철수', role: '디자이너', department: '디자인팀' },
  { id: 3, name: '이영희', role: '기획자', department: '기획팀' },
]

export default function HeaderMenuExample() {
  const [sorts, setSorts] = useState<SortState[]>([])
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState<Record<string, string>>({})

  return (
    <Table<Employee>
      columns={columns}
      data={data}
      rowKey={(row) => String(row.id)}
      sorting={{ sorts, onSortsChange: setSorts }}
      filter={{
        enabled: showFilter,
        values: filters,
        onChange: (key, val) => setFilters((prev) => ({ ...prev, [key]: val })),
      }}
      // 헤더 우상단에 표시할 아이콘 — 클릭 시 드롭다운 메뉴가 열림
      headerMenuIcon={
        <span className="material-symbols-outlined">more_horiz</span>
      }
      // columnManager를 함께 설정하면 "컬럼 관리" 항목이 자동으로 추가됨
      headerMenuItems={[
        {
          label: showFilter ? '필터 숨기기' : '필터 표시',
          onClick: () => setShowFilter((v) => !v),
        },
        {
          label: '필터 초기화',
          onClick: () => setFilters({}),
        },
        {
          label: '정렬 초기화',
          onClick: () => setSorts([]),
        },
      ]}
    />
  )
}`;

async function highlight(code: string) {
  return codeToHtml(code, { lang: "tsx", theme: "one-dark-pro" });
}

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table - mycrm UI",
  description: "@mycrm-ui/react-table 패키지 문서입니다.",
};

const TOC_GROUPS: TocGroup[] = [
  {
    title: "@mycrm-ui/react-table",
    items: [
      { id: "react-table-basic", label: "기본 사용" },
      { id: "react-table-sorting", label: "정렬" },
      { id: "react-table-selection", label: "체크박스 선택" },
      { id: "react-table-filter", label: "필터" },
      { id: "react-table-row-actions", label: "행 삭제 / 추가" },
      { id: "react-table-editing", label: "인라인 편집" },
      { id: "react-table-loading", label: "로딩 / 빈 상태" },
      { id: "react-table-virtual-scroll", label: "가상 스크롤" },
      { id: "react-table-column-manager", label: "컬럼 관리" },
      { id: "react-table-expand", label: "확장 행" },
      { id: "react-table-row-events", label: "행 클릭 / 키보드" },
      { id: "react-table-tooltip-copy", label: "툴팁 / 복사" },
      { id: "react-table-header-menu", label: "헤더 메뉴" },
      { id: "react-table-classnames", label: "CSS 커스터마이징" },
      { id: "column-def", label: "ColumnDef 옵션" },
    ],
  },
];

export default async function ReactTablePage() {
  const [basicHtml, singleSortHtml, multiSortHtml, selectionHtml, filterHtml, rowActionsHtml, editingHtml, loadingHtml, virtualScrollHtml, columnManagerHtml, expandHtml, rowEventsHtml, tooltipCopyHtml, headerMenuHtml] = await Promise.all([
    highlight(BASIC_CODE),
    highlight(SINGLE_SORT_CODE),
    highlight(MULTI_SORT_CODE),
    highlight(SELECTION_CODE),
    highlight(FILTER_CODE),
    highlight(ROW_ACTIONS_CODE),
    highlight(EDITING_CODE),
    highlight(LOADING_CODE),
    highlight(VIRTUAL_SCROLL_CODE),
    highlight(COLUMN_MANAGER_CODE),
    highlight(EXPAND_CODE),
    highlight(ROW_EVENTS_CODE),
    highlight(TOOLTIP_COPY_CODE),
    highlight(HEADER_MENU_CODE),
  ]);
  return (
    <>
      <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
        <div className="max-w-3xl">
          <header className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                Package
              </span>
            </div>
            <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
              @mycrm-ui/react-table
            </h1>
            <p className="text-xl font-light leading-relaxed text-on-surface-variant">
              React 19 / React 18에서 사용 가능한 고성능 테이블 컴포넌트입니다.
            </p>
            <p className="mt-3 rounded-lg bg-surface-container-low p-3 text-sm text-on-surface-variant">
              <code>@mycrm-ui/react-table</code>은 헤드리스(Headless) 라이브러리입니다.
              소스코드를 그대로 사용하면 스타일이 적용되지 않은 상태로 렌더링됩니다.
              문서의 미리보기는 이해를 돕기 위해 별도 스타일을 적용한 예시입니다.
            </p>
          </header>

          <section className="mb-16" id="react-table-basic">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">table_chart</span>
                </div>
                <h2 className="text-2xl font-bold text-on-surface">기본 사용</h2>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-secondary">
                  LLM Guide
                </span>
                <Link
                  href="/document/react-table/llm/basic"
                  className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-0.5 text-[11px] font-semibold text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
                >
                  Viewer
                </Link>
                <a
                  href="/document/react-table/basic-llm-guide.md"
                  className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-0.5 text-[11px] font-semibold text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
                >
                  MD
                </a>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>columns</code>, <code>data</code>, <code>rowKey</code>만으로 기본 테이블을 렌더링합니다.
            </p>
            <BasicDemo codeHtml={basicHtml} />
          </section>

          <section className="mb-16" id="react-table-sorting">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">sort</span>
                </div>
                <h2 className="text-2xl font-bold text-on-surface">정렬</h2>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-secondary">
                  LLM Guide
                </span>
                <Link
                  href="/document/react-table/llm/sorting"
                  className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-0.5 text-[11px] font-semibold text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
                >
                  Viewer
                </Link>
                <a
                  href="/document/react-table/sorting-llm-guide.md"
                  className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-2.5 py-0.5 text-[11px] font-semibold text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
                >
                  MD
                </a>
              </div>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">단일 정렬과 멀티 정렬을 모두 지원합니다.</p>
            <div className="space-y-8">
              <div>
                <p className="mb-3 font-medium text-on-surface">단일 정렬</p>
                <SingleSortDemo codeHtml={singleSortHtml} />
              </div>
              <div>
                <p className="mb-3 font-medium text-on-surface">멀티 정렬</p>
                <MultiSortDemo codeHtml={multiSortHtml} />
              </div>
            </div>
          </section>

          <section className="mb-16" id="react-table-selection">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">check_box</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">체크박스 선택</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>selection</code> 옵션으로 체크박스 행 선택을 활성화합니다. 헤더의 체크박스로 전체 선택/해제가 가능합니다.
            </p>
            <SelectionDemo codeHtml={selectionHtml} />
          </section>

          <section className="mb-16" id="react-table-filter">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">filter_alt</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">필터</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              컬럼 단위 필터를 제공합니다. <code>filterType</code>으로 텍스트, 셀렉트, 날짜 범위, 숫자 범위 필터를 선택할 수 있습니다.
            </p>
            <FilterDemo codeHtml={filterHtml} />
          </section>

          <section className="mb-16" id="react-table-row-actions">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">edit_note</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">행 삭제 / 추가</h2>
            </div>
            <div className="mb-6 space-y-2 leading-relaxed text-on-surface-variant">
              <p>
                <code>rowActions</code> 옵션으로 행 삭제/추가를 지원합니다.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li><code>deletable: true</code> — 각 행에 삭제 버튼 표시</li>
                <li><code>adding: true</code> + 컬럼의 <code>insertable: true</code> — 입력 필드가 자동 렌더링</li>
                <li><code>selection</code>과 조합하면 체크박스 선택 후 일괄 삭제 가능</li>
                <li><code>classNames</code>의 <code>addRow</code> · <code>addInput</code> · <code>addConfirmBtn</code> · <code>addCancelBtn</code>으로 추가 행 스타일 커스터마이징</li>
              </ul>
            </div>
            <RowActionsDemo codeHtml={rowActionsHtml} />
          </section>

          <section className="mb-16" id="react-table-editing">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">edit</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">인라인 편집</h2>
            </div>
            <div className="mb-6 space-y-2 leading-relaxed text-on-surface-variant">
              <p>
                <code>editable: true</code>인 컬럼의 셀을 클릭하면 인라인 편집 모드로 전환됩니다.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li><code>validate</code> — 저장 전 유효성 검증, 실패 시 <code>error</code> props로 메시지 전달</li>
                <li><code>onCellChange</code> — 편집 완료(Enter / blur) 시 변경된 값 수신</li>
                <li><code>editing.renderCell</code> — 모든 editable 컬럼에 공통 적용되는 편집 UI</li>
                <li><code>renderEditCell</code> — 특정 컬럼만 개별 편집 UI 지정 (<code>renderCell</code>보다 우선)</li>
              </ul>
            </div>
            <EditingDemo codeHtml={editingHtml} />
          </section>

          <section className="mb-16" id="react-table-loading">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">hourglass_empty</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">로딩 / 빈 상태</h2>
            </div>
            <div className="mb-6 space-y-2 leading-relaxed text-on-surface-variant">
              <p>
                <code>loading.enabled</code>가 <code>true</code>이면 데이터 대신 shimmer 스켈레톤 행을 렌더링합니다.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li><code>rowCount</code> — 스켈레톤 행 개수 (기본값 3)</li>
                <li><code>render</code> — 커스텀 스켈레톤 UI (생략 시 기본 shimmer 사용)</li>
                <li><code>renderEmpty</code> — 데이터가 없을 때 렌더링할 컴포넌트</li>
              </ul>
            </div>
            <LoadingDemo codeHtml={loadingHtml} />
          </section>

          <section className="mb-16" id="react-table-virtual-scroll">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">view_list</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">가상 스크롤</h2>
            </div>
            <p className="mb-4 leading-relaxed text-on-surface-variant">대용량 데이터를 위한 가상 스크롤과 무한 로딩을 지원합니다.</p>
            <div className="mb-6 rounded-xl border border-outline-variant/20 bg-surface-container-low/40 px-5 py-4 text-sm text-on-surface-variant">
              <ul className="space-y-1.5 list-disc list-inside">
                <li><code>scroll.virtual</code> — 가상 스크롤 활성화 (DOM에 보이는 행만 렌더링)</li>
                <li><code>scroll.rowHeight</code> — 행 높이(px), 가상 스크롤 사용 시 필수</li>
                <li><code>scroll.stickyHeader</code> — 스크롤 시 헤더 고정</li>
                <li><code>scroll.onLoadMore</code> — 끝에 도달하면 호출되는 무한 스크롤 콜백</li>
                <li><code>classNames.wrap</code> — 고정 높이 + <code>overflow-y: auto</code> 또는 <code>overflow-y: scroll</code> 설정 필수</li>
              </ul>
            </div>
            <VirtualScrollDemo codeHtml={virtualScrollHtml} />
          </section>

          <section className="mb-16" id="react-table-column-manager">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">view_column</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">컬럼 관리</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">컬럼 숨김, 순서 변경, 고정(pin), 리사이즈를 지원합니다. 헤더 메뉴에서 컬럼 관리 모달을 열고, 드래그로 순서를 변경할 수 있습니다.</p>
            <ColumnManagerDemo codeHtml={columnManagerHtml} />
          </section>

          <section className="mb-16" id="react-table-expand">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">확장 행</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>ExpandDef</code>로 그룹(부모)과 자식 행을 구분하여 계층형 테이블을 구성합니다.
              자식 행 선택, 삭제, 아이콘 커스터마이징을 지원하며 <code>childExpandDef</code>로 다단계 중첩도 가능합니다.
            </p>
            <ExpandDemo codeHtml={expandHtml} />
          </section>

          <section className="mb-16" id="react-table-row-events">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">mouse</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">행 클릭 / 키보드 내비게이션</h2>
            </div>
            <RowEventsDemo codeHtml={rowEventsHtml} />
          </section>

          <section className="mb-16" id="react-table-tooltip-copy">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">content_copy</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">툴팁 / 복사</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>tooltip</code>을 켜면 셀 호버 시 값이 툴팁으로 표시됩니다.
              <code>copyable</code>을 켜면 <code>copyable: true</code>인 열에서 우클릭 컨텍스트 메뉴가 열립니다.
              <code>onCellCopy</code>로 복사 이벤트를 수신하고, <code>cellContextMenuItems</code>로 메뉴 항목을 추가할 수 있습니다.
            </p>
            <TooltipCopyDemo codeHtml={tooltipCopyHtml} />
          </section>

          <section className="mb-16" id="react-table-header-menu">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">menu</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">헤더 메뉴</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>headerMenuIcon</code>을 지정하면 헤더 우상단에 아이콘 버튼이 표시됩니다. 클릭 시 <code>headerMenuItems</code> 드롭다운이 열립니다.{" "}
              <code>columnManager</code>를 함께 설정하면 <code>컬럼 관리</code> 항목이 자동으로 추가됩니다.
            </p>
            <HeaderMenuDemo codeHtml={headerMenuHtml} />
          </section>

          <section className="mb-16" id="react-table-classnames">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">CSS 커스터마이징</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>classNames</code> prop으로 모든 시각적 요소에 className 슬롯이 제공됩니다. 아래에서 테마를 선택해 차이를 확인하세요.
            </p>
            <CssCustomDemo />
            <CssClassnamesTable />
          </section>

          <section className="mb-16" id="column-def">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-outline/10 text-on-surface-variant">
                <span className="material-symbols-outlined">settings</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">ColumnDef 옵션</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant"><code>ColumnDef</code>의 전체 옵션 목록입니다.</p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`const columns: ColumnDef<User>[] = [
  {
    key: 'name',
    label: '이름',
    render: (row) => row.name,
    width: '200px',
    minWidth: 80,
    sortable: true,
    filterType: 'text',
    filterOptions: [
      { label: '관리자', value: 'admin' },
    ],
    filterPlaceholder: '이름 검색...',
    editable: true,
    insertable: true,
    align: 'left',
    copyable: true,
    validate: (value) => value.trim() ? null : '필수 항목입니다.',
    renderEditCell: (props) => <CustomInput {...props} />,
    onValidationError: (error) => console.warn(error),
  },
]`}</code>
            </pre>
            <div className="mt-6 overflow-hidden rounded-xl border border-outline-variant/25 bg-surface-container-lowest">
              <table className="w-full text-sm">
                <thead className="bg-surface-container-low text-on-surface-variant">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">옵션</th>
                    <th className="px-4 py-3 text-left font-semibold">타입</th>
                    <th className="px-4 py-3 text-left font-semibold">설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">key</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                    <td className="px-4 py-3 text-on-surface-variant">컬럼 고유 키</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">label</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                    <td className="px-4 py-3 text-on-surface-variant">헤더 표시 텍스트</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">render</td>
                    <td className="px-4 py-3 font-mono text-xs">(row) =&gt; ReactNode</td>
                    <td className="px-4 py-3 text-on-surface-variant">셀 렌더 함수</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">width</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                    <td className="px-4 py-3 text-on-surface-variant">CSS 너비 (px, %)</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">minWidth</td>
                    <td className="px-4 py-3 font-mono text-xs">number</td>
                    <td className="px-4 py-3 text-on-surface-variant">최소 너비 (px)</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">sortable</td>
                    <td className="px-4 py-3 font-mono text-xs">boolean</td>
                    <td className="px-4 py-3 text-on-surface-variant">정렬 가능 여부</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">filterType</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                    <td className="px-4 py-3 text-on-surface-variant">text | select | dateRange | numberRange</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">filterOptions</td>
                    <td className="px-4 py-3 font-mono text-xs">{"{ label: string; value: string }[]"}</td>
                    <td className="px-4 py-3 text-on-surface-variant">select 필터의 선택지 목록</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">filterPlaceholder</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                    <td className="px-4 py-3 text-on-surface-variant">text 필터 입력창 placeholder</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">editable</td>
                    <td className="px-4 py-3 font-mono text-xs">boolean</td>
                    <td className="px-4 py-3 text-on-surface-variant">인라인 편집 가능</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">insertable</td>
                    <td className="px-4 py-3 font-mono text-xs">boolean</td>
                    <td className="px-4 py-3 text-on-surface-variant">행 추가 시 입력 가능</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">align</td>
                    <td className="px-4 py-3 font-mono text-xs">string</td>
                    <td className="px-4 py-3 text-on-surface-variant">left | center | right</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">copyable</td>
                    <td className="px-4 py-3 font-mono text-xs">boolean</td>
                    <td className="px-4 py-3 text-on-surface-variant">셀 복사 가능</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">validate</td>
                    <td className="px-4 py-3 font-mono text-xs">(value) =&gt; string | null</td>
                    <td className="px-4 py-3 text-on-surface-variant">편집 검증 함수</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">renderEditCell</td>
                    <td className="px-4 py-3 font-mono text-xs">(props) =&gt; ReactNode</td>
                    <td className="px-4 py-3 text-on-surface-variant">커스텀 편집 셀 렌더러 (editing.renderCell보다 우선)</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">renderInsertCell</td>
                    <td className="px-4 py-3 font-mono text-xs">(props) =&gt; ReactNode</td>
                    <td className="px-4 py-3 text-on-surface-variant">행 추가 시 커스텀 입력 셀 렌더러</td>
                  </tr>
                  <tr className="border-t border-outline-variant/20">
                    <td className="px-4 py-3 font-mono text-xs">onValidationError</td>
                    <td className="px-4 py-3 font-mono text-xs">(error: string) =&gt; void</td>
                    <td className="px-4 py-3 text-on-surface-variant">검증 실패 시 콜백 — 설정 시 renderCell의 error props가 null이 됨</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
      <TocAside groups={TOC_GROUPS} />
    </>
  );
}
