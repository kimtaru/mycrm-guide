"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, SortState } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  age: number;
}

const columns: ColumnDef<User>[] = [
  { key: "name", label: "이름", sortable: true, render: (row) => row.name },
  { key: "email", label: "이메일", sortable: true, render: (row) => row.email },
  { key: "role", label: "역할", sortable: true, render: (row) => row.role },
  { key: "age", label: "나이", sortable: true, render: (row) => row.age },
];

const singleData: User[] = [
  { id: 1, name: "홍길동", email: "hong@example.com", role: "관리자", age: 35 },
  { id: 2, name: "김철수", email: "kim@example.com", role: "사용자", age: 28 },
  { id: 3, name: "이영희", email: "lee@example.com", role: "사용자", age: 42 },
];

interface Product {
  id: number;
  category: string;
  brand: string;
  price: number;
}

const multiColumns: ColumnDef<Product>[] = [
  { key: "category", label: "카테고리", sortable: true, render: (row) => row.category },
  { key: "brand", label: "브랜드", sortable: true, render: (row) => row.brand },
  { key: "price", label: "가격", sortable: true, render: (row) => `${row.price.toLocaleString()}원` },
];

const multiData: Product[] = [
  { id: 1, category: "노트북", brand: "삼성", price: 1500000 },
  { id: 2, category: "노트북", brand: "LG", price: 1500000 },
  { id: 3, category: "노트북", brand: "삼성", price: 1200000 },
  { id: 4, category: "모니터", brand: "LG", price: 450000 },
  { id: 5, category: "모니터", brand: "삼성", price: 450000 },
  { id: 6, category: "모니터", brand: "LG", price: 320000 },
];

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20",
  td: "px-4 py-3 text-on-surface",
};

export function SingleSortDemo({ codeHtml }: { codeHtml: string }) {
  const [sort, setSort] = useState<SortState | null>({ key: "age", direction: "asc" });

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <Table
          columns={columns}
          data={singleData}
          rowKey={(row) => String(row.id)}
          sorting={{ sort, onSortChange: setSort }}
          classNames={TABLE_CLASS_NAMES}
        />
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}

export function MultiSortDemo({ codeHtml }: { codeHtml: string }) {
  const [sorts, setSorts] = useState<SortState[]>([
    { key: "category", direction: "asc" },
    { key: "price", direction: "desc" },
  ]);

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <p className="mb-3 text-xs text-on-surface-variant">
          <kbd className="rounded border border-outline-variant/40 bg-surface-container-low px-1.5 py-0.5 font-mono text-[11px]">Shift</kbd>를
          누른 채 컬럼 헤더를 클릭하면 순서대로 멀티 정렬이 적용됩니다.
        </p>
        <Table
          columns={multiColumns}
          data={multiData}
          rowKey={(row) => String(row.id)}
          sorting={{ sorts, onSortsChange: setSorts }}
          classNames={TABLE_CLASS_NAMES}
        />
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
