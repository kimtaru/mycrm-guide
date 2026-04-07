"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  {
    key: "name",
    label: "이름",
    render: (row) => row.name,
    filterType: "text",
    filterPlaceholder: "이름 검색...",
  },
  {
    key: "email",
    label: "이메일",
    render: (row) => row.email,
    filterType: "text",
    filterPlaceholder: "이메일 검색...",
  },
  {
    key: "role",
    label: "역할",
    render: (row) => row.role,
    filterType: "select",
    filterOptions: [
      { label: "관리자", value: "관리자" },
      { label: "사용자", value: "사용자" },
      { label: "편집자", value: "편집자" },
    ],
  },
];

const data: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자" },
  { id: 4, name: "박민수", email: "park@example.com", role: "편집자" },
  { id: 5, name: "최지은", email: "choi@example.com", role: "사용자" },
];

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20",
  td: "px-4 py-3 text-on-surface",
  filterRow: "border-t border-outline-variant/20 bg-surface-container-lowest",
  filterCell: "px-4 py-2",
  filterInput:
    "w-full rounded-lg border border-outline-variant/30 bg-surface px-3 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors",
  filterSelect:
    "w-full rounded-lg border border-outline-variant/30 bg-surface px-3 py-1.5 text-xs text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none transition-colors appearance-none cursor-pointer",
};

export default function FilterDemo({ codeHtml }: { codeHtml: string }) {
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const activeCount = Object.values(filterValues).filter(Boolean).length;

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
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
              label: filterEnabled ? "필터 숨기기" : "필터 표시",
              onClick: () => setFilterEnabled((v) => !v),
            },
          ]}
          headerMenuIcon={
            <span
              className="material-symbols-outlined text-[14px] text-on-surface-variant/60"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              more_horiz
            </span>
          }
          classNames={{
            ...TABLE_CLASS_NAMES,
            headerMenuBtn:
              "flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface",
            headerMenuDropdown:
              "min-w-[140px] rounded-xl border border-outline-variant/25 bg-surface-container-lowest py-1 shadow-lg",
            headerMenuItem:
              "flex w-full items-center gap-2 px-4 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-low",
          }}
        />
        <div className="mt-4 rounded-lg bg-surface-container-low px-4 py-3">
          <p className="mb-1 text-xs font-medium text-on-surface-variant">
            filterValues
          </p>
          <code className="text-xs text-on-surface">
            {activeCount > 0
              ? JSON.stringify(
                  Object.fromEntries(
                    Object.entries(filterValues).filter(([, v]) => v),
                  ),
                )
              : "{}"}
          </code>
        </div>
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
