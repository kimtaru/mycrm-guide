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

const ROLE_OPTIONS = ["관리자", "사용자", "편집자"];

const INITIAL_DATA: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자" },
  { id: 4, name: "박민수", email: "park@example.com", role: "편집자" },
  { id: 5, name: "최지은", email: "choi@example.com", role: "사용자" },
];

const columns: ColumnDef<User>[] = [
  {
    key: "id",
    label: "Key",
    width: "70px",
    render: (row) => (
      <span className="rounded bg-outline-variant/15 px-1.5 py-0.5 font-mono text-[11px] text-on-surface-variant">
        {row.id}
      </span>
    ),
  },
  {
    key: "name",
    label: "이름",
    editable: true,
    render: (row) => row.name,
    validate: (value) => (value.trim() ? null : "이름은 필수입니다."),
  },
  {
    key: "email",
    label: "이메일",
    editable: true,
    render: (row) => row.email,
    validate: (value) =>
      !value.trim()
        ? "이메일은 필수입니다."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "올바른 이메일 형식이 아닙니다."
          : null,
  },
  {
    key: "role",
    label: "역할",
    editable: true,
    render: (row) => row.role,
    // 커스텀 편집 셀: 기본 input 대신 select 렌더링
    renderEditCell: ({ value, onChange, onSave, onCancel }) => (
      <div className="flex items-center gap-1.5">
        <div className="relative flex-1">
          <select
            className="w-full rounded-md border border-primary/40 bg-surface py-1 pl-2 pr-6 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary/20 focus:outline-none appearance-none cursor-pointer"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          >
            {ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-on-surface-variant/50"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 14 18 9" />
          </svg>
        </div>
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
    ),
  },
];

// 공통 편집 UI: input + 저장/취소 버튼 + 에러 메시지
function renderEditCellUI({
  value,
  onChange,
  onSave,
  onCancel,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
  error?: string | null;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5">
        <input
          className={`flex-1 rounded-md border bg-surface px-2 py-1 text-sm text-on-surface focus:ring-1 focus:outline-none ${error ? "border-error focus:border-error focus:ring-error/20" : "border-primary/40 focus:border-primary focus:ring-primary/20"}`}
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
      {error && <p className="mt-1 text-[10px] text-error">{error}</p>}
    </div>
  );
}

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20",
  td: "px-4 py-3 text-on-surface",
  tdEditing:
    "px-4 py-2 text-on-surface bg-primary/5 ring-1 ring-inset ring-primary/30",
  editError: "mt-1 text-[10px] text-error",
};

export default function EditingDemo({ codeHtml }: { codeHtml: string }) {
  const [data, setData] = useState<User[]>(INITIAL_DATA);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) =>
    setLog((prev) => [...prev.slice(-4), msg]);

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <Table
          columns={columns}
          data={data}
          rowKey={(row) => String(row.id)}
          editing={{
            onCellChange: (rowKey, colKey, value) => {
              setData((prev) =>
                prev.map((r) =>
                  String(r.id) === rowKey
                    ? { ...r, [colKey]: value }
                    : r,
                ),
              );
              addLog(`변경: rowKey="${rowKey}", colKey="${colKey}", value="${value}"`);
            },
            icon: (
              <span
                className="material-symbols-outlined text-on-surface-variant/40"
                style={{ fontSize: 16, fontVariationSettings: "'wght' 200, 'opsz' 20" }}
              >
                edit
              </span>
            ),
            renderCell: renderEditCellUI,
          }}
          classNames={TABLE_CLASS_NAMES}
        />
        {log.length > 0 && (
          <div className="mt-4 rounded-lg bg-surface-container-low px-4 py-3">
            <p className="mb-1 text-xs font-medium text-on-surface-variant">
              이벤트 로그
            </p>
            <div className="space-y-0.5">
              {log.map((entry, i) => (
                <code key={i} className="block text-xs text-on-surface">
                  {entry}
                </code>
              ))}
            </div>
          </div>
        )}
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
