"use client";

import { useState } from "react";

export default function CodeToggle({ codeHtml }: { codeHtml: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-outline-variant/25">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-center gap-1.5 py-2 text-xs text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
      >
        <span className="material-symbols-outlined text-[16px]">
          {open ? "visibility" : "code"}
        </span>
        {open ? "코드 숨기기" : "코드 보기"}
      </button>
      {open && (
        <div
          className="border-t border-outline-variant/25 overflow-x-auto text-sm [&_pre]:p-6"
          dangerouslySetInnerHTML={{ __html: codeHtml }}
        />
      )}
    </div>
  );
}
