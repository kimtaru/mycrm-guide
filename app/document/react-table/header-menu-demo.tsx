"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, SortState } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  score: number;
}

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20 hover:bg-surface-container-lowest transition-colors",
  td: "px-4 py-3 text-on-surface",
  filterRow: "bg-surface-container-low",
  filterCell: "px-2 py-1.5",
  filterInput:
    "w-full rounded-md border border-outline-variant/40 bg-surface px-2 py-1 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary/50",
  headerMenuBtn:
    "flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface",
  headerMenuDropdown:
    "min-w-[140px] rounded-xl border border-outline-variant/25 bg-surface-container-lowest py-1 shadow-lg",
  headerMenuItem:
    "flex w-full items-center gap-2 px-4 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-low",
};

const DATA: Employee[] = [
  { id: 1, name: "홍길동", role: "개발자", department: "개발팀", score: 92 },
  { id: 2, name: "김철수", role: "디자이너", department: "디자인팀", score: 88 },
  { id: 3, name: "이영희", role: "기획자", department: "기획팀", score: 95 },
  { id: 4, name: "박민준", role: "개발자", department: "개발팀", score: 78 },
  { id: 5, name: "최지수", role: "마케터", department: "마케팅팀", score: 84 },
];

const COLUMNS: ColumnDef<Employee>[] = [
  { key: "name", label: "이름", sortable: true, filterType: "text", width: "120px", render: (row) => row.name },
  { key: "role", label: "역할", sortable: true, filterType: "text", width: "100px", render: (row) => row.role },
  { key: "department", label: "부서", sortable: true, filterType: "text", width: "130px", render: (row) => row.department },
  { key: "score", label: "점수", sortable: true, width: "80px", render: (row) => row.score },
];

export default function HeaderMenuDemo({ codeHtml }: { codeHtml: string }) {
  const [sorts, setSorts] = useState<SortState[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <p className="mb-3 text-xs text-on-surface-variant">
          테이블 우상단의 ⋯ 아이콘을 클릭하면 헤더 메뉴가 열립니다.
        </p>
        <Table<Employee>
          columns={COLUMNS}
          data={DATA}
          rowKey={(row) => String(row.id)}
          sorting={{ sorts, onSortsChange: setSorts }}
          filter={{
            enabled: showFilter,
            values: filters,
            onChange: (key, val) =>
              setFilters((prev) => ({ ...prev, [key]: val })),
          }}
          headerMenuItems={[
            {
              label: showFilter ? "필터 숨기기" : "필터 표시",
              onClick: () => {
                setShowFilter((v) => !v);
                setLastAction(showFilter ? "필터 숨기기" : "필터 표시");
              },
            },
            {
              label: "필터 초기화",
              onClick: () => {
                setFilters({});
                setLastAction("필터 초기화");
              },
            },
            {
              label: "정렬 초기화",
              onClick: () => {
                setSorts([]);
                setLastAction("정렬 초기화");
              },
            },
          ]}
          headerMenuIcon={
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              more_horiz
            </span>
          }
          classNames={TABLE_CLASS_NAMES}
        />
        <div className="mt-4 rounded-lg bg-surface-container-low px-4 py-3">
          <p className="mb-1 text-xs font-medium text-on-surface-variant">
            마지막 실행 메뉴
          </p>
          <code className="text-xs text-on-surface">
            {lastAction ?? "없음"}
          </code>
        </div>
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
