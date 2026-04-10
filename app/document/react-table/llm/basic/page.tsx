import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import MarkdownViewer from "../../../markdown-viewer";

export const metadata: Metadata = {
  title: "@mycrm-ui/react-table LLM Guide - 기본 사용",
  description: "@mycrm-ui/react-table 기본 사용 파트의 LLM 가이드입니다.",
};

export default async function ReactTableBasicLlmGuidePage() {
  const markdownPath = path.join(
    process.cwd(),
    "public",
    "document",
    "react-table",
    "basic-llm-guide.md",
  );

  const markdown = await readFile(markdownPath, "utf8");

  return (
    <main className="flex-1 bg-surface px-8 py-12 lg:px-16">
      <div className="max-w-4xl">
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary">
              LLM Guide
            </span>
          </div>
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-on-surface">
            기본 사용
          </h1>
          <p className="text-xl font-light leading-relaxed text-on-surface-variant">
            AI 에이전트가 `@mycrm-ui/react-table`의 최소 구성 패턴을 그대로 읽고 사용할 수 있도록 정리한 Markdown 가이드입니다.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/document/react-table#react-table-basic"
              className="inline-flex items-center rounded-full border border-outline-variant/30 px-4 py-2 text-sm text-on-surface-variant transition-colors hover:border-primary/40 hover:text-primary"
            >
              기본 사용 섹션으로 이동
            </Link>
            <a
              href="/document/react-table/basic-llm-guide.md"
              className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              원본 MD 열기
            </a>
          </div>
        </header>

        <MarkdownViewer markdown={markdown} />
      </div>
    </main>
  );
}
