"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

interface Item {
  id: number;
  name: string;
  email: string;
  department: string;
  status: string;
}

const DEPARTMENTS = ["개발", "디자인", "마케팅", "영업", "인사", "재무"];
const STATUSES = ["재직", "휴직", "수습"];
const NAMES = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임"];
const SUFFIXES = ["민준", "서연", "도현", "지은", "수빈", "현우", "예진", "태양", "나연", "준서"];

function generateItems(count: number, startId = 1): Item[] {
  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    const name =
      NAMES[id % NAMES.length] + SUFFIXES[(id * 3) % SUFFIXES.length];
    return {
      id,
      name,
      email: `user${id}@example.com`,
      department: DEPARTMENTS[id % DEPARTMENTS.length],
      status: STATUSES[id % STATUSES.length],
    };
  });
}

const INITIAL_COUNT = 50;
const LOAD_SIZE = 50;
const MAX_COUNT = 300;

const columns: ColumnDef<Item>[] = [
  {
    key: "id",
    label: "ID",
    width: "70px",
    render: (row) => (
      <span className="rounded bg-outline-variant/15 px-1.5 py-0.5 font-mono text-[11px] text-on-surface-variant">
        {row.id}
      </span>
    ),
  },
  { key: "name", label: "이름", width: "100px", render: (row) => row.name },
  { key: "email", label: "이메일", render: (row) => row.email },
  {
    key: "department",
    label: "부서",
    width: "90px",
    render: (row) => row.department,
  },
  {
    key: "status",
    label: "상태",
    width: "80px",
    render: (row) => (
      <span
        className={
          row.status === "재직"
            ? "rounded-full bg-tertiary/15 px-2 py-0.5 text-[11px] font-medium text-tertiary"
            : row.status === "수습"
              ? "rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-primary"
              : "rounded-full bg-outline-variant/20 px-2 py-0.5 text-[11px] font-medium text-on-surface-variant"
        }
      >
        {row.status}
      </span>
    ),
  },
];

const TABLE_CLASS_NAMES = {
  wrap: "h-[380px] overflow-y-auto",
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20",
  td: "px-4 py-3 text-on-surface",
};

export default function VirtualScrollDemo({
  codeHtml,
}: {
  codeHtml: string;
}) {
  const [data, setData] = useState<Item[]>(() =>
    generateItems(INITIAL_COUNT),
  );
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setData((prev) => {
        const next = [...prev, ...generateItems(LOAD_SIZE, prev.length + 1)];
        return next;
      });
      setHasMore(data.length + LOAD_SIZE < MAX_COUNT);
      setLoadingMore(false);
    }, 600);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant">
            <span className="font-semibold text-on-surface">{data.length}</span>
            {hasMore ? ` / ${MAX_COUNT}개 로드됨` : ` / ${MAX_COUNT}개 (전체 로드)` }
          </p>
          <button
            type="button"
            onClick={() => {
              setData(generateItems(INITIAL_COUNT));
              setHasMore(true);
              setLoadingMore(false);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:bg-surface-container"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              refresh
            </span>
            초기화
          </button>
        </div>

        <Table
          columns={columns}
          data={data}
          rowKey={(row) => String(row.id)}
          scroll={{
            virtual: true,
            rowHeight: 48,
            overscan: 5,
            stickyHeader: true,
            onLoadMore: handleLoadMore,
            hasMore,
            loadingMore,
            renderLoadingMore: () => (
              <div className="flex items-center justify-center gap-2 py-2 text-xs text-on-surface-variant">
                <span
                  className="material-symbols-outlined animate-spin text-[16px]"
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  progress_activity
                </span>
                추가 데이터 로딩 중...
              </div>
            ),
          }}
          classNames={TABLE_CLASS_NAMES}
        />
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
