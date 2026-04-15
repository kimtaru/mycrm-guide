"use client";

import Link from "next/link";
import { useState } from "react";

interface SubGroup {
  label: string;
  items: { href: string; label: string }[];
}

const PACKAGE_GROUPS: SubGroup[] = [
  {
    label: "@mycrm-ui/core",
    items: [
      { href: "/document/core#core-types", label: "타입" },
      { href: "/document/core#core-utilities", label: "유틸리티 함수" },
      { href: "/document/core#core-formatters", label: "포맷터" },
      { href: "/document/core#core-errors", label: "에러 클래스" },
    ],
  },
  {
    label: "@mycrm-ui/react",
    items: [
      { href: "/document/react#react-components", label: "컴포넌트" },
      { href: "/document/react#react-contexts", label: "컨텍스트" },
      { href: "/document/react#react-hooks", label: "훅" },
    ],
  },
];

const COMPONENT_GROUPS: SubGroup[] = [
  {
    label: "Table",
    items: [
      { href: "/document/react-table#react-table-basic", label: "기본 사용" },
      { href: "/document/react-table#react-table-sorting", label: "정렬" },
      { href: "/document/react-table#react-table-selection", label: "체크박스 선택" },
      { href: "/document/react-table#react-table-filter", label: "필터" },
      { href: "/document/react-table#react-table-row-actions", label: "행 삭제 / 추가" },
      { href: "/document/react-table#react-table-editing", label: "인라인 편집" },
      { href: "/document/react-table#react-table-loading", label: "로딩 / 빈 상태" },
      { href: "/document/react-table#react-table-virtual-scroll", label: "가상 스크롤" },
      { href: "/document/react-table#react-table-column-manager", label: "컬럼 관리" },
      { href: "/document/react-table#react-table-row-pinning", label: "행 상단 고정" },
      { href: "/document/react-table#react-table-expand", label: "확장 행" },
      { href: "/document/react-table#react-table-row-events", label: "행 클릭 / 키보드" },
      { href: "/document/react-table#react-table-tooltip-copy", label: "툴팁 / 복사" },
      { href: "/document/react-table#react-table-header-menu", label: "헤더 메뉴" },
      { href: "/document/react-table#react-table-classnames", label: "CSS 커스터마이징" },
      { href: "/document/react-table#column-def", label: "ColumnDef 옵션" },
    ],
  },
];

function CollapsibleGroup({ group }: { group: SubGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mx-2 flex w-[calc(100%-16px)] cursor-pointer items-center justify-between rounded-lg px-4 py-1.5 transition-colors hover:bg-surface-container-lowest"
      >
        <span className="text-xs font-semibold tracking-wide text-on-surface">
          {group.label}
        </span>
        <span
          className={`material-symbols-outlined text-[16px] text-on-surface-variant transition-transform ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div className="mt-0.5">
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mx-2 flex items-center rounded-lg px-4 py-1 text-on-surface-variant transition-all hover:bg-surface-container-lowest hover:text-primary"
            >
              <span className="text-[13px]">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SideNav() {
  return (
    <aside className="sticky left-0 top-16 h-[calc(100vh-4rem)] w-64 overflow-y-auto bg-surface-container-low py-8">
      <div className="mb-6 px-6">
        <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          Documentation
        </h3>
        <p className="text-[10px] font-medium text-primary">v0.0.1</p>
      </div>

      {/* 간단하게 시작하기 */}
      <div className="mx-2 my-1 flex items-center gap-2 px-4 py-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="text-sm font-semibold text-on-surface">간단하게 시작하기</span>
      </div>
      <Link
        href="/document"
        className="mx-2 my-0.5 flex items-center rounded-lg px-4 py-1 text-on-surface-variant transition-all hover:bg-surface-container-lowest hover:text-primary"
      >
        <span className="text-[13px]">설치</span>
      </Link>

      {/* 패키지 */}
      <div className="mx-2 mt-6 mb-2 flex items-center gap-2 px-4 py-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-tertiary" />
        <span className="text-sm font-semibold text-on-surface">패키지</span>
      </div>

      <div className="space-y-1">
        {PACKAGE_GROUPS.map((group) => (
          <CollapsibleGroup key={group.label} group={group} />
        ))}
      </div>

      {/* 컴포넌트 */}
      <div className="mx-2 mt-6 mb-2 flex items-center gap-2 px-4 py-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary" />
        <span className="text-sm font-semibold text-on-surface">컴포넌트</span>
      </div>

      <div className="space-y-1">
        {COMPONENT_GROUPS.map((group) => (
          <CollapsibleGroup key={group.label} group={group} />
        ))}
      </div>
    </aside>
  );
}
