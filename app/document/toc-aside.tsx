"use client";

import { useEffect, useMemo, useState } from "react";

export interface TocGroup {
  title: string;
  items: { id: string; label: string }[];
}

export default function TocAside({ groups }: { groups: TocGroup[] }) {
  const allIds = useMemo(() => groups.flatMap((g) => g.items.map((i) => i.id)), [groups]);
  const [activeId, setActiveId] = useState<string>(allIds[0] ?? "");

  useEffect(() => {
    const getActiveSection = () => {
      let current = allIds[0];
      const offset = 180;

      const scrollBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 16;
      if (scrollBottom) {
        return allIds[allIds.length - 1];
      }

      for (const id of allIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = id;
        } else {
          break;
        }
      }

      return current;
    };

    const onScroll = () => setActiveId(getActiveSection());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [allIds]);

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto py-12 pr-6 xl:block">
      <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface">
        On this page
      </h4>
      <nav className="space-y-4">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-1.5 text-[11px] font-semibold tracking-wide text-on-surface">
              {group.title}
            </p>
            <div className="space-y-1 border-l border-outline-variant/30 pl-3">
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`block text-[13px] transition-colors ${
                    activeId === item.id
                      ? "font-medium text-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
