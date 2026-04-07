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
  checkbox: "accent-primary",
};

export default function SelectionDemo({ codeHtml }: { codeHtml: string }) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <Table
          columns={columns}
          data={data}
          rowKey={(row) => String(row.id)}
          selection={{
            enabled: true,
            keys: selectedKeys,
            onChange: setSelectedKeys,
          }}
          classNames={TABLE_CLASS_NAMES}
        />
        <div className="mt-4 rounded-lg bg-surface-container-low px-4 py-3">
          <p className="mb-1 text-xs font-medium text-on-surface-variant">
            selectedKeys
          </p>
          <code className="text-xs text-on-surface">
            {selectedKeys.length > 0
              ? `[${selectedKeys.map((k) => `"${k}"`).join(", ")}]`
              : "[]"}
          </code>
        </div>
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
