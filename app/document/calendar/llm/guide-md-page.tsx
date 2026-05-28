import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCalendarLlmGuideMarkdownFileName,
  getCalendarLlmGuidePart,
} from "./guide-parts";

export async function renderCalendarLlmGuideMarkdownPage(partSlug: string) {
  const guidePart = getCalendarLlmGuidePart(partSlug);

  if (!guidePart) {
    notFound();
  }

  const markdownFileName = getCalendarLlmGuideMarkdownFileName(partSlug);
  const markdownPath = path.join(
    process.cwd(),
    "public",
    "document",
    "calendar",
    markdownFileName,
  );
  const markdown = await readFile(markdownPath, "utf8");
  const viewerHref = `/document/calendar/llm/${partSlug}`;
  const rawHref = `/document/calendar/${markdownFileName}`;

  return (
    <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
      <div className="max-w-5xl">
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
              LLM Guide
            </span>
            <span className="text-sm font-medium text-on-surface-variant">
              Markdown
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
            {guidePart.titleKo}
          </h1>
          <p className="text-xl font-light leading-relaxed text-on-surface-variant">
            LLM 및 에이전트 워크플로우용 원문 Markdown입니다.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={viewerHref}
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              Viewer 열기
            </Link>
            <Link
              href={guidePart.sectionHref}
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              기존 데모 섹션으로 이동
            </Link>
            <a
              href={rawHref}
              className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
            >
              Raw file
            </a>
          </div>
        </header>

        <pre className="overflow-x-auto rounded-3xl border border-outline-variant/20 bg-surface-container-low px-6 py-5 text-sm leading-7 text-on-surface shadow-sm">
          <code>{markdown}</code>
        </pre>
      </div>
    </main>
  );
}
