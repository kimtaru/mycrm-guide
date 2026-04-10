"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const activeClass =
  "border-b-2 border-primary py-5 font-semibold text-primary";
const inactiveClass =
  "py-5 text-on-surface-variant transition-colors hover:text-on-surface";

export default function DocumentTopNav() {
  const pathname = usePathname();
  const isReactTable = pathname.startsWith("/document/react-table");

  return (
    <nav className="fixed top-0 z-50 h-16 w-full bg-surface-container-lowest/80 shadow-sm backdrop-blur-md">
      <div className="relative mx-auto flex h-full max-w-8xl items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-on-surface">
            mycrm
          </Link>
          <div className="hidden gap-6 md:flex">
            <Link
              href="/document"
              className={isReactTable ? inactiveClass : activeClass}
              aria-current={!isReactTable ? "page" : undefined}
            >
              문서
            </Link>
            <Link
              href="/document/react-table#react-table-basic"
              className={isReactTable ? activeClass : inactiveClass}
              aria-current={isReactTable ? "page" : undefined}
            >
              컴포넌트
            </Link>
            {/*
            <Link
              href="/"
              className="py-5 text-on-surface-variant transition-colors hover:text-on-surface"
            >
              예시
            </Link>
            */}
          </div>
        </div>
        {/*
        문서 검색 — 추후 복구 시 아래 주석 해제
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              className="w-64 rounded-lg border-none bg-surface-container-low py-1.5 pl-10 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="문서 검색..."
              type="search"
              aria-label="문서 검색"
            />
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
              search
            </span>
          </div>
        </div>
        */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-outline-variant/30" />
      </div>
    </nav>
  );
}
