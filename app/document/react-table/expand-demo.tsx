"use client";

import { useState } from "react";
import { Table } from "@mycrm-ui/react-table";
import type { ColumnDef, ExpandDef } from "@mycrm-ui/react-table";
import CodeToggle from "../code-toggle";

// 개별 로우 (리프)
interface Member {
  id: number;
  name: string;
  role: string;
  email: string;
}

// 2단계 그룹
interface Team {
  name: string;
  members: Member[];
}

// 1단계 그룹
interface Department {
  name: string;
  teams: Team[];
}

const memberColumns: ColumnDef<Member>[] = [
  {
    key: "name",
    label: "이름",
    width: "120px",
    render: (m) => (
      <span className="font-medium text-on-surface">{m.name}</span>
    ),
  },
  {
    key: "role",
    label: "직책",
    width: "100px",
    render: (m) => m.role,
  },
  {
    key: "email",
    label: "이메일",
    width: "200px",
    render: (m) => m.email,
  },
];

// 2단계: 팀 → 멤버
const teamExpandDef: ExpandDef<Team, Member> = {
  children: (team) => team.members,
  childRowKey: (m) => String(m.id),
  childColumns: memberColumns,
  renderGroupLabel: (team) => (
    <>
      <strong>{team.name}</strong>{" "}
      <span style={{ opacity: 0.5, fontSize: 12 }}>
        ({team.members.length}명)
      </span>
    </>
  ),
};

// 1단계: 부서 → 팀 (childExpandDef로 재귀 연결)
const deptExpandDef: ExpandDef<Department, Team> = {
  children: (dept) => dept.teams,
  childRowKey: (team) => team.name,
  childColumns: [] as ColumnDef<Team>[],
  renderGroupLabel: (dept) => {
    const total = dept.teams.reduce((s, t) => s + t.members.length, 0);
    return (
      <>
        <strong>{dept.name}</strong>{" "}
        <span style={{ opacity: 0.5, fontSize: 12 }}>
          ({dept.teams.length}팀 · {total}명)
        </span>
      </>
    );
  },
  childExpandDef: teamExpandDef,
};

const data: Department[] = [
  {
    name: "개발본부",
    teams: [
      {
        name: "프론트엔드",
        members: [
          { id: 1, name: "홍길동", role: "팀장", email: "hong@example.com" },
          { id: 2, name: "김철수", role: "시니어", email: "kim@example.com" },
          { id: 3, name: "박영희", role: "주니어", email: "park@example.com" },
        ],
      },
      {
        name: "백엔드",
        members: [
          { id: 4, name: "이민호", role: "팀장", email: "lee@example.com" },
          { id: 5, name: "최지은", role: "시니어", email: "choi@example.com" },
        ],
      },
    ],
  },
  {
    name: "디자인본부",
    teams: [
      {
        name: "UX",
        members: [
          { id: 6, name: "정수민", role: "팀장", email: "jung@example.com" },
          { id: 7, name: "한예린", role: "시니어", email: "han@example.com" },
        ],
      },
    ],
  },
];

const TABLE_CLASS_NAMES = {
  table: "w-full text-sm",
  thead: "bg-surface-container-low text-on-surface-variant",
  th: "px-4 py-3 text-left font-semibold",
  tr: "border-t border-outline-variant/20",
  td: "px-4 py-3 text-on-surface",
  expandIcon: "align-middle",
};

export default function ExpandDemo({ codeHtml }: { codeHtml: string }) {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [selectedChildKeys, setSelectedChildKeys] = useState<string[]>([]);

  const expandAll = () => {
    const keys: string[] = [];
    data.forEach((dept) => {
      keys.push(dept.name);
      dept.teams.forEach((team) => {
        keys.push(`${dept.name}::${team.name}`);
      });
    });
    setExpandedKeys(keys);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-outline-variant/25">
      <div className="bg-surface-container-lowest p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={expandAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:bg-surface-container"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              unfold_more
            </span>
            전체 펼치기
          </button>
          <button
            type="button"
            onClick={() => {
              setExpandedKeys([]);
              setSelectedChildKeys([]);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/40 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:bg-surface-container"
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'wght' 300" }}
            >
              unfold_less
            </span>
            전체 접기
          </button>
        </div>

        <Table<Department>
          columns={[] as ColumnDef<Department>[]}
          data={data}
          rowKey={(dept) => dept.name}
          expand={{
            def: deptExpandDef,
            keys: expandedKeys,
            onKeysChange: setExpandedKeys,
            icon: {
              expanded: (
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  expand_more
                </span>
              ),
              collapsed: (
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'wght' 300" }}
                >
                  chevron_right
                </span>
              ),
            },
            childSelection: {
              enabled: true,
              keys: selectedChildKeys,
              onChange: setSelectedChildKeys,
            },
            childDeletable: true,
            onChildDelete: (groupKey, childKey) =>
              alert(`삭제 요청: 그룹 ${groupKey}, 자식 ${childKey}`),
          }}
          classNames={TABLE_CLASS_NAMES}
        />

        <div className="mt-4 space-y-2">
          <div className="rounded-lg bg-surface-container-low px-4 py-3">
            <p className="mb-1 text-xs font-medium text-on-surface-variant">
              상태
            </p>
            <div className="space-y-1 text-xs text-on-surface">
              <p>
                <span className="text-on-surface-variant">expandedKeys:</span>{" "}
                <code>
                  {expandedKeys.length > 0
                    ? JSON.stringify(expandedKeys)
                    : "[]"}
                </code>
              </p>
              <p>
                <span className="text-on-surface-variant">
                  selectedChildKeys:
                </span>{" "}
                <code>
                  {selectedChildKeys.length > 0
                    ? JSON.stringify(selectedChildKeys)
                    : "[]"}
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
      <CodeToggle codeHtml={codeHtml} />
    </div>
  );
}
