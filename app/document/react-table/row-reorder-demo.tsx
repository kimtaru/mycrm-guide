"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface Campaign {
  id: number;
  name: string;
  owner: string;
  stage: "준비" | "진행" | "검토";
  locked: boolean;
}

const INITIAL_ROWS: Campaign[] = [
  { id: 302, name: "상반기 리텐션", owner: "박서준", stage: "진행", locked: true },
  { id: 305, name: "휴면 고객 재활성화", owner: "정다은", stage: "진행", locked: true },
  { id: 301, name: "신규 고객 온보딩", owner: "김하늘", stage: "준비", locked: false },
  { id: 303, name: "VIP 고객 케어", owner: "이유진", stage: "검토", locked: false },
  { id: 304, name: "파트너 공동 캠페인", owner: "최민호", stage: "준비", locked: false },
];

const columns: ColumnDef<Campaign>[] = [
  {
    key: "name",
    label: "캠페인",
    width: "220px",
    render: (row) => <span className="font-medium text-on-surface">{row.name}</span>,
  },
  { key: "owner", label: "담당자", width: "120px", render: (row) => row.owner },
  {
    key: "stage",
    label: "단계",
    width: "100px",
    render: (row) => (
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
        {row.stage}
      </span>
    ),
  },
  {
    key: "reorder",
    label: "순서",
    width: "72px",
    align: "center",
    render: (row) =>
      row.locked ? (
        <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-error/12 px-2 py-0.5 text-[11px] font-semibold text-error">
          고정
        </span>
      ) : (
        <span
          aria-label="행 순서 변경"
          className="material-symbols-outlined text-[20px] text-on-surface-variant/70"
          style={{ fontVariationSettings: "'wght' 300" }}
        >
          drag_indicator
        </span>
      ),
  },
];

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20 bg-surface-container-lowest transition-colors",
  trDragging: "bg-primary/5",
  trDragOver: "bg-primary/8",
  td: "px-4 py-3 text-on-surface",
  tdRowDragHandle:
    "cursor-grab text-center transition-colors hover:bg-primary/5 active:cursor-grabbing",
};

export default function RowReorderDemo({ codeHtml }: { codeHtml: string }) {
  const [rows, setRows] = useState<Campaign[]>(INITIAL_ROWS);

  const handleOrderChange = (order: string[]) => {
    setRows((prev) => {
      const rowMap = new Map(prev.map((row) => [String(row.id), row]));
      return order
        .map((key) => rowMap.get(key))
        .filter((row): row is Campaign => row !== undefined);
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-on-surface-variant">
            상단의 <code>고정</code> 행은 제자리를 유지하고, 그 아래 행만 드래그로 순서를 바꿉니다.
          </p>
          <div className="rounded-lg bg-surface-container-low px-3 py-1.5 text-xs text-on-surface">
            order: <code>{JSON.stringify(rows.map((row) => row.id))}</code>
          </div>
        </div>

        <Table
          columns={columns}
          data={rows}
          rowKey={(row) => String(row.id)}
          rowReorder={{
            enabled: true,
            handleColumnKey: "reorder",
            onOrderChange: handleOrderChange,
            isRowReorderable: (row) => !row.locked,
          }}
          classNames={TABLE_CLASS_NAMES}
        />
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
