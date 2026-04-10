import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";

type SearchParamsLike =
  | { lang?: string }
  | Promise<{ lang?: string }>
  | undefined;

type LlmGuideLang = "ko" | "en";

interface ReactTableLlmGuideMarkdownPageOptions {
  partSlug: string;
  titleKo: string;
  titleEn: string;
  sectionHref: string;
  searchParams?: SearchParamsLike;
}

function normalizeLang(lang?: string): LlmGuideLang {
  return lang?.toLowerCase() === "en" ? "en" : "ko";
}

async function resolveLang(searchParams?: SearchParamsLike): Promise<LlmGuideLang> {
  if (!searchParams) return "ko";
  const resolved = searchParams instanceof Promise ? await searchParams : searchParams;
  return normalizeLang(resolved.lang);
}

function getMarkdownFileName(partSlug: string, lang: LlmGuideLang) {
  return `${partSlug}-llm-guide${lang === "en" ? "-en" : ""}.md`;
}

export async function renderReactTableLlmGuideMarkdownPage({
  partSlug,
  titleKo,
  titleEn,
  sectionHref,
  searchParams,
}: ReactTableLlmGuideMarkdownPageOptions) {
  const lang = await resolveLang(searchParams);
  const markdownFileName = getMarkdownFileName(partSlug, lang);
  const markdownPath = path.join(
    process.cwd(),
    "public",
    "document",
    "react-table",
    markdownFileName,
  );
  const markdown = await readFile(markdownPath, "utf8");
  const title = lang === "en" ? titleEn : titleKo;
  const viewerHref = `/document/react-table/llm/${partSlug}?lang=${lang}`;
  const rawKoHref = `/document/react-table/${getMarkdownFileName(partSlug, "ko")}`;
  const rawEnHref = `/document/react-table/${getMarkdownFileName(partSlug, "en")}`;

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
            <div className="flex items-center gap-1">
              <Link
                href={`/document/react-table/llm/${partSlug}/md?lang=ko`}
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                  lang === "ko"
                    ? "bg-secondary text-white"
                    : "bg-secondary/8 text-secondary hover:bg-secondary/14"
                }`}
              >
                Korean
              </Link>
              <Link
                href={`/document/react-table/llm/${partSlug}/md?lang=en`}
                className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                  lang === "en"
                    ? "bg-secondary text-white"
                    : "bg-secondary/8 text-secondary hover:bg-secondary/14"
                }`}
              >
                English
              </Link>
            </div>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
            {title}
          </h1>
          <p className="text-xl font-light leading-relaxed text-on-surface-variant">
            {lang === "en"
              ? "Raw Markdown source for LLM and agent workflows."
              : "LLM 및 에이전트 워크플로우용 원문 Markdown입니다."}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={viewerHref}
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              {lang === "en" ? "Open viewer" : "Viewer 열기"}
            </Link>
            <Link
              href={sectionHref}
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              {lang === "en" ? "Jump to demo section" : "기존 데모 섹션으로 이동"}
            </Link>
            <a
              href={rawKoHref}
              className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
            >
              Korean file
            </a>
            <a
              href={rawEnHref}
              className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/5 px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:border-secondary/35 hover:bg-secondary/10"
            >
              English file
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
