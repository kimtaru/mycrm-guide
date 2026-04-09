"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface Employee {
  id: number;
  name: string;
  department: string;
  role: string;
  status: string;
}

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20 cursor-pointer hover:bg-surface-container-lowest transition-colors",
  td: "px-4 py-3 text-on-surface",
};

function renderEditCellUI({
  value,
  onChange,
  onSave,
  onCancel,
}: {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  error?: string | null;
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
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded p-0.5 transition-colors hover:bg-error/10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant/60">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

type EventEntry = {
  type: "click" | "dblclick" | "focus";
  rowKey: string;
  name: string;
  colKey?: string;
};

const INITIAL_DATA: Employee[] = [
  { id: 1, name: "홍길동", department: "개발", role: "팀장", status: "재직" },
  { id: 2, name: "김철수", department: "개발", role: "시니어", status: "재직" },
  { id: 3, name: "이영희", department: "디자인", role: "팀장", status: "재직" },
  { id: 4, name: "박민준", department: "기획", role: "매니저", status: "휴직" },
  { id: 5, name: "최지은", department: "개발", role: "주니어", status: "재직" },
];

export default function RowEventsDemo({ codeHtml }: { codeHtml: string }) {
  const [data, setData] = useState<Employee[]>(INITIAL_DATA);
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [focusedCell, setFocusedCell] = useState<{
    rowKey: string;
    colKey: string;
  } | null>(null);

  const columns: ColumnDef<Employee>[] = [
    {
      key: "name",
      label: "이름",
      width: "130px",
      render: (row) => (
        <span className="font-medium text-on-surface">{row.name}</span>
      ),
    },
    {
      key: "department",
      label: "부서",
      width: "120px",
      render: (row) => row.department,
    },
    {
      key: "role",
      label: "직책 (편집 가능)",
      width: "140px",
      editable: true, // Enter 키로 편집 시작
      render: (row) => row.role,
    },
    {
      key: "status",
      label: "상태",
      width: "90px",
      render: (row) => (
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${
            row.status === "재직"
              ? "bg-primary/10 text-primary"
              : "bg-outline-variant/20 text-on-surface-variant"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const addEvent = (entry: EventEntry) => {
    setEvents((prev) => [entry, ...prev].slice(0, 6));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setEvents([])}
            className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:bg-surface-container"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              delete_sweep
            </span>
            로그 초기화
          </button>
          <span className="text-xs text-on-surface-variant">
            행 클릭 · 더블클릭 · ↑↓ 이동 · Enter로 직책 편집
          </span>
        </div>

        <Table<Employee>
          columns={columns}
          data={data}
          rowKey={(row) => String(row.id)}
          onRowClick={(row, rowKey) => {
            addEvent({ type: "click", rowKey, name: row.name });
          }}
          onRowDoubleClick={(row, rowKey) => {
            addEvent({ type: "dblclick", rowKey, name: row.name });
          }}
          rowClassName={(row) => row.role === "팀장" ? "font-semibold" : undefined}
          keyboardNavigation={true}
          onFocusedCellChange={(cell) => {
            setFocusedCell(cell);
            if (cell) {
              const row = data.find((r) => String(r.id) === cell.rowKey);
              if (row) {
                addEvent({
                  type: "focus",
                  rowKey: cell.rowKey,
                  name: row.name,
                  colKey: cell.colKey,
                });
              }
            }
          }}
          editing={{
            onCellChange: (rowKey, colKey, value) => {
              setData((prev) =>
                prev.map((r) =>
                  String(r.id) === rowKey ? { ...r, [colKey]: value } : r,
                ),
              );
            },
            renderCell: renderEditCellUI,
          }}
          classNames={TABLE_CLASS_NAMES}
        />

        <div className="mt-4 space-y-2">
          <div className="rounded-lg bg-surface-container-low px-4 py-3">
            <p className="mb-1 text-xs font-medium text-on-surface-variant">
              포커스 셀
            </p>
            <code className="text-xs text-on-surface">
              {focusedCell
                ? `rowKey: "${focusedCell.rowKey}", colKey: "${focusedCell.colKey}"`
                : "없음"}
            </code>
          </div>

          <div className="rounded-lg bg-surface-container-low px-4 py-3">
            <p className="mb-2 text-xs font-medium text-on-surface-variant">
              이벤트 로그
            </p>
            {events.length === 0 ? (
              <p className="text-xs text-on-surface-variant/60">
                아직 이벤트가 없습니다.
              </p>
            ) : (
              <ul className="space-y-1">
                {events.map((e, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        e.type === "click"
                          ? "bg-primary/10 text-primary"
                          : e.type === "dblclick"
                            ? "bg-tertiary/10 text-tertiary"
                            : "bg-outline-variant/20 text-on-surface-variant"
                      }`}
                    >
                      {e.type === "click"
                        ? "클릭"
                        : e.type === "dblclick"
                          ? "더블클릭"
                          : "포커스"}
                    </span>
                    <span className="text-on-surface">
                      {e.name}
                      {e.colKey ? (
                        <span className="text-on-surface-variant">
                          {" "}
                          · {e.colKey}
                        </span>
                      ) : null}
                    </span>
                    <span className="text-on-surface-variant/50">
                      #{e.rowKey}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
