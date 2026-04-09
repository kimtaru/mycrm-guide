"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, TableClassNames } from "@mycrm-ui/react-table";

interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  score: number;
}

const DATA: Employee[] = [
  { id: 1, name: "홍길동", role: "개발자", department: "개발팀", score: 92 },
  { id: 2, name: "김철수", role: "디자이너", department: "디자인팀", score: 88 },
  { id: 3, name: "이영희", role: "기획자", department: "기획팀", score: 95 },
  { id: 4, name: "박민준", role: "개발자", department: "개발팀", score: 78 },
  { id: 5, name: "최지수", role: "마케터", department: "마케팅팀", score: 84 },
];

const COLUMNS: ColumnDef<Employee>[] = [
  { key: "name", label: "이름", width: "120px", render: (row) => row.name },
  { key: "role", label: "역할", width: "100px", render: (row) => row.role },
  { key: "department", label: "부서", width: "130px", render: (row) => row.department },
  { key: "score", label: "점수", width: "80px", align: "right", render: (row) => row.score },
];

type ThemeKey = "default" | "compact" | "stripe";

const THEMES: Record<ThemeKey, { label: string; classNames: TableClassNames; description: string }> = {
  default: {
    label: "기본",
    description: "표준 패딩과 구분선",
    classNames: {
      table: "w-full text-sm",
      thead: "bg-surface-container-low text-on-surface-variant",
      th: "px-4 py-3 text-left font-semibold",
      tr: "border-t border-outline-variant/20 hover:bg-surface-container-lowest transition-colors",
      td: "px-4 py-3 text-on-surface",
    },
  },
  compact: {
    label: "컴팩트",
    description: "패딩 축소 + 작은 폰트 — 밀도 높은 데이터에 적합",
    classNames: {
      table: "w-full text-xs",
      thead: "bg-surface-container text-on-surface-variant",
      th: "px-2 py-1.5 text-left font-semibold",
      tr: "border-t border-outline-variant/20 hover:bg-surface-container-lowest transition-colors",
      td: "px-2 py-1.5 text-on-surface",
    },
  },
  stripe: {
    label: "스트라이프",
    description: "Primary 헤더 + 홀짝 행 배경색 — 행 구분이 명확해야 할 때",
    classNames: {
      table: "w-full text-sm",
      thead: "bg-primary text-on-primary",
      th: "px-4 py-3 text-left font-bold",
      tr: "odd:bg-surface even:bg-surface-container-lowest hover:bg-primary/5 transition-colors",
      td: "px-4 py-3 text-on-surface",
    },
  },
};

export default function CssCustomDemo() {
  const [activeTheme, setActiveTheme] = useState<ThemeKey>("default");

  const theme = THEMES[activeTheme];

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTheme(key)}
              className={[
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                activeTheme === key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-outline-variant/40 text-on-surface hover:bg-surface-container",
              ].join(" ")}
            >
              {THEMES[key].label}
            </button>
          ))}
        </div>

        <Table<Employee>
          columns={COLUMNS}
          data={DATA}
          rowKey={(row) => String(row.id)}
          classNames={theme.classNames}
        />

        <div className="mt-4 rounded-lg bg-surface-container-low px-4 py-3">
          <p className="mb-2 text-xs font-medium text-on-surface-variant">
            적용된 classNames — <span className="text-on-surface">{theme.label}</span>
            <span className="ml-2 text-on-surface-variant/60">{theme.description}</span>
          </p>
          <pre className="overflow-x-auto rounded-lg bg-surface-container p-3 text-xs leading-relaxed">
            <code>
              <span className="text-on-surface-variant">{"<Table"}</span>{"\n"}
              <span className="text-on-surface-variant">{"  columns={columns}"}</span>{"\n"}
              <span className="text-on-surface-variant">{"  data={data}"}</span>{"\n"}
              <span className="text-on-surface-variant">{"  rowKey={(row) => String(row.id)}"}</span>{"\n"}
              <span className="text-on-surface-variant/40">{"  // ...기타 props"}</span>{"\n"}
              {"\n"}
              <span className="text-on-surface-variant">{"  classNames={{"}</span>{"\n"}
              {Object.entries(theme.classNames).map(([k, v]) => (
                <span key={k}>
                  {"    "}
                  <span className="text-primary">{k}</span>
                  <span className="text-on-surface-variant">{": "}</span>
                  <span className="text-tertiary">{`"${v}"`}</span>
                  <span className="text-on-surface-variant">{","}</span>
                  {"\n"}
                </span>
              ))}
              <span className="text-on-surface-variant">{"  }}"}</span>{"\n"}
              <span className="text-on-surface-variant">{"/>"}</span>
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
