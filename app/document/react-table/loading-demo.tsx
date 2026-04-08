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

const DATA: User[] = [
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
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
  { key: "role", label: "역할", render: (row) => row.role },
];

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20",
  td: "px-4 py-3 text-on-surface",
};

export default function LoadingDemo({ codeHtml }: { codeHtml: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const handleSimulateLoad = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <div className="mb-4 flex items-center gap-2">
          <button
            type="button"
            onClick={handleSimulateLoad}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-on-primary transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              refresh
            </span>
            {isLoading ? "로딩 중..." : "로딩 시뮬레이션"}
          </button>
          <button
            type="button"
            onClick={() => setIsEmpty((v) => !v)}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:bg-surface-container disabled:opacity-50"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              {isEmpty ? "table_rows" : "table_rows_narrow"}
            </span>
            {isEmpty ? "데이터 표시" : "빈 상태 보기"}
          </button>
        </div>

        <Table
          columns={columns}
          data={isEmpty ? [] : DATA}
          rowKey={(row) => String(row.id)}
          loading={{
            enabled: isLoading,
            rowCount: 5,
            renderEmpty: () => (
              <tr>
                <td colSpan={4} className="py-12 text-on-surface-variant">
                  <div className="flex flex-col items-center gap-2">
                    <span
                      className="material-symbols-outlined text-[36px] opacity-30"
                      style={{ fontVariationSettings: "'wght' 200" }}
                    >
                      inbox
                    </span>
                    <span className="text-sm">데이터가 없습니다</span>
                  </div>
                </td>
              </tr>
            ),
          }}
          classNames={TABLE_CLASS_NAMES}
        />
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
