"use client";

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
  { key: "name", label: "이름", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
  { key: "role", label: "역할", render: (row) => row.role },
];

const data: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자" },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자" },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자" },
];

export default function BasicDemo({ codeHtml }: { codeHtml: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
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
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
