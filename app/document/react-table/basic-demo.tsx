"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: ColumnDef<User>[] = [
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
  { key: "role", label: "역할", render: (row) => row.role },
];

const data: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자" },
];

const SOURCE_CODE = `import { Table } from '@mycrm-ui/react-table'
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

export default function BasicDemo() {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      {/* Preview */}
      <div className="bg-surface-container-lowest p-6">
        <Table
          columns={columns}
          data={data}
          rowKey={(row) => String(row.id)}
          classNames={{
            table: "w-full text-sm",
            thead: "bg-surface-container-low text-on-surface-variant",
            th: "px-4 py-3 text-left font-semibold",
            tr: "border-t border-outline-variant/20",
            td: "px-4 py-3 text-on-surface",
          }}
        />
      </div>

      {/* Code toggle */}
      <div className="border-t border-outline-variant/25">
        <button
          type="button"
          onClick={() => setTab(tab === "code" ? "preview" : "code")}
          className="flex w-full items-center justify-center gap-1.5 py-2 text-xs text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[16px]">
            {tab === "code" ? "visibility" : "code"}
          </span>
          {tab === "code" ? "코드 숨기기" : "코드 보기"}
        </button>
        {tab === "code" && (
          <div className="border-t border-outline-variant/25 bg-inverse-surface">
            <pre className="overflow-x-auto p-6 font-mono text-sm text-inverse-on-surface">
              <code>{SOURCE_CODE}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
