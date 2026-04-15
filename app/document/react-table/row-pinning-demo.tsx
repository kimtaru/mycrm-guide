"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface Ticket {
  id: number;
  customer: string;
  owner: string;
  priority: "높음" | "중간" | "낮음";
  status: "대기" | "진행중" | "완료";
}

const customers = [
  "네오커머스",
  "미래물산",
  "오션테크",
  "그린메드",
  "스타로지스",
  "에이펙스랩",
  "한빛유통",
  "에코모빌리티",
  "블루리테일",
  "유니온시스템",
];

const owners = ["김하늘", "박서준", "이유진", "최민호", "정다은", "윤서현"];

const priorities: Ticket["priority"][] = ["높음", "중간", "낮음"];
const statuses: Ticket["status"][] = ["진행중", "대기", "완료"];

function renderTextEditCell({
  value,
  onChange,
  onSave,
  onCancel,
}: {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <input
        className="flex-1 rounded-md border border-primary/40 bg-surface px-2 py-1 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSave();
          if (e.key === "Escape") onCancel();
        }}
        autoFocus
      />
      <button
        type="button"
        onClick={onSave}
        className="rounded p-0.5 transition-colors hover:bg-primary/10"
      >
        <span
          className="material-symbols-outlined text-[16px] text-primary"
          style={{ fontVariationSettings: "'wght' 300" }}
        >
          check
        </span>
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded p-0.5 transition-colors hover:bg-error/10"
      >
        <span
          className="material-symbols-outlined text-[16px] text-on-surface-variant/60"
          style={{ fontVariationSettings: "'wght' 300" }}
        >
          close
        </span>
      </button>
    </div>
  );
}

const columns: ColumnDef<Ticket>[] = [
  {
    key: "customer",
    label: "고객",
    width: "160px",
    filterType: "text",
    filterPlaceholder: "고객 검색...",
    render: (row) => <span className="font-medium text-on-surface">{row.customer}</span>,
  },
  {
    key: "owner",
    label: "담당자",
    width: "120px",
    editable: true,
    filterType: "text",
    filterPlaceholder: "담당자 검색...",
    render: (row) => row.owner,
    renderEditCell: renderTextEditCell,
  },
  {
    key: "priority",
    label: "우선순위",
    width: "100px",
    editable: true,
    filterType: "select",
    filterOptions: [
      { label: "높음", value: "높음" },
      { label: "중간", value: "중간" },
      { label: "낮음", value: "낮음" },
    ],
    renderEditCell: ({ value, onChange, onSave, onCancel }) => (
      <div className="flex items-center gap-1.5">
        <select
          className="flex-1 rounded-md border border-primary/40 bg-surface px-2 py-1 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        >
          {priorities.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onSave}
          className="rounded p-0.5 transition-colors hover:bg-primary/10"
        >
          <span
            className="material-symbols-outlined text-[16px] text-primary"
            style={{ fontVariationSettings: "'wght' 300" }}
          >
            check
          </span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded p-0.5 transition-colors hover:bg-error/10"
        >
          <span
            className="material-symbols-outlined text-[16px] text-on-surface-variant/60"
            style={{ fontVariationSettings: "'wght' 300" }}
          >
            close
          </span>
        </button>
      </div>
    ),
    render: (row) => (
      <span
        className={
          row.priority === "높음"
            ? "rounded-full bg-error/12 px-2 py-0.5 text-[11px] font-medium text-error"
            : row.priority === "중간"
              ? "rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-medium text-primary"
              : "rounded-full bg-outline-variant/20 px-2 py-0.5 text-[11px] font-medium text-on-surface-variant"
        }
      >
        {row.priority}
      </span>
    ),
  },
  {
    key: "status",
    label: "상태",
    width: "100px",
    filterType: "select",
    filterOptions: [
      { label: "진행중", value: "진행중" },
      { label: "대기", value: "대기" },
      { label: "완료", value: "완료" },
    ],
    render: (row) => row.status,
  },
];

const INITIAL_DATA: Ticket[] = Array.from({ length: 18 }, (_, index) => ({
  id: 101 + index,
  customer: `${customers[index % customers.length]} ${index + 1}`,
  owner: owners[index % owners.length],
  priority: priorities[index % priorities.length],
  status: statuses[index % statuses.length],
}));

const TABLE_CLASS_NAMES = {
  wrap: "h-[420px] overflow-y-auto",
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20 bg-surface-container-lowest",
  td: "px-4 py-3 text-on-surface",
  tdEditing:
    "px-4 py-2 text-on-surface bg-primary/5 ring-1 ring-inset ring-primary/30",
  filterRow: "bg-surface-container-low",
  filterCell: "px-2 py-1.5",
  filterInput:
    "w-full rounded-md border border-outline-variant/40 bg-surface px-2 py-1 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50",
  filterSelect:
    "w-full rounded-md border border-outline-variant/40 bg-surface px-2 py-1 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50",
  cellCopyMenu:
    "min-w-[150px] rounded-xl border border-outline-variant/25 bg-surface-container-lowest py-1 shadow-lg",
  cellCopyMenuItem:
    "flex w-full items-center gap-2 px-4 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-low",
  headerMenuBtn:
    "flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface",
  headerMenuDropdown:
    "min-w-[160px] rounded-xl border border-outline-variant/25 bg-surface-container-lowest py-1 shadow-lg",
  headerMenuItem:
    "flex w-full items-center gap-2 px-4 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-low",
};

export default function RowPinningDemo({
  codeHtml,
}: {
  codeHtml: string;
}) {
  const [data, setData] = useState<Ticket[]>(INITIAL_DATA);
  const [pinnedKeys, setPinnedKeys] = useState<string[]>(["103", "108"]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-on-surface-variant">
            행을 우클릭하면 <code>로우 상단고정</code> 메뉴가 열립니다.
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-surface-container-low px-3 py-1.5 text-xs text-on-surface">
              pinnedKeys: <code>{JSON.stringify(pinnedKeys)}</code>
            </div>
            <button
              type="button"
              onClick={() => setPinnedKeys([])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:bg-surface-container"
            >
              초기화
            </button>
          </div>
        </div>

        <Table
          columns={columns}
          data={data}
          rowKey={(row) => String(row.id)}
          scroll={{
            stickyHeader: true,
          }}
          filter={{
            enabled: showFilter,
            values: filters,
            onChange: (key, val) =>
              setFilters((prev) => ({ ...prev, [key]: val })),
          }}
          headerMenuItems={[
            {
              label: showFilter ? "필터 숨기기" : "필터 표시",
              onClick: () => setShowFilter((prev) => !prev),
            },
            {
              label: "필터 초기화",
              onClick: () => setFilters({}),
            },
          ]}
          headerMenuIcon={
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              more_horiz
            </span>
          }
          rowPinning={{
            enabled: true,
            keys: pinnedKeys,
            onKeysChange: setPinnedKeys,
          }}
        rowActions={{
            deletable: true,
            onDelete: (rowKey) => {
              setData((prev) => prev.filter((row) => String(row.id) !== rowKey));
              setPinnedKeys((prev) => prev.filter((key) => key !== rowKey));
            },
            deleteIcon: (
              <span
                className="material-symbols-outlined text-[18px] text-error/70 transition-colors hover:text-error"
                style={{ fontVariationSettings: "'wght' 300" }}
              >
                delete
              </span>
            ),
          }}
          editing={{
            onCellChange: (rowKey, colKey, value) => {
              setData((prev) =>
                prev.map((row) =>
                  String(row.id) === rowKey ? { ...row, [colKey]: value } : row,
                ),
              );
            },
            icon: (
              <span
                className="material-symbols-outlined text-on-surface-variant/40"
                style={{ fontSize: 16, fontVariationSettings: "'wght' 200, 'opsz' 20" }}
              >
                edit
              </span>
            ),
          }}
          classNames={TABLE_CLASS_NAMES}
          tooltip
        />
        <div className="mt-4 rounded-lg bg-surface-container-low px-4 py-3">
          <p className="mb-1 text-xs font-medium text-on-surface-variant">
            필터 상태
          </p>
          <code className="text-xs text-on-surface">
            {showFilter ? JSON.stringify(filters) : "disabled"}
          </code>
        </div>
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
