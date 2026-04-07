import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import TocAside from "../toc-aside";
import type { TocGroup } from "../toc-aside";
import BasicDemo from "./basic-demo";
import { SingleSortDemo, MultiSortDemo } from "./sorting-demo";
import SelectionDemo from "./selection-demo";
import FilterDemo from "./filter-demo";
import RowActionsDemo from "./row-actions-demo";
import EditingDemo from "./editing-demo";

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

const ROW_ACTIONS_CODE = `import { useState } from 'react'
import { Table } from '@mycrm-ui/react-table'
import type { ColumnDef } from '@mycrm-ui/react-table'

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

// insertable: true인 컬럼에 추가 행의 input이 자동 렌더링됨
const columns: ColumnDef<User>[] = [
  { key: 'name', label: '이름', insertable: true, render: (row) => row.name },
  { key: 'email', label: '이메일', insertable: true, render: (row) => row.email },
  { key: 'role', label: '역할', insertable: true, render: (row) => row.role },
]

export default function RowActionsExample() {
  const [data, setData] = useState<User[]>(initialData)
  const [nextId, setNextId] = useState(4)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [isAdding, setIsAdding] = useState(false)

  return (
    <>
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => setIsAdding(true)}>추가</button>
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
          // 개별 행 삭제
          deletable: true,
          onDelete: (rowKey) =>
            setData((prev) => prev.filter((r) => String(r.id) !== rowKey)),
          deleteIcon: <TrashIcon />,
          // 행 추가 (insertable 컬럼에 input 자동 렌더링)
          adding: isAdding,
          onAdd: (values) => {
            setData((prev) => [...prev, { id: nextId, ...values } as User])
            setNextId((n) => n + 1)
            setIsAdding(false)
          },
          onAddCancel: () => setIsAdding(false),
        }}
        // classNames.addRow / addInput / addConfirmBtn / addCancelBtn으로
        // 추가 행 스타일링 가능
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
  const [basicHtml, singleSortHtml, multiSortHtml, selectionHtml, filterHtml, rowActionsHtml, editingHtml] = await Promise.all([
    highlight(BASIC_CODE),
    highlight(SINGLE_SORT_CODE),
    highlight(MULTI_SORT_CODE),
    highlight(SELECTION_CODE),
    highlight(FILTER_CODE),
    highlight(ROW_ACTIONS_CODE),
    highlight(EDITING_CODE),
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
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">table_chart</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">기본 사용</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">
              <code>columns</code>, <code>data</code>, <code>rowKey</code>만으로 기본 테이블을 렌더링합니다.
            </p>
            <BasicDemo codeHtml={basicHtml} />
          </section>

          <section className="mb-16" id="react-table-sorting">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">sort</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">정렬</h2>
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
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  loading={{
    enabled: isLoading,
    rowCount: 5,
    emptyText: '데이터가 없습니다.',
    renderEmpty: () => <EmptyState />,
    render: () => <CustomSkeleton />,
  }}
/>`}</code>
            </pre>
          </section>

          <section className="mb-16" id="react-table-virtual-scroll">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">view_list</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">가상 스크롤</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">대용량 데이터를 위한 가상 스크롤과 무한 로딩을 지원합니다.</p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`<Table
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
    threshold: 200,
  }}
/>`}</code>
            </pre>
          </section>

          <section className="mb-16" id="react-table-column-manager">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">view_column</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">컬럼 관리</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">컬럼 숨김, 순서 변경, 고정(pin), 리사이즈를 지원합니다.</p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`const [hiddenKeys, setHiddenKeys] = useState<string[]>([])
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
    noHeaderMenu: false,
  }}
/>`}</code>
            </pre>
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
            </p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`import type { ExpandDef } from '@mycrm-ui/react-table'

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
/>`}</code>
            </pre>
          </section>

          <section className="mb-16" id="react-table-row-events">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">mouse</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">행 클릭 / 키보드 내비게이션</h2>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  onRowClick={(row, rowKey, event) => console.log('클릭:', row)}
  onRowDoubleClick={(row, rowKey, event) => console.log('더블클릭:', row)}
  rowClassName={(row, rowKey) => row.role === 'admin' ? 'admin-row' : undefined}
  keyboardNavigation={true}
  onFocusedCellChange={(cell) => console.log('포커스:', cell)}
/>`}</code>
            </pre>
          </section>

          <section className="mb-16" id="react-table-tooltip-copy">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">content_copy</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">툴팁 / 복사</h2>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`<Table
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
/>`}</code>
            </pre>
          </section>

          <section className="mb-16" id="react-table-header-menu">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">menu</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">헤더 메뉴</h2>
            </div>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`<Table
  columns={columns}
  data={data}
  rowKey={(row) => String(row.id)}
  headerMenuItems={[
    { label: 'CSV 내보내기', onClick: () => exportCsv() },
    { label: '새로고침', onClick: () => refetch() },
  ]}
  headerMenuIcon={<MenuIcon />}
/>`}</code>
            </pre>
          </section>

          <section className="mb-16" id="react-table-classnames">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface">CSS 커스터마이징</h2>
            </div>
            <p className="mb-6 leading-relaxed text-on-surface-variant">모든 시각적 요소에 <code>className</code> 슬롯이 제공됩니다.</p>
            <pre className="overflow-x-auto rounded-xl bg-inverse-surface p-6 font-mono text-sm text-inverse-on-surface shadow-lg">
              <code>{`<Table
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
/>`}</code>
            </pre>
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
                    <td className="px-4 py-3 text-on-surface-variant">커스텀 편집 셀 렌더러</td>
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
