"use client";

import { useEffect, useMemo, useState } from "react";

const TOC_ITEMS = [
  { id: "installation", label: "Installation" },
  { id: "requirements", label: "Requirements" },
  { id: "package-guide", label: "Package Guide" },
  { id: "peer-dependencies", label: "Peer Dependencies" },
  { id: "typescript-config", label: "TypeScript" },
  { id: "verification", label: "Verification" },
];

export default function TocAside() {
  const [activeId, setActiveId] = useState<string>("installation");

  const sectionIds = useMemo(() => TOC_ITEMS.map((item) => item.id), []);

  useEffect(() => {
    const getActiveSection = () => {
      let current = sectionIds[0];
      const offset = 180;

      const scrollBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 16;
      if (scrollBottom) {
        return sectionIds[sectionIds.length - 1];
      }

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        const top = section.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = id;
        } else {
          break;
        }
      }

      return current;
    };

    const onScroll = () => {
      setActiveId(getActiveSection());
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionIds]);

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 py-12 pr-6 xl:block">
      <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface">
        On this page
      </h4>
      <nav className="space-y-3">
        {TOC_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block text-sm transition-colors ${
              activeId === item.id
                ? "font-medium text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

    </aside>
  );
}
