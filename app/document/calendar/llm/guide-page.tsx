import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownViewer from "../../markdown-viewer";
import {
  getCalendarLlmGuideMarkdownFileName,
  getCalendarLlmGuidePart,
} from "./guide-parts";

export async function renderCalendarLlmGuidePage(partSlug: string) {
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
  const mdHref = `/document/calendar/llm/${partSlug}/md`;
  const rawHref = `/document/calendar/${markdownFileName}`;

  return (
    <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
      <div className="max-w-4xl">
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
              LLM Guide
            </span>
            <span className="text-sm font-medium text-on-surface-variant">
              @mycrm-ui/components
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
            {guidePart.titleKo}
          </h1>
          <p className="text-xl font-light leading-relaxed text-on-surface-variant">
            {guidePart.hintKo}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={guidePart.sectionHref}
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              기존 데모 섹션으로 이동
            </Link>
            <Link
              href={mdHref}
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              Markdown 페이지
            </Link>
            <a
              href={rawHref}
              className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
            >
              Raw MD
            </a>
            <Link
              href={viewerHref}
              className="sr-only"
              aria-hidden="true"
              tabIndex={-1}
            >
              Viewer
            </Link>
          </div>
        </header>

        <MarkdownViewer markdown={markdown} />
      </div>
    </main>
  );
}
