"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ROWS = [
  {
    name: "Alpha",
    status: "활성",
    tone: "active" as const,
    segment: "B2B",
    date: "04.10",
  },
  {
    name: "Beta",
    status: "대기",
    tone: "pending" as const,
    segment: "B2C",
    date: "04.09",
  },
  {
    name: "Gamma",
    status: "협의",
    tone: "review" as const,
    segment: "B2B",
    date: "04.08",
  },
  {
    name: "Delta",
    status: "활성",
    tone: "active" as const,
    segment: "B2B",
    date: "04.07",
  },
  {
    name: "Epsilon",
    status: "대기",
    tone: "pending" as const,
    segment: "B2G",
    date: "04.05",
  },
] as const;

const STATUS_BADGE: Record<
  "active" | "pending" | "review",
  string
> = {
  active: "bg-primary/15 text-primary",
  pending: "bg-surface-container-high text-on-surface-variant",
  review: "bg-secondary/15 text-secondary",
};

/** 데모용 검색 시나리오 (순서대로 반복) */
const DEMO_TARGETS = ["활성", "B2B", "Gamma", ""] as const;

const TYPE_MS = 88;
const BACKSPACE_MS = 40;
const HOLD_MS = 2200;

function rowMatches(
  row: (typeof ROWS)[number],
  q: string,
): boolean {
  const t = q.trim();
  if (!t) return true;
  const needle = t.toLowerCase();
  const hay = `${row.name} ${row.status} ${row.segment}`.toLowerCase();
  return hay.includes(needle);
}

function sleep(ms: number) {
  return new Promise<void>((r) => {
    setTimeout(r, ms);
  });
}

export function ArchGridFilterDemo() {
  const [query, setQuery] = useState("");
  const queryRef = useRef("");
  const [pulseFooter, setPulseFooter] = useState(false);
  const reducedMotionRef = useRef(false);

  const setQuerySync = (s: string) => {
    queryRef.current = s;
    setQuery(s);
  };

  const filtered = useMemo(
    () => ROWS.filter((row) => rowMatches(row, query)),
    [query],
  );

  useEffect(() => {
    setPulseFooter(true);
    const id = window.setTimeout(() => setPulseFooter(false), 380);
    return () => window.clearTimeout(id);
  }, [filtered.length]);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cancelled = false;

    const runReduced = async () => {
      let i = 0;
      while (!cancelled) {
        setQuerySync(DEMO_TARGETS[i % DEMO_TARGETS.length]);
        await sleep(HOLD_MS);
        i += 1;
      }
    };

    const runFull = async () => {
      while (!cancelled) {
        for (const target of DEMO_TARGETS) {
          while (queryRef.current.length > 0 && !cancelled) {
            setQuerySync(queryRef.current.slice(0, -1));
            await sleep(BACKSPACE_MS);
          }
          if (cancelled) return;
          for (let i = 0; i <= target.length && !cancelled; i++) {
            setQuerySync(target.slice(0, i));
            await sleep(TYPE_MS);
          }
          if (cancelled) return;
          await sleep(HOLD_MS);
        }
      }
    };

    if (reducedMotionRef.current) {
      void runReduced();
    } else {
      void runFull();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const totalDemo = ROWS.length;

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-lg font-bold text-on-surface">데이터 그리드</h4>
          <p className="mt-1 text-xs text-on-surface-variant">
            헤드리스 로직 위에 쌓인 화면 예시
          </p>
        </div>
        <span
          className="material-symbols-outlined shrink-0 text-[22px] text-outline"
          aria-hidden
        >
          table_chart
        </span>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div
          className="flex min-h-[38px] min-w-[140px] flex-1 items-center gap-2 rounded-lg border border-outline-variant/20 bg-surface-container-low px-3 py-2 text-xs text-on-surface/90 transition-[box-shadow] duration-300 focus-within:ring-2 focus-within:ring-primary/25"
          role="search"
          aria-label="데모 검색 (자동 입력)"
        >
          <span className="material-symbols-outlined shrink-0 text-[18px] text-on-surface-variant/60">
            search
          </span>
          <span className="min-w-0 flex-1 font-medium">
            <span className="text-on-surface">
              {query || (
                <span className="text-on-surface-variant/45">검색어 입력…</span>
              )}
            </span>
            <span
              className="ml-px inline-block h-[14px] w-px translate-y-[2px] bg-primary/80 animate-pulse"
              aria-hidden
            />
          </span>
        </div>
        <button
          type="button"
          className="inline-flex h-[38px] items-center gap-1.5 rounded-lg border border-outline-variant/25 bg-surface-container-low px-3 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high"
          aria-hidden
          tabIndex={-1}
        >
          <span className="material-symbols-outlined text-[18px]">
            filter_list
          </span>
          필터
        </button>
        <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
          <span className="material-symbols-outlined text-[14px]">swap_vert</span>
          정렬 적용
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-outline-variant/15 shadow-sm">
        <div className="grid grid-cols-[28px_minmax(0,1fr)_76px_52px_58px] items-center gap-1 border-b border-outline-variant/15 bg-surface-container-low px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-on-surface-variant sm:grid-cols-[32px_minmax(0,1fr)_88px_56px_64px] sm:px-3 sm:text-[11px]">
          <span className="flex justify-center" aria-hidden>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant/50">
              check_box_outline_blank
            </span>
          </span>
          <span className="flex min-w-0 items-center gap-1">
            이름
            <span className="material-symbols-outlined text-[14px] text-primary">
              arrow_upward
            </span>
          </span>
          <span className="text-center">상태</span>
          <span className="text-center">유형</span>
          <span className="text-right">수정</span>
        </div>
        <ul
          className="min-h-[15.5rem] flex-1 divide-y divide-outline-variant/10 sm:min-h-[17.5rem]"
          aria-live="polite"
        >
          {filtered.map((row) => (
            <li
              key={row.name}
              className="group/row grid grid-cols-[28px_minmax(0,1fr)_76px_52px_58px] items-center gap-1 px-2 py-2.5 text-sm text-on-surface transition-colors hover:bg-primary/[0.04] motion-safe:animate-arch-grid-row-in sm:grid-cols-[32px_minmax(0,1fr)_88px_56px_64px] sm:px-3 sm:py-3 motion-reduce:animate-none"
            >
              <span
                className="flex justify-center opacity-60 group-hover/row:opacity-100"
                aria-hidden
              >
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant/70">
                  check_box_outline_blank
                </span>
              </span>
              <span className="min-w-0 truncate font-medium">{row.name}</span>
              <span className="text-center">
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_BADGE[row.tone]}`}
                >
                  {row.status}
                </span>
              </span>
              <span className="text-center text-xs text-on-surface-variant">
                {row.segment}
              </span>
              <span className="text-right font-mono text-[11px] text-on-surface-variant tabular-nums">
                {row.date}
              </span>
            </li>
          ))}
        </ul>
        <div
          className={`flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/10 bg-surface-container-low/50 px-2 py-2.5 text-[11px] text-on-surface-variant transition-colors duration-300 sm:px-3 ${
            pulseFooter ? "bg-primary/[0.06]" : ""
          }`}
        >
          <span className="tabular-nums">
            <span className="font-medium text-on-surface">
              {filtered.length > 0 ? `1–${filtered.length}` : "—"}
            </span>
            <span className="mx-1 text-on-surface-variant/50">/</span>
            표시 {filtered.length}건 · 전체 {totalDemo}건
          </span>
          <div className="flex items-center gap-0.5" aria-hidden>
            <span className="rounded px-1.5 py-0.5 text-on-surface-variant/50">
              ‹
            </span>
            <span className="rounded-md bg-primary/15 px-2 py-0.5 font-semibold text-primary">
              1
            </span>
            <span className="rounded px-2 py-0.5 hover:bg-surface-container-high">
              2
            </span>
            <span className="rounded px-2 py-0.5 hover:bg-surface-container-high">
              3
            </span>
            <span className="rounded px-1.5 py-0.5 text-on-surface-variant/50">
              ›
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
