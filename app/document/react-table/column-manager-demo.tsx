"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
  joinDate: string;
}

const allColumns: ColumnDef<Employee>[] = [
  {
    key: "name",
    label: "이름",
    width: "120px",
    render: (row) => (
      <span className="font-medium text-on-surface">{row.name}</span>
    ),
  },
  {
    key: "email",
    label: "이메일",
    width: "200px",
    render: (row) => row.email,
  },
  {
    key: "department",
    label: "부서",
    width: "100px",
    render: (row) => (
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
        {row.department}
      </span>
    ),
  },
  {
    key: "role",
    label: "직책",
    width: "100px",
    render: (row) => row.role,
  },
  {
    key: "joinDate",
    label: "입사일",
    width: "120px",
    render: (row) => row.joinDate,
  },
];

const data: Employee[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", department: "개발", role: "팀장", joinDate: "2020-03-15" },
  { id: 2, name: "김철수", email: "kim@example.com", department: "디자인", role: "시니어", joinDate: "2021-07-01" },
  { id: 3, name: "이영희", email: "lee@example.com", department: "마케팅", role: "매니저", joinDate: "2019-11-20" },
  { id: 4, name: "박민수", email: "park@example.com", department: "개발", role: "주니어", joinDate: "2023-01-10" },
  { id: 5, name: "최지은", email: "choi@example.com", department: "영업", role: "팀장", joinDate: "2018-05-22" },
];

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20",
  td: "px-4 py-3 text-on-surface",
  columnManagerBackdrop:
    "fixed inset-0 z-40 bg-scrim/30",
  columnManager:
    "fixed top-1/2 left-1/2 z-50 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-outline-variant/25 bg-surface-container-lowest shadow-xl",
  columnManagerHeader:
    "flex items-center justify-between border-b border-outline-variant/20 px-5 py-4",
  columnManagerTitle: "text-sm font-semibold text-on-surface",
  columnManagerSelectAllBtn:
    "rounded-lg px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10",
  columnManagerDeselectAllBtn:
    "rounded-lg px-2.5 py-1 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container",
  columnManagerCloseBtn:
    "flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface",
  columnManagerBody: "max-h-[280px] overflow-y-auto px-2 py-2",
  columnToggle:
    "flex w-full cursor-grab items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-on-surface transition-colors hover:bg-surface-container-low active:cursor-grabbing",
  columnToggleActive: "bg-primary/5",
  columnToggleCheckbox:
    "h-4 w-4 rounded border-outline-variant accent-primary",
  headerMenuBtn:
    "flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface",
  headerMenuDropdown:
    "min-w-[140px] rounded-xl border border-outline-variant/25 bg-surface-container-lowest py-1 shadow-lg",
  headerMenuItem:
    "flex w-full items-center gap-2 px-4 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-low",
};

export default function ColumnManagerDemo({
  codeHtml,
}: {
  codeHtml: string;
}) {
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [order, setOrder] = useState<string[]>([]);
  const [pinned, setPinned] = useState<{ left?: string[]; right?: string[] }>(
    {},
  );
  const [widths, setWidths] = useState<Record<string, number>>({});

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setHiddenKeys([]);
              setOrder([]);
              setPinned({});
              setWidths({});
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:bg-surface-container"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              refresh
            </span>
            초기화
          </button>
        </div>

        <Table
          columns={allColumns}
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
            pinnedBg: { header: "var(--md-sys-color-surface-container-low)", body: "var(--md-sys-color-surface-container-lowest)" },
          }}
          headerMenuIcon={
            <span
              className="material-symbols-outlined text-[14px] text-on-surface-variant/60"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              more_horiz
            </span>
          }
          classNames={TABLE_CLASS_NAMES}
        />

        <div className="mt-4 space-y-2">
          <div className="rounded-lg bg-surface-container-low px-4 py-3">
            <p className="mb-1 text-xs font-medium text-on-surface-variant">
              상태
            </p>
            <div className="space-y-1 text-xs text-on-surface">
              <p>
                <span className="text-on-surface-variant">hiddenKeys:</span>{" "}
                <code>
                  {hiddenKeys.length > 0
                    ? JSON.stringify(hiddenKeys)
                    : "[]"}
                </code>
              </p>
              <p>
                <span className="text-on-surface-variant">order:</span>{" "}
                <code>
                  {order.length > 0 ? JSON.stringify(order) : "[]"}
                </code>
              </p>
              <p>
                <span className="text-on-surface-variant">pinned:</span>{" "}
                <code>
                  {Object.keys(pinned).length > 0
                    ? JSON.stringify(pinned)
                    : "{}"}
                </code>
              </p>
              <p>
                <span className="text-on-surface-variant">widths:</span>{" "}
                <code>
                  {Object.keys(widths).length > 0
                    ? JSON.stringify(widths)
                    : "{}"}
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
